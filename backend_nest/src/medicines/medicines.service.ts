import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountersService } from '../counters/counters.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { QueryMedicineDto } from './dto/query-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine, MedicineDocument } from './schemas/medicine.schema';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<MedicineDocument>,
    private readonly countersService: CountersService,
  ) {}

  private async generateMedicineCode(): Promise<string> {
    const sequence = await this.countersService.getNextSequence('medicine');

    return `MED${sequence.toString().padStart(6, '0')}`;
  }

  async create(createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    const { name, strength, dosageForm } = createMedicineDto;

    const existingMedicine = await this.medicineModel.findOne({
      name,
      strength,
      dosageForm,
    });

    if (existingMedicine) {
      throw new BadRequestException('Medicine already exists.');
    }

    const medicine = new this.medicineModel({
      ...createMedicineDto,
      code: await this.generateMedicineCode(),
    });

    return await medicine.save();
  }

  async findAll(query: QueryMedicineDto) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      dosageForm,
      isActive,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const filter: Record<string, any> = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (dosageForm) {
      filter.dosageForm = dosageForm;
    }

    if (typeof isActive === 'boolean') {
      filter.isActive = isActive;
    }

    const [medicines, total] = await Promise.all([
      this.medicineModel
        .find(filter)
        .sort({
          [sortBy]: order === 'asc' ? 1 : -1,
        })
        .skip((page - 1) * limit)
        .limit(limit),

      this.medicineModel.countDocuments(filter),
    ]);

    return {
      data: medicines,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<MedicineDocument> {
    const medicine = await this.medicineModel.findById(id);

    if (!medicine) {
      throw new NotFoundException('Medicine not found.');
    }

    return medicine;
  }

  async update(
    id: string,
    updateMedicineDto: UpdateMedicineDto,
  ): Promise<Medicine> {
    const medicine = await this.findOne(id);

    const duplicate = await this.medicineModel.findOne({
      _id: { $ne: id },
      name: updateMedicineDto.name ?? medicine.name,
      strength: updateMedicineDto.strength ?? medicine.strength,
      dosageForm: updateMedicineDto.dosageForm ?? medicine.dosageForm,
    });

    if (duplicate) {
      throw new BadRequestException('Medicine already exists.');
    }

    Object.assign(medicine, updateMedicineDto);

    return await medicine.save();
  }

  async remove(id: string): Promise<MedicineDocument> {
    const medicine = await this.findOne(id);

    if (!medicine.isActive) {
      throw new BadRequestException('Medicine has already been deleted.');
    }

    medicine.isActive = false;

    return await medicine.save();
  }

  async restore(id: string): Promise<MedicineDocument> {
    const medicine = await this.findOne(id);

    if (medicine.isActive) {
      throw new BadRequestException('Medicine is already active.');
    }

    medicine.isActive = true;

    return await medicine.save();
  }
}
