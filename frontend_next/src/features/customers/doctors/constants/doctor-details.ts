import type { DoctorDetail } from "../types/doctor-detail";

export const DOCTOR_DETAILS: DoctorDetail[] = [
 {
  id: "1",
  name: "Dr. John Smith",
  specialty: "Cardiology",
  hospital: "DoctorM Medical Center",
  yearsOfExperience: 10,
  rating: 4.9,
  totalReviews: 235,
  consultationFee: 30,

  about:
    "Dr. John Smith is a highly experienced cardiologist specializing in the diagnosis and treatment of cardiovascular diseases. He is committed to providing patient-centered care using the latest medical technologies.",

  education: [
    "Harvard Medical School",
    "Cardiology Residency - Massachusetts General Hospital",
  ],

  experience: [
    "Senior Cardiologist - DoctorM Medical Center",
    "Former Cardiologist - City Heart Hospital",
  ],

  schedule: [
    {
      day: "Monday",
      time: "08:00 - 17:00",
    },
    {
      day: "Wednesday",
      time: "08:00 - 17:00",
    },
    {
      day: "Friday",
      time: "08:00 - 12:00",
    },
  ],
},
{
  id: "2",
  name: "Dr. Sarah Johnson",
  specialty: "Dermatology",
  hospital: "Sunrise Dermatology Center",
  yearsOfExperience: 8,
  rating: 4.8,
  totalReviews: 189,
  consultationFee: 25,

  about:
    "Dr. Sarah Johnson specializes in diagnosing and treating skin, hair, and nail conditions. She focuses on preventive dermatology and personalized treatment plans.",

  education: [
    "Stanford University School of Medicine",
    "Dermatology Residency - Stanford Health Care",
  ],

  experience: [
    "Consultant Dermatologist - Sunrise Dermatology Center",
    "Former Dermatologist - California Skin Institute",
  ],

  schedule: [
    {
      day: "Tuesday",
      time: "08:30 - 16:30",
    },
    {
      day: "Thursday",
      time: "08:30 - 16:30",
    },
    {
      day: "Saturday",
      time: "08:00 - 12:00",
    },
  ],
},
{
  id: "3",
  name: "Dr. Michael Brown",
  specialty: "Pediatrics",
  hospital: "Children's Health Hospital",
  yearsOfExperience: 12,
  rating: 4.9,
  totalReviews: 312,
  consultationFee: 28,

  about:
    "Dr. Michael Brown provides comprehensive healthcare for infants, children, and adolescents. He is dedicated to creating a friendly and supportive environment for young patients.",

  education: [
    "Johns Hopkins University School of Medicine",
    "Pediatrics Residency - Johns Hopkins Hospital",
  ],

  experience: [
    "Senior Pediatrician - Children's Health Hospital",
    "Former Pediatrician - Mercy Children's Clinic",
  ],

  schedule: [
    {
      day: "Monday",
      time: "09:00 - 17:00",
    },
    {
      day: "Tuesday",
      time: "09:00 - 17:00",
    },
    {
      day: "Thursday",
      time: "09:00 - 12:00",
    },
  ],
},
{
  id: "4",
  name: "Dr. Emily Davis",
  specialty: "Neurology",
  hospital: "National Neurology Institute",
  yearsOfExperience: 15,
  rating: 5.0,
  totalReviews: 276,
  consultationFee: 40,

  about:
    "Dr. Emily Davis specializes in neurological disorders, including stroke, epilepsy, migraines, and neurodegenerative diseases. She emphasizes evidence-based treatment and long-term patient care.",

  education: [
    "Yale School of Medicine",
    "Neurology Residency - Yale New Haven Hospital",
  ],

  experience: [
    "Chief Neurologist - National Neurology Institute",
    "Former Neurologist - Boston Medical Center",
  ],

  schedule: [
    {
      day: "Monday",
      time: "08:00 - 15:00",
    },
    {
      day: "Wednesday",
      time: "08:00 - 15:00",
    },
    {
      day: "Friday",
      time: "08:00 - 15:00",
    },
  ],
},
];