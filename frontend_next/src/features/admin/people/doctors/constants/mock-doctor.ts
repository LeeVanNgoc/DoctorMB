import { Doctor } from "../types";

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "1",
    fullName: "Dr. John Smith",
    email: "john.smith@doctorm.com",
    phone: "+1 202-555-0101",
    specialty: "Cardiology",
    licenseNumber: "DOC-1001",
    yearsOfExperience: 12,
    status: "active",
  },
  {
    id: "2",
    fullName: "Dr. Emily Johnson",
    email: "emily.johnson@doctorm.com",
    phone: "+1 202-555-0102",
    specialty: "Dermatology",
    licenseNumber: "DOC-1002",
    yearsOfExperience: 8,
    status: "active",
  },
  {
    id: "3",
    fullName: "Dr. Michael Brown",
    email: "michael.brown@doctorm.com",
    phone: "+1 202-555-0103",
    specialty: "Neurology",
    licenseNumber: "DOC-1003",
    yearsOfExperience: 15,
    status: "inactive",
  },
];