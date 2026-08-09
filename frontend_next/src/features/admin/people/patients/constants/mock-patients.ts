import { Patient } from "../types/patient";

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    patientCode: "PT0001",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 202-555-0101",
    gender: "male",
    dateOfBirth: "1995-03-15",
    status: "active",
  },
  {
    id: "2",
    patientCode: "PT0002",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 202-555-0102",
    gender: "female",
    dateOfBirth: "1998-08-22",
    status: "active",
  },
  {
    id: "3",
    patientCode: "PT0003",
    fullName: "David Brown",
    email: "david@example.com",
    phone: "+1 202-555-0103",
    gender: "male",
    dateOfBirth: "1992-11-07",
    status: "inactive",
  },
];