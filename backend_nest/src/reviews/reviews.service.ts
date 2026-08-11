import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Review, ReviewDocument } from './schemas/review.schema';

import { CreateReviewDto } from './dto/create-review.dto';

import { Patient, PatientDocument } from '../patient/schemas/patient.schema';

import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';

import { AppointmentStatus } from '../appointments/enums/appointment-status.enum';

import {
  Appointment,
  AppointmentDocument,
} from '../appointments/schemas/appointment.schema';

import type { AuthUser } from '../common/types/auth-user';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,

    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,

    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,

    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto, currentUser: AuthUser) {
    const { appointmentId, rating, comment } = createReviewDto;

    // 1. Validate Appointment ID
    if (!Types.ObjectId.isValid(appointmentId)) {
      throw new BadRequestException('Invalid appointment ID');
    }

    // 2. Find current Patient
    const patient = await this.patientModel.findOne({
      userId: currentUser.sub,
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    // 3. Find Appointment
    const appointment = await this.appointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // 4. Check appointment ownership
    if (appointment.patientId.toString() !== patient._id.toString()) {
      throw new ForbiddenException('You can only review your own appointments');
    }

    // 5. Appointment must be completed
    if (appointment.status !== AppointmentStatus.Completed) {
      throw new BadRequestException(
        'You can only review a completed appointment',
      );
    }

    // 6. Check duplicate review
    const existingReview = await this.reviewModel.findOne({
      appointmentId: new Types.ObjectId(appointmentId),
    });

    if (existingReview) {
      throw new ConflictException('This appointment has already been reviewed');
    }

    // 7. Get Doctor from Appointment
    const doctor = await this.doctorModel.findById(appointment.doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // 8. Create Review
    const review = new this.reviewModel({
      patientId: patient._id,
      doctorId: doctor._id,
      appointmentId: appointment._id,
      rating,
      comment: comment ?? '',
    });

    const savedReview = await review.save();

    // 9. Recalculate Doctor rating

    type RatingStats = {
      _id: Types.ObjectId;
      averageRating: number;
      totalReviews: number;
    };

    const ratingStats = await this.reviewModel.aggregate<RatingStats>([
      {
        $match: {
          doctorId: doctor._id,
        },
      },
      {
        $group: {
          _id: '$doctorId',
          averageRating: {
            $avg: '$rating',
          },
          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    const stats: RatingStats | undefined = ratingStats[0];

    if (!stats) {
      throw new BadRequestException('Unable to calculate doctor rating');
    }

    const averageRating = Math.round(stats.averageRating * 10) / 10;

    await this.doctorModel.findByIdAndUpdate(
      doctor._id,
      {
        rating: averageRating,
        totalReviews: stats.totalReviews,
      },
      {
        runValidators: true,
      },
    );

    return savedReview;
  }

  async findByDoctor(doctorId: string) {
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.reviewModel
      .find({
        doctorId: new Types.ObjectId(doctorId),
      })
      .populate({
        path: 'patientId',
        select: 'userId',
        populate: {
          path: 'userId',
          select: 'fullName',
        },
      })
      .sort({
        createdAt: -1,
      });
  }

  async findMyReviews(currentUser: AuthUser) {
    const patient = await this.patientModel.findOne({
      userId: currentUser.sub,
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    return this.reviewModel
      .find({
        patientId: patient._id,
      })
      .populate({
        path: 'doctorId',
        populate: [
          {
            path: 'userId',
            select: 'fullName',
          },
          {
            path: 'specialty',
            select: 'name slug',
          },
        ],
      })
      .sort({
        createdAt: -1,
      });
  }
}
