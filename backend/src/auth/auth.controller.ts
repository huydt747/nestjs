import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    const { username, password, confirmPassword } = body;
    return this.authService.register(username, password, confirmPassword);
  }

  @Post('login')
  login(@Body() body: any) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('reset')
  reset(@Body() body: any) {
    const { username, newPassword, confirmNewPassword } = body;
    return this.authService.resetPassword(username, newPassword, confirmNewPassword);
  }
}
