import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';

import { Doctor, DoctorDocument } from './schemas/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { QueryDoctorDto } from './dto/query-doctor.dto';

import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../common/enums/role.enum';

import {
  Specialty,
  SpecialtyDocument,
} from '../specialties/schemas/specialty.schema';
import { CreateDoctorAccountDto } from './dto/create-doctor-account.dto';
import { generateTemporaryPassword } from '../common/utils/generate-temporary-password';
import { UsersService } from '../users/users.service';
import { DoctorProfileStatus } from '../common/enums/doctor-profile-status.enum';
import { UserStatus } from '../common/enums/user-status.enum';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Specialty.name)
    private readonly specialtyModel: Model<SpecialtyDocument>,

    private readonly usersService: UsersService,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  /**
   * Create doctor profile
   */
  async create(createDoctorDto: CreateDoctorDto) {
    const { userId, specialty } = createDoctorDto;

    // 1. Validate User ID
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    // 2. Check User exists
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 3. Check User role
    if (user.role !== Role.DOCTOR) {
      throw new BadRequestException(
        'User role must be DOCTOR to create doctor profile',
      );
    }

    // 4. Check Doctor profile already exists
    const existingDoctor = await this.doctorModel.findOne({
      userId,
    });

    if (existingDoctor) {
      throw new ConflictException(
        'Doctor profile already exists for this user',
      );
    }

    // 5. Validate Specialty ID
    if (!Types.ObjectId.isValid(specialty)) {
      throw new BadRequestException('Invalid specialty ID');
    }

    // 6. Check Specialty exists
    const existingSpecialty = await this.specialtyModel.findById(specialty);

    if (!existingSpecialty) {
      throw new NotFoundException('Specialty not found');
    }

    // 7. Create Doctor
    const doctor = await this.doctorModel.create({
      userId: new Types.ObjectId(userId),
      specialty: new Types.ObjectId(specialty),
      degree: createDoctorDto.degree,
      experience: createDoctorDto.experience,
      clinicAddress: createDoctorDto.clinicAddress,
      consultationFee: createDoctorDto.consultationFee,
      description: createDoctorDto.description,
    });

    // 8. Return populated Doctor
    return this.doctorModel
      .findById(doctor._id)
      .populate('userId', 'fullName email phone avatar role status')
      .populate('specialty', 'name slug description');
  }

  /**
   * Create simple doctor account
   *
   * Creates:
   * 1. User account with DOCTOR role
   * 2. Empty Doctor profile with INCOMPLETE status
   *
   * Both operations are executed inside one transaction.
   */
  async createAccount(createDoctorAccountDto: CreateDoctorAccountDto) {
    const { fullName, email, phone } = createDoctorAccountDto;

    // 1. Check whether email already exists
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    // 2. Generate temporary password
    const temporaryPassword = generateTemporaryPassword();

    // 3. Start MongoDB session
    const session = await this.connection.startSession();

    try {
      const result = await session.withTransaction(async () => {
        // 4. Create User
        const user = await this.usersService.create(
          {
            fullName,
            email,
            phone,
            password: temporaryPassword,
            role: Role.DOCTOR,
          },
          session,
        );

        // 5. Create incomplete Doctor profile
        const doctors = await this.doctorModel.create(
          [
            {
              userId: user._id,
              profileStatus: DoctorProfileStatus.INCOMPLETE,
            },
          ],
          { session },
        );

        const doctor = doctors[0];

        if (!doctor) {
          throw new Error('Failed to create doctor profile');
        }

        return {
          user,
          doctor,
        };
      });

      // 6. Return created account
      return {
        message: 'Doctor account created successfully',

        user: {
          id: result.user._id,
          fullName: result.user.fullName,
          email: result.user.email,
          phone: result.user.phone,
          avatar: result.user.avatar,
          role: result.user.role,
          status: result.user.status,
        },

        doctor: {
          id: result.doctor._id,
          profileStatus: result.doctor.profileStatus,
        },

        temporaryPassword,
      };
    } finally {
      await session.endSession();
    }
  }

  /**
   * Get doctors with search, specialty filter and pagination
   *
   * Example:
   * GET /doctors?page=1&limit=12
   * GET /doctors?search=john
   * GET /doctors?specialty=cardiology
   * GET /doctors?search=john&specialty=cardiology&page=1&limit=12
   */
  async findAll(query: QueryDoctorDto) {
    const { search, specialty, page = 1, limit = 12 } = query;

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    /**
     * Search doctor by User.fullName
     */
    if (search?.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');

      const users = await this.userModel
        .find({
          fullName: searchRegex,
          role: Role.DOCTOR,
          status: UserStatus.ACTIVE,
        })
        .select('_id')
        .lean();

      const userIds = users.map((user) => user._id);

      filter.userId = {
        $in: userIds,
      };
    }

    /**
     * Filter by specialty
     *
     * Supports:
     * - specialty ObjectId
     * - specialty slug
     */
    if (specialty?.trim()) {
      const specialtyValue = specialty.trim();

      if (Types.ObjectId.isValid(specialtyValue)) {
        filter.specialty = new Types.ObjectId(specialtyValue);
      } else {
        const specialtyDocument = await this.specialtyModel
          .findOne({
            slug: specialtyValue,
          })
          .select('_id')
          .lean();

        if (!specialtyDocument) {
          return {
            data: [],
            pagination: {
              page,
              limit,
              total: 0,
              totalPages: 0,
            },
          };
        }

        filter.specialty = specialtyDocument._id;
      }
    }

    /**
     * Count total doctors
     */
    const total = await this.doctorModel.countDocuments(filter);

    /**
     * Get doctors
     */
    const doctors = await this.doctorModel
      .find(filter)
      .populate('userId', 'fullName email phone avatar role status')
      .populate('specialty', 'name slug description')
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    return {
      data: doctors,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Get doctor detail
   */
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const doctor = await this.doctorModel
      .findById(id)
      .populate('userId', 'fullName email phone avatar role status')
      .populate('specialty', 'name slug description');

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  /**
   * Update doctor profile and user information
   */
  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const session = await this.doctorModel.db.startSession();

    try {
      const updatedDoctor = await session.withTransaction(
        async (): Promise<Doctor | null> => {
          // 1. Find doctor
          const doctor = await this.doctorModel.findById(id).session(session);

          if (!doctor) {
            throw new NotFoundException('Doctor not found');
          }

          // 2. Update User information
          const userUpdate: Partial<User> = {};

          if (updateDoctorDto.fullName !== undefined) {
            userUpdate.fullName = updateDoctorDto.fullName;
          }

          if (updateDoctorDto.email !== undefined) {
            userUpdate.email = updateDoctorDto.email;
          }

          if (updateDoctorDto.phone !== undefined) {
            userUpdate.phone = updateDoctorDto.phone;
          }

          if (Object.keys(userUpdate).length > 0) {
            await this.userModel.findByIdAndUpdate(doctor.userId, userUpdate, {
              new: true,
              runValidators: true,
              session,
            });
          }

          // 3. Validate and update specialty
          if (updateDoctorDto.specialty !== undefined) {
            if (!Types.ObjectId.isValid(updateDoctorDto.specialty)) {
              throw new BadRequestException('Invalid specialty ID');
            }

            const specialty = await this.specialtyModel
              .findById(updateDoctorDto.specialty)
              .session(session);

            if (!specialty) {
              throw new NotFoundException('Specialty not found');
            }

            doctor.specialty = new Types.ObjectId(updateDoctorDto.specialty);
          }

          // 4. Update doctor fields
          if (updateDoctorDto.degree !== undefined) {
            doctor.degree = updateDoctorDto.degree;
          }

          if (updateDoctorDto.experience !== undefined) {
            doctor.experience = updateDoctorDto.experience;
          }

          if (updateDoctorDto.clinicAddress !== undefined) {
            doctor.clinicAddress = updateDoctorDto.clinicAddress;
          }

          if (updateDoctorDto.consultationFee !== undefined) {
            doctor.consultationFee = updateDoctorDto.consultationFee;
          }

          if (updateDoctorDto.description !== undefined) {
            doctor.description = updateDoctorDto.description;
          }

          // 5. Determine profile status
          const isProfileComplete =
            doctor.specialty !== undefined &&
            doctor.degree !== undefined &&
            doctor.degree.trim() !== '' &&
            doctor.experience !== undefined &&
            doctor.clinicAddress !== undefined &&
            doctor.clinicAddress.trim() !== '' &&
            doctor.consultationFee !== undefined;

          doctor.profileStatus = isProfileComplete
            ? DoctorProfileStatus.COMPLETE
            : DoctorProfileStatus.INCOMPLETE;

          // 6. Save doctor
          await doctor.save({ session });

          // 7. Return updated doctor
          return this.doctorModel
            .findById(doctor._id)
            .session(session)
            .populate('userId', 'fullName email phone avatar role status')
            .populate('specialty', 'name slug description');
        },
      );

      return updatedDoctor;
    } finally {
      await session.endSession();
    }
  }
  /**
   * Deactivate doctor profile
   */
  async deactivate(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const session = await this.connection.startSession();

    try {
      const result = await session.withTransaction(async () => {
        const doctor = await this.doctorModel.findById(id).session(session);

        if (!doctor) {
          throw new NotFoundException('Doctor not found');
        }

        const user = await this.usersService.updateStatus(
          doctor.userId.toString(),
          UserStatus.INACTIVE,
          session,
        );

        if (!user) {
          throw new NotFoundException('Doctor user not found');
        }

        return {
          doctorId: doctor._id,
          userId: user._id,
        };
      });

      return {
        message: 'Doctor deactivated successfully',
        ...result,
      };
    } finally {
      await session.endSession();
    }
  }

  /**
   * Activate doctor profile
   * Admin only
   */
  async activate(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const session = await this.connection.startSession();

    try {
      const result = await session.withTransaction(async () => {
        const doctor = await this.doctorModel.findById(id).session(session);

        if (!doctor) {
          throw new NotFoundException('Doctor not found');
        }

        const user = await this.usersService.updateStatus(
          doctor.userId.toString(),
          UserStatus.ACTIVE,
          session,
        );

        if (!user) {
          throw new NotFoundException('Doctor user not found');
        }

        return {
          doctorId: doctor._id,
          userId: user._id,
        };
      });

      return {
        message: 'Doctor activated successfully',
        ...result,
      };
    } finally {
      await session.endSession();
    }
  }

  /**
   * Get activity doctor for admin
   */
  async findAllForAdmin(query: QueryDoctorDto) {
    const { search, status, specialty, page = 1, limit = 12 } = query;

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    /**
     * Search doctor by User.fullName
     *
     * Admin can see both ACTIVE and INACTIVE doctors.
     */
    if (search?.trim() || status) {
      const userFilter: Record<string, unknown> = {
        role: Role.DOCTOR,
      };

      if (search?.trim()) {
        userFilter.fullName = new RegExp(search.trim(), 'i');
      }

      if (status) {
        userFilter.status = status;
      }

      const users = await this.userModel.find(userFilter).select('_id').lean();

      const userIds = users.map((user) => user._id);

      filter.userId = {
        $in: userIds,
      };
    }

    /**
     * Filter by specialty
     */
    if (specialty?.trim()) {
      const specialtyValue = specialty.trim();

      if (Types.ObjectId.isValid(specialtyValue)) {
        filter.specialty = new Types.ObjectId(specialtyValue);
      } else {
        const specialtyDocument = await this.specialtyModel
          .findOne({
            slug: specialtyValue,
          })
          .select('_id')
          .lean();

        if (!specialtyDocument) {
          return {
            data: [],
            pagination: {
              page,
              limit,
              total: 0,
              totalPages: 0,
            },
          };
        }

        filter.specialty = specialtyDocument._id;
      }
    }

    const total = await this.doctorModel.countDocuments(filter);

    const doctors = await this.doctorModel
      .find(filter)
      .populate('userId', 'fullName email phone avatar role status')
      .populate('specialty', 'name slug description')
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    return {
      data: doctors,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}
