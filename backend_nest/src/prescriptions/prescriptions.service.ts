import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { Prescription } from './schemas/prescription.schema';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

import { Appointment } from '../appointments/schemas/appointment.schema';
import { Doctor } from '../doctors/schemas/doctor.shema';
import { Patient } from '../patient/schemas/patient.schema';
@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<Prescription>,

    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,

    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,

    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<Prescription> {
    const { appointmentId, doctorId, patientId, diagnosis, notes } =
      createPrescriptionDto;

    const appointment = await this.appointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const patient = await this.patientModel.findById(patientId);

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    if (
      appointment.doctorId.toString() !== doctorId ||
      appointment.patientId.toString() !== patientId
    ) {
      throw new BadRequestException(
        'Doctor or patient does not match the appointment.',
      );
    }

    const prescription = new this.prescriptionModel({
      appointmentId,
      doctorId,
      patientId,
      diagnosis,
      notes,
    });

    return prescription.save();
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [prescriptions, total] = await Promise.all([
      this.prescriptionModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.prescriptionModel.countDocuments(),
    ]);

    return {
      prescriptions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findById(id);

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    return prescription;
  }

  async update(
    id: string,
    updatePrescriptionDto: UpdatePrescriptionDto,
  ): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findByIdAndUpdate(
      id,
      updatePrescriptionDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    return prescription;
  }

  async remove(id: string): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findByIdAndDelete(id);

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    return prescription;
  }
}
