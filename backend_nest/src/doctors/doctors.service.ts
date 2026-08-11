import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

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

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Specialty.name)
    private readonly specialtyModel: Model<SpecialtyDocument>,
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
    const doctor = await this.doctorModel.create(createDoctorDto);

    // 8. Return populated Doctor
    return this.doctorModel
      .findById(doctor._id)
      .populate('userId', 'fullName email role')
      .populate('specialty', 'name slug description');
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
      .populate('userId', 'fullName email role')
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
      .populate('userId', 'fullName email role')
      .populate('specialty', 'name slug description');

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  /**
   * Update doctor profile
   */
  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    /**
     * If specialty is being updated,
     * make sure the new specialty exists.
     */
    if (updateDoctorDto.specialty) {
      if (!Types.ObjectId.isValid(updateDoctorDto.specialty)) {
        throw new BadRequestException('Invalid specialty ID');
      }

      const specialty = await this.specialtyModel.findById(
        updateDoctorDto.specialty,
      );

      if (!specialty) {
        throw new NotFoundException('Specialty not found');
      }
    }

    const doctor = await this.doctorModel.findByIdAndUpdate(
      id,
      updateDoctorDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    /**
     * Return the same populated structure
     * as findOne().
     */
    return this.doctorModel
      .findById(doctor._id)
      .populate('userId', 'fullName email role')
      .populate('specialty', 'name slug description');
  }

  /**
   * Delete doctor profile
   */
  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const doctor = await this.doctorModel.findByIdAndDelete(id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return {
      message: 'Doctor deleted successfully',
    };
  }
}
