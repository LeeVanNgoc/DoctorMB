import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';

import { CreatePatientDto } from './dto/create-patient';
import { UpdatePatientDto } from './dto/update-patient';

import { Patient, PatientDocument } from './schemas/patient.schema';

import { User, UserDocument } from '../users/schemas/user.schema';

import { Role } from '../common/enums/role.enum';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const session = await this.connection.startSession();

    session.startTransaction();

    try {
      const {
        userId,
        fullName,
        email,
        password,
        phone,
        gender,
        dateOfBirth,
        address,
        bloodType,
        allergies,
        insuranceNumber,
        emergencyContact,
      } = createPatientDto;

      let targetUser: UserDocument;

      // ==========================================
      // 1. Existing User
      // ==========================================

      if (userId) {
        if (!Types.ObjectId.isValid(userId)) {
          throw new BadRequestException('Invalid user ID');
        }

        const user = await this.userModel.findById(userId).session(session);
        if (!user) {
          throw new NotFoundException('User not found');
        }

        if (user.role !== Role.PATIENT) {
          throw new BadRequestException('Selected user must have patient role');
        }

        const existingPatient = await this.patientModel
          .exists({
            userId: user._id,
          })
          .session(session);
        if (existingPatient) {
          throw new ConflictException(
            'This user already has a patient profile',
          );
        }

        targetUser = user;
      }

      // ==========================================
      // 2. Create New User
      // ==========================================
      else {
        if (!fullName || !email || !password || !phone) {
          throw new BadRequestException(
            'Full name, email, password and phone are required when creating a new account',
          );
        }

        const emailExists = await this.userModel.exists({
          email,
        });

        if (emailExists) {
          throw new ConflictException('Email already exists');
        }

        const phoneExists = await this.userModel.exists({
          phone,
        });

        if (phoneExists) {
          throw new ConflictException('Phone number already exists');
        }

        targetUser = new this.userModel({
          fullName,
          email,
          password,
          phone,
          role: Role.PATIENT,
        });

        await targetUser.save({ session });
      }

      // ==========================================
      // 3. Create Patient Profile
      // ==========================================

      const patient = new this.patientModel({
        userId: targetUser._id,
        gender,
        dateOfBirth,
        address,
        bloodType,
        allergies,
        insuranceNumber,
        emergencyContact,
      });

      await patient.save({ session });
      await session.commitTransaction();

      return patient;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async findAll(page = 1, limit = 10, search?: string) {
    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }

    if (limit < 1) {
      throw new BadRequestException('Limit must be greater than 0');
    }

    const filter: Record<string, unknown> = {
      isActive: true,
    };

    const skip = (page - 1) * limit;

    let query = this.patientModel
      .find(filter)
      .populate({
        path: 'userId',
        select: 'fullName email phone avatar status role',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (search) {
      const users = await this.userModel
        .find({
          role: Role.PATIENT,
          $or: [
            {
              fullName: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              email: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              phone: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        })
        .select('_id');

      const userIds = users.map((user) => user._id);

      filter.userId = {
        $in: userIds,
      };

      query = this.patientModel
        .find(filter)
        .populate({
          path: 'userId',
          select: 'fullName email phone avatar status role',
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    const [patients, total] = await Promise.all([
      query,
      this.patientModel.countDocuments(filter),
    ]);

    return {
      patients,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<PatientDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid patient ID');
    }

    const patient = await this.patientModel.findById(id).populate({
      path: 'userId',
      select: 'fullName email phone avatar status role',
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return patient;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    await this.findOne(id);

    const patient = await this.patientModel.findByIdAndUpdate(
      id,
      updatePatientDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return patient;
  }

  async remove(id: string): Promise<PatientDocument> {
    const patient = await this.findOne(id);

    if (!patient.isActive) {
      throw new BadRequestException(
        'Patient profile has already been deleted.',
      );
    }

    patient.isActive = false;

    return patient.save();
  }
}
