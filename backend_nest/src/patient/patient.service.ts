/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

import { CreatePatientDto } from './dto/create-patient';
import { UpdatePatientDto } from './dto/update-patient';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { phone, email } = createPatientDto;

    const phoneExists = await this.patientModel.exists({ phone });

    if (phoneExists) {
      throw new ConflictException('Phone number already exists');
    }

    if (email) {
      const emailExists = await this.patientModel.exists({ email });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    const patient = new this.patientModel(createPatientDto);

    return patient.save();
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const filter: any = {
      isActive: true,
    };

    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }

    if (limit < 1) {
      throw new BadRequestException('Limit must be greater than 0');
    }

    if (search) {
      filter.$or = [
        {
          fullName: {
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
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [patients, total] = await Promise.all([
      this.patientModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

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

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel.findOne({
      _id: id,
      isActive: true,
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    await this.findOne(id);

    const { phone, email } = updatePatientDto;

    if (phone) {
      const phoneExists = await this.patientModel.exists({
        phone,
        _id: { $ne: id },
      });

      if (phoneExists) {
        throw new ConflictException('Phone number already exists');
      }
    }

    if (email) {
      const emailExists = await this.patientModel.exists({
        email,
        _id: { $ne: id },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    const patient = await this.patientModel.findByIdAndUpdate(
      id,
      updatePatientDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);

    patient.isActive = false;

    await patient.save();
  }
}
