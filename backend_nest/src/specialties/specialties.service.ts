import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Specialty, SpecialtyDocument } from './schemas/specialty.schema';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Specialty.name)
    private readonly specialtyModel: Model<SpecialtyDocument>,
  ) {}

  async findAll(): Promise<SpecialtyDocument[]> {
    return this.specialtyModel
      .find({ isActive: true })
      .sort({ name: 1 })
      .exec();
  }

  async findById(id: string): Promise<SpecialtyDocument> {
    const specialty = await this.specialtyModel.findById(id).exec();

    if (!specialty || !specialty.isActive) {
      throw new NotFoundException('Specialty not found');
    }

    return specialty;
  }

  async create(
    createSpecialtyDto: CreateSpecialtyDto,
  ): Promise<SpecialtyDocument> {
    const { name, slug } = createSpecialtyDto;

    const existingSpecialty = await this.specialtyModel
      .findOne({
        $or: [{ name }, { slug }],
      })
      .exec();

    if (existingSpecialty) {
      throw new ConflictException('Specialty name or slug already exists');
    }

    return this.specialtyModel.create(createSpecialtyDto);
  }

  async update(
    id: string,
    updateData: Partial<CreateSpecialtyDto>,
  ): Promise<SpecialtyDocument> {
    const specialty = await this.specialtyModel.findById(id).exec();

    if (!specialty || !specialty.isActive) {
      throw new NotFoundException('Specialty not found');
    }

    if (updateData.name || updateData.slug) {
      const duplicate = await this.specialtyModel
        .findOne({
          _id: { $ne: id },
          $or: [
            ...(updateData.name ? [{ name: updateData.name }] : []),
            ...(updateData.slug ? [{ slug: updateData.slug }] : []),
          ],
        })
        .exec();

      if (duplicate) {
        throw new ConflictException('Specialty name or slug already exists');
      }
    }

    Object.assign(specialty, updateData);

    return specialty.save();
  }

  async remove(id: string): Promise<SpecialtyDocument> {
    const specialty = await this.specialtyModel.findById(id).exec();

    if (!specialty || !specialty.isActive) {
      throw new NotFoundException('Specialty not found');
    }

    specialty.isActive = false;

    return specialty.save();
  }
}
