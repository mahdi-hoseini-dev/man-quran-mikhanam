import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ForgetPasswordDto } from '../user/dto/forget-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signup(@Body() signUpDto: CreateUserDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.resetPassword(forgetPasswordDto);
  }
}
