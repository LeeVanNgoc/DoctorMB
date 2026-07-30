import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Doctor, DoctorDocument } from './schemas/doctor.shema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { userId } = createDoctorDto;

    // 1. Check User exists
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 2. Check User role
    if (user.role !== Role.DOCTOR) {
      throw new BadRequestException(
        'User role must be DOCTOR to create doctor profile',
      );
    }

    // 3. Check Doctor profile already exists
    const existingDoctor = await this.doctorModel.findOne({
      userId,
    });

    if (existingDoctor) {
      throw new ConflictException(
        'Doctor profile already exists for this user',
      );
    }

    // 4. Create Doctor
    const doctor = new this.doctorModel(createDoctorDto);

    return doctor.save();
  }

  async findAll() {
    return this.doctorModel.find().populate('userId', 'fullName email role');
  }

  async findOne(id: string) {
    const doctor = await this.doctorModel
      .findById(id)
      .populate('userId', 'fullName email role');

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorModel.findByIdAndUpdate(
      id,
      updateDoctorDto,
      {
        new: true,
      },
    );

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async remove(id: string) {
    const doctor = await this.doctorModel.findByIdAndDelete(id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return {
      message: 'Doctor deleted successfully',
    };
  }
}
