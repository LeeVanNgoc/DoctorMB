import { Role } from '../enums/role.enum';
export interface AuthUser {
  sub: string;
  role: Role;
}
