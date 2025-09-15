import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User } from 'src/common/interface/user-interface';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
    , private readonly userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: User, @Res({ passthrough: true }) res: Response) {
    const { access_Token } = await this.authService.login(req.user);
    res.cookie('access_Token', access_Token, {
      httpOnly: true,
      secure: true
    });
    return { message: 'Successfully Logging in' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: User) {
    return this.userService.findOne(req.user.id);
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_Token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return { message: 'Logout successful.' };
  }
}
