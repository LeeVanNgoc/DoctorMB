import { PartialType } from '@nestjs/mapped-types';

import { CreateDoctorExperienceDto } from './create-experience.dto';

export class UpdateDoctorExperienceDto extends PartialType(
  CreateDoctorExperienceDto,
) {}
