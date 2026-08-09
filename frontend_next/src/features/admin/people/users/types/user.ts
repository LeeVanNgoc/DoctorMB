export type UserRole =
  | "admin"
  | "doctor"
  | "patient"
  | "receptionist";


export type UserStatus =
  | "active"
  | "inactive";


export interface User {
  _id: string;

  fullName: string;

  email: string;

  role: UserRole;

  status: UserStatus;

  createdAt?: string;

  updatedAt?: string;
}


export interface CreateUserRequest {
  fullName: string;

  email: string;

  password: string;

  role: UserRole;

  status: UserStatus;
}


export interface UpdateUserRequest {
  fullName?: string;

  email?: string;

  role?: UserRole;

  status?: UserStatus;
}

export interface UserFormValues {
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}


export type UserFormMode =
  | "create"
  | "edit"
  | "view";