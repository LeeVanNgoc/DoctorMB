import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Appointment } from '../appointments/schemas/appointment.schema';
import { Doctor } from '../doctors/schemas/doctor.schema';
import { Patient } from '../patient/schemas/patient.schema';
import { Prescription } from '../prescriptions/schemas/prescription.schema';

import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import {
  MedicalRecord,
  MedicalRecordDocument,
} from './schemas/medical-record.schema';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord.name)
    private readonly medicalRecordModel: Model<MedicalRecordDocument>,

    @InjectModel(Patient.name)
    private readonly patientModel: Model<Patient>,

    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,

    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,

    @InjectModel(Prescription.name)
    private readonly prescriptionModel: Model<Prescription>,
  ) {}

  async create(
    createMedicalRecordDto: CreateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const { patientId, doctorId, appointmentId, prescriptionId } =
      createMedicalRecordDto;

    const [patient, doctor, appointment] = await Promise.all([
      this.patientModel.findById(patientId),
      this.doctorModel.findById(doctorId),
      this.appointmentModel.findById(appointmentId),
    ]);

    if (!patient) {
      throw new NotFoundException('Patient not found.');
    }

    if (!doctor) {
      throw new NotFoundException('Doctor not found.');
    }

    if (!appointment) {
      throw new NotFoundException('Appointment not found.');
    }

    const existingMedicalRecord = await this.medicalRecordModel.findOne({
      appointmentId,
    });

    if (existingMedicalRecord) {
      throw new ConflictException(
        'Medical record already exists for this appointment.',
      );
    }

    if (prescriptionId) {
      const prescription =
        await this.prescriptionModel.findById(prescriptionId);

      if (!prescription) {
        throw new NotFoundException('Prescription not found.');
      }
    }

    return await this.medicalRecordModel.create(createMedicalRecordDto);
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.medicalRecordModel
      .find()
      .populate('patientId')
      .populate('doctorId')
      .populate('appointmentId')
      .populate('prescriptionId');
  }

  async findOne(id: string): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRecordModel
      .findById(id)
      .populate('patientId')
      .populate('doctorId')
      .populate('appointmentId')
      .populate('prescriptionId');

    if (!medicalRecord) {
      throw new NotFoundException('Medical record not found.');
    }

    return medicalRecord;
  }

  async update(
    id: string,
    updateMedicalRecordDto: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const { patientId, doctorId, appointmentId, prescriptionId } =
      updateMedicalRecordDto;

    if (patientId) {
      const patient = await this.patientModel.findById(patientId);

      if (!patient) {
        throw new NotFoundException('Patient not found.');
      }
    }

    if (doctorId) {
      const doctor = await this.doctorModel.findById(doctorId);

      if (!doctor) {
        throw new NotFoundException('Doctor not found.');
      }
    }

    if (appointmentId) {
      const appointment = await this.appointmentModel.findById(appointmentId);

      if (!appointment) {
        throw new NotFoundException('Appointment not found.');
      }

      const existingMedicalRecord = await this.medicalRecordModel.findOne({
        appointmentId,
        _id: { $ne: id },
      });

      if (existingMedicalRecord) {
        throw new ConflictException(
          'Medical record already exists for this appointment.',
        );
      }
    }

    if (prescriptionId) {
      const prescription =
        await this.prescriptionModel.findById(prescriptionId);

      if (!prescription) {
        throw new NotFoundException('Prescription not found.');
      }
    }

    const medicalRecord = await this.medicalRecordModel.findByIdAndUpdate(
      id,
      updateMedicalRecordDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!medicalRecord) {
      throw new NotFoundException('Medical record not found.');
    }

    return medicalRecord;
  }

  async remove(id: string): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRecordModel.findByIdAndDelete(id);

    if (!medicalRecord) {
      throw new NotFoundException('Medical record not found.');
    }

    return medicalRecord;
  }
}
