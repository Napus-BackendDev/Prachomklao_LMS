import { Role } from 'src/module/core/auth/enum/role-enum';

export interface payloadData {
  id: string;
  username: string;
  email: string;
  role: string;
  sub?: string;
}

interface JwtUser {
  id: string;
  email: string;
  role: Role;
}

export interface AuthRequest extends Request {
  user: JwtUser;
}
