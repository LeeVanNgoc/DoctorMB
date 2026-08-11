import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  Schedule,
  ScheduleDocument,
  ScheduleStatus,
} from './schemas/schedule.schema';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';

import type { AuthUser } from '../common/types/auth-user';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<ScheduleDocument>,

    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  /**
   * Create schedule
   *
   * ADMIN:
   * - Can create schedule for any doctor.
   *
   * DOCTOR:
   * - Can only create schedule for himself.
   */
  async create(createScheduleDto: CreateScheduleDto, currentUser: AuthUser) {
    const { doctorId, date, startTime, endTime } = createScheduleDto;

    // 1. Validate Doctor ID
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    // 2. Check Doctor exists
    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // 3. Check ownership
    if (currentUser.role === Role.DOCTOR) {
      if (doctor.userId.toString() !== currentUser.sub) {
        throw new ForbiddenException(
          'Doctors can only create schedules for themselves',
        );
      }
    }

    // 4. Validate time
    this.validateTimeRange(startTime, endTime);

    const scheduleDate = new Date(date);

    if (Number.isNaN(scheduleDate.getTime())) {
      throw new BadRequestException('Invalid schedule date');
    }

    // 5. Check overlapping schedule
    const hasOverlap = await this.scheduleModel.exists({
      doctorId: new Types.ObjectId(doctorId),
      date: scheduleDate,
      status: {
        $ne: ScheduleStatus.CANCELLED,
      },
      startTime: {
        $lt: endTime,
      },
      endTime: {
        $gt: startTime,
      },
    });

    if (hasOverlap) {
      throw new ConflictException(
        'Doctor already has a schedule during this time',
      );
    }

    // 6. Create schedule
    const schedule = new this.scheduleModel({
      doctorId: new Types.ObjectId(doctorId),
      date: scheduleDate,
      startTime,
      endTime,
      status: ScheduleStatus.AVAILABLE,
    });

    return schedule.save();
  }

  /**
   * Get schedules
   *
   * ADMIN:
   * - Can see all schedules.
   *
   * DOCTOR:
   * - Can only see his own schedules.
   */
  async findAll(currentUser: AuthUser) {
    if (currentUser.role === Role.DOCTOR) {
      const doctor = await this.doctorModel.findOne({
        userId: currentUser.sub,
      });

      if (!doctor) {
        throw new NotFoundException('Doctor profile not found');
      }

      return this.scheduleModel
        .find({
          doctorId: doctor._id,
        })
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
          date: 1,
          startTime: 1,
        });
    }

    return this.scheduleModel
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
        date: 1,
        startTime: 1,
      });
  }

  /**
   * Get schedules of a specific doctor.
   *
   * This endpoint can be public because
   * customers need to see available schedules.
   */
  async findByDoctor(doctorId: string) {
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.scheduleModel
      .find({
        doctorId: new Types.ObjectId(doctorId),
        status: ScheduleStatus.AVAILABLE,
      })
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
        date: 1,
        startTime: 1,
      });
  }

  /**
   * Get schedule detail.
   *
   * Can be public because customers may need
   * schedule information before booking.
   */
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid schedule ID');
    }

    const schedule = await this.scheduleModel.findById(id).populate({
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
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  /**
   * Update schedule
   *
   * ADMIN:
   * - Can update any schedule.
   *
   * DOCTOR:
   * - Can only update his own schedule.
   * - Cannot change doctorId.
   */
  async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
    currentUser: AuthUser,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid schedule ID');
    }

    const existingSchedule = await this.scheduleModel.findById(id);

    if (!existingSchedule) {
      throw new NotFoundException('Schedule not found');
    }

    // 1. Prevent updating booked schedule
    if (existingSchedule.status === ScheduleStatus.BOOKED) {
      throw new BadRequestException('Booked schedule cannot be updated');
    }

    // 2. Check ownership for Doctor
    if (currentUser.role === Role.DOCTOR) {
      const doctor = await this.doctorModel.findOne({
        userId: currentUser.sub,
      });

      if (!doctor) {
        throw new NotFoundException('Doctor profile not found');
      }

      if (existingSchedule.doctorId.toString() !== doctor._id.toString()) {
        throw new ForbiddenException(
          'Doctors can only update their own schedules',
        );
      }

      // Doctor cannot change doctorId
      if (
        updateScheduleDto.doctorId &&
        updateScheduleDto.doctorId !== existingSchedule.doctorId.toString()
      ) {
        throw new ForbiddenException(
          'Doctors cannot change the owner of a schedule',
        );
      }
    }

    // 3. Determine final values
    const doctorId =
      currentUser.role === Role.DOCTOR
        ? existingSchedule.doctorId.toString()
        : (updateScheduleDto.doctorId ?? existingSchedule.doctorId.toString());

    const date = updateScheduleDto.date ?? existingSchedule.date.toISOString();

    const startTime = updateScheduleDto.startTime ?? existingSchedule.startTime;

    const endTime = updateScheduleDto.endTime ?? existingSchedule.endTime;

    // 4. Validate Doctor ID
    if (!Types.ObjectId.isValid(doctorId)) {
      throw new BadRequestException('Invalid doctor ID');
    }

    // 5. Check Doctor exists
    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // 6. Validate time
    this.validateTimeRange(startTime, endTime);

    const scheduleDate = new Date(date);

    if (Number.isNaN(scheduleDate.getTime())) {
      throw new BadRequestException('Invalid schedule date');
    }

    // 7. Check overlapping schedule
    const hasOverlap = await this.scheduleModel.exists({
      _id: {
        $ne: id,
      },
      doctorId: new Types.ObjectId(doctorId),
      date: scheduleDate,
      status: {
        $ne: ScheduleStatus.CANCELLED,
      },
      startTime: {
        $lt: endTime,
      },
      endTime: {
        $gt: startTime,
      },
    });

    if (hasOverlap) {
      throw new ConflictException(
        'Doctor already has a schedule during this time',
      );
    }

    // 8. Update schedule
    const schedule = await this.scheduleModel.findByIdAndUpdate(
      id,
      {
        doctorId: new Types.ObjectId(doctorId),
        date: scheduleDate,
        startTime,
        endTime,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  /**
   * Cancel schedule
   *
   * ADMIN:
   * - Can cancel any schedule.
   *
   * DOCTOR:
   * - Can only cancel his own schedule.
   */
  async remove(id: string, currentUser: AuthUser) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid schedule ID');
    }

    const schedule = await this.scheduleModel.findById(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    // 1. Prevent deleting booked schedule
    if (schedule.status === ScheduleStatus.BOOKED) {
      throw new BadRequestException('Booked schedule cannot be cancelled');
    }

    // 2. Check ownership
    if (currentUser.role === Role.DOCTOR) {
      const doctor = await this.doctorModel.findOne({
        userId: currentUser.sub,
      });

      if (!doctor) {
        throw new NotFoundException('Doctor profile not found');
      }

      if (schedule.doctorId.toString() !== doctor._id.toString()) {
        throw new ForbiddenException(
          'Doctors can only cancel their own schedules',
        );
      }
    }

    // 3. Soft delete / cancel
    await this.scheduleModel.findByIdAndUpdate(id, {
      status: ScheduleStatus.CANCELLED,
    });

    return {
      message: 'Schedule cancelled successfully',
    };
  }

  private validateTimeRange(startTime: string, endTime: string) {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);

    if (start === null || end === null) {
      throw new BadRequestException('Invalid time format. Expected HH:mm');
    }

    if (start >= end) {
      throw new BadRequestException('Start time must be before end time');
    }
  }

  private timeToMinutes(time: string): number | null {
    const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);

    if (!match) {
      return null;
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    return hours * 60 + minutes;
  }
}
