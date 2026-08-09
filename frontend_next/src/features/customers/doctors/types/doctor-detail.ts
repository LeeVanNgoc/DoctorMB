export interface DoctorSchedule {
  day: string;
  time: string;
}

export interface DoctorDetail {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  yearsOfExperience: number;
  rating: number;
  totalReviews: number;
  consultationFee: number;
  avatar?: string;

  about: string;
  education: string[];
  experience: string[];

  schedule: DoctorSchedule[];
}