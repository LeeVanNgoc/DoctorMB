import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

import { JwtAuthGuard } from '../common/guards/jwt_auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import type { AuthUser } from '../common/types/auth-user';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /**
   * Create review
   *
   * Customer only.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.reviewsService.create(createReviewDto, currentUser);
  }

  /**
   * Get reviews of a doctor
   *
   * Public.
   */
  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.reviewsService.findByDoctor(doctorId);
  }

  /**
   * Get current patient's reviews.
   */
  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMyReviews(@CurrentUser() currentUser: AuthUser) {
    return this.reviewsService.findMyReviews(currentUser);
  }
}
