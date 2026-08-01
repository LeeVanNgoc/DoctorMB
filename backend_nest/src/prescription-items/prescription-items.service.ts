import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePrescriptionItemDto } from './dto/create-prescription-item.dto';
import { UpdatePrescriptionItemDto } from './dto/update-prescription-item.dto';

import {
  PrescriptionItem,
  PrescriptionItemDocument,
} from './schemas/prescription-item.schema';

import {
  Prescription,
  PrescriptionDocument,
} from '../prescriptions/schemas/prescription.schema';

import {
  Medicine,
  MedicineDocument,
} from '../medicines/schemas/medicine.schema';
@Injectable()
export class PrescriptionItemsService {
  constructor(
    @InjectModel(PrescriptionItem.name)
    private readonly prescriptionItemModel: Model<PrescriptionItemDocument>,

    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<PrescriptionDocument>,

    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<MedicineDocument>,
  ) {}

  async create(
    createPrescriptionItemDto: CreatePrescriptionItemDto,
  ): Promise<PrescriptionItem> {
    const { prescriptionId, medicineId } = createPrescriptionItemDto;

    const prescription = await this.prescriptionModel.findById(prescriptionId);

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    const medicine = await this.medicineModel.findById(medicineId);

    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    const existingPrescriptionItem = await this.prescriptionItemModel.findOne({
      prescriptionId,
      medicineId,
    });

    if (existingPrescriptionItem) {
      throw new BadRequestException(
        'Medicine already exists in this prescription',
      );
    }

    const prescriptionItem = await this.prescriptionItemModel.create(
      createPrescriptionItemDto,
    );

    return prescriptionItem;
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [prescriptionItems, total] = await Promise.all([
      this.prescriptionItemModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.prescriptionItemModel.countDocuments(),
    ]);

    return {
      prescriptionItems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<PrescriptionItem> {
    const prescriptionItem = await this.prescriptionItemModel.findById(id);

    if (!prescriptionItem) {
      throw new NotFoundException('Prescription item not found');
    }

    return prescriptionItem;
  }

  async update(
    id: string,
    updatePrescriptionItemDto: UpdatePrescriptionItemDto,
  ): Promise<PrescriptionItem> {
    const prescriptionItem = await this.prescriptionItemModel.findByIdAndUpdate(
      id,
      updatePrescriptionItemDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!prescriptionItem) {
      throw new NotFoundException('Prescription item not found');
    }

    return prescriptionItem;
  }

  async remove(id: string): Promise<PrescriptionItem> {
    const prescriptionItem =
      await this.prescriptionItemModel.findByIdAndDelete(id);

    if (!prescriptionItem) {
      throw new NotFoundException('Prescription item not found');
    }

    return prescriptionItem;
  }
}
