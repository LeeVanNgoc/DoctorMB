import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  DoctorExperience,
  DoctorExperienceDocument,
} from './schemas/doctor-experience.schema';

import { CreateDoctorExperienceDto } from './dto/create-experience.dto';
import { UpdateDoctorExperienceDto } from './dto/update-experience.dto';

import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';

@Injectable()
export class DoctorExperiencesService {
  constructor(
    @InjectModel(DoctorExperience.name)
    private readonly experienceModel: Model<DoctorExperienceDocument>,

    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async create(createDoctorExperienceDto: CreateDoctorExperienceDto) {
    const { doctorId, startDate, endDate, isCurrent } =
      createDoctorExperienceDto;

    // 1. Validate Doctor ID
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    // 2. Check Doctor exists
    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // 3. Validate dates
    const parsedStartDate = new Date(startDate);

    if (Number.isNaN(parsedStartDate.getTime())) {
      throw new BadRequestException('Invalid start date');
    }

    let parsedEndDate: Date | null = null;

    if (endDate) {
      parsedEndDate = new Date(endDate);

      if (Number.isNaN(parsedEndDate.getTime())) {
        throw new BadRequestException('Invalid end date');
      }

      if (parsedStartDate >= parsedEndDate) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    // 4. Current experience cannot have an end date
    if (isCurrent === true && parsedEndDate) {
      throw new BadRequestException(
        'Current experience cannot have an end date',
      );
    }

    // 5. Create experience
    const experience = new this.experienceModel({
      ...createDoctorExperienceDto,
      doctorId: new Types.ObjectId(doctorId),
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      isCurrent: isCurrent ?? false,
    });

    return experience.save();
  }

  async findAll() {
    return this.experienceModel
      .find()
      .populate({
        path: 'doctorId',
        populate: [
          {
            path: 'userId',
            select: 'fullName email role',
          },
          {
            path: 'specialty',
            select: 'name slug description',
          },
        ],
      })
      .sort({
        startDate: -1,
      });
  }

  async findByDoctor(doctorId: string) {
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.experienceModel
      .find({
        doctorId: new Types.ObjectId(doctorId),
      })
      .sort({
        startDate: -1,
      });
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid experience ID');
    }

    const experience = await this.experienceModel
      .findById(id)
      .populate('doctorId');

    if (!experience) {
      throw new NotFoundException('Doctor experience not found');
    }

    return experience;
  }

  async update(
    id: string,
    updateDoctorExperienceDto: UpdateDoctorExperienceDto,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid experience ID');
    }

    const existingExperience = await this.experienceModel.findById(id);

    if (!existingExperience) {
      throw new NotFoundException('Doctor experience not found');
    }

    const startDate =
      updateDoctorExperienceDto.startDate ??
      existingExperience.startDate.toISOString();

    const endDate =
      updateDoctorExperienceDto.endDate !== undefined
        ? updateDoctorExperienceDto.endDate
        : existingExperience.endDate?.toISOString();

    const isCurrent =
      updateDoctorExperienceDto.isCurrent ?? existingExperience.isCurrent;

    const parsedStartDate = new Date(startDate);

    if (Number.isNaN(parsedStartDate.getTime())) {
      throw new BadRequestException('Invalid start date');
    }

    let parsedEndDate: Date | null = null;

    if (endDate) {
      parsedEndDate = new Date(endDate);

      if (Number.isNaN(parsedEndDate.getTime())) {
        throw new BadRequestException('Invalid end date');
      }

      if (parsedStartDate >= parsedEndDate) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    if (isCurrent === true && parsedEndDate) {
      throw new BadRequestException(
        'Current experience cannot have an end date',
      );
    }

    const updateData = {
      ...updateDoctorExperienceDto,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      isCurrent,
    };

    return this.experienceModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid experience ID');
    }

    const experience = await this.experienceModel.findByIdAndDelete(id);

    if (!experience) {
      throw new NotFoundException('Doctor experience not found');
    }

    return {
      message: 'Doctor experience deleted successfully',
    };
  }
}
