import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './module/core/user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  create(@Body() createStudentDto: CreateUserDto) {
    return this.appService.register(createStudentDto);
  }

  @Post('/resetpassword')
  resetpassword(@Body() resetPassword: { email: string; password: string }) {
    return this.appService.resetPasssword(resetPassword.email,resetPassword.password)
  }
}
