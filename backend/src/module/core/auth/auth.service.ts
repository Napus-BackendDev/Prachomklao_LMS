import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { payloadData } from 'src/common/types/auth-type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<payloadData | null> {
    const user = await this.usersService.findbyEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: payloadData) {
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
      sub: user.id,
    };
    return { access_Token: this.jwtService.sign(payload) };
  }
}
