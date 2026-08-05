import { User } from "../types/user";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane@example.com",
    role: "doctor",
    status: "active",
  },
  {
    id: "3",
    fullName: "David Brown",
    email: "david@example.com",
    role: "patient",
    status: "inactive",
  },
];