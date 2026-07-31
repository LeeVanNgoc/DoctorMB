import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.shema';
import { Patient, PatientDocument } from '../patient/schemas/patient.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
  ) {}
  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    // Check doctor exists
    const doctor = await this.doctorModel.findById(
      createAppointmentDto.doctorId,
    );
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    // Check patient exists
    const patient = await this.patientModel.findById(
      createAppointmentDto.patientId,
    );
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    // Validate appointment date
    const appointmentDate = new Date(createAppointmentDto.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    appointmentDate.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      throw new BadRequestException('Appointment date cannot be in the past');
    }
    // Check doctor's schedule conflict
    const existingAppointment = await this.appointmentModel.findOne({
      doctorId: createAppointmentDto.doctorId,
      appointmentDate: appointmentDate,
      appointmentTime: createAppointmentDto.appointmentTime,
    });
    if (existingAppointment) {
      throw new ConflictException(
        'Doctor already has an appointment at this time',
      );
    }
    // Create appointment
    const appointment =
      await this.appointmentModel.create(createAppointmentDto);
    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel
      .find()
      .populate('doctorId')
      .populate('patientId')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('doctorId')
      .populate('patientId');

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Check doctor exists (if updating doctor)
    if (updateAppointmentDto.doctorId) {
      const doctor = await this.doctorModel.findById(
        updateAppointmentDto.doctorId,
      );

      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }
    }

    // Check patient exists (if updating patient)
    if (updateAppointmentDto.patientId) {
      const patient = await this.patientModel.findById(
        updateAppointmentDto.patientId,
      );

      if (!patient) {
        throw new NotFoundException('Patient not found');
      }
    }

    // Validate appointment date (if updating date)
    if (updateAppointmentDto.appointmentDate) {
      const appointmentDate = new Date(updateAppointmentDto.appointmentDate);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      appointmentDate.setHours(0, 0, 0, 0);

      if (appointmentDate < today) {
        throw new BadRequestException('Appointment date cannot be in the past');
      }
    }

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, {
        new: true,
        runValidators: true,
      })
      .populate('doctorId')
      .populate('patientId');

    return updatedAppointment!;
  }

  async remove(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const deletedAppointment =
      await this.appointmentModel.findByIdAndDelete(id);

    return deletedAppointment!;
  }
}
