import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { User } from 'src/common/interface/user-interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: User, @Res({ passthrough: true }) res: Response) {
    const { access_Token } = await this.authService.login(req.user);
    res.cookie('access_Token', access_Token, {
      httpOnly: true,
    });
    return { message: 'Successfully Logging in' };
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_Token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    });

    return { message: 'Logout successful.' };
  }
}
