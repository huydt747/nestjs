import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(username: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new BadRequestException('Mật khẩu không trùng khớp');
    const minLen = 6;
    if (password.length < minLen) {
      throw new BadRequestException('Mật khẩu cần tối thiểu 6 ký tự');
    }
    const exist = await this.usersService.findByUsername(username);
    if (exist) throw new BadRequestException('Tên tài khoản đã tồn tại');

    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ username, password_hash: hash });
    return { message: 'Đăng ký thành công', user };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Sai tên tài khoản');

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new UnauthorizedException('Sai mật khẩu');

    const payload = { username: user.username, role: user.role, sub: user.user_id };
    const token = this.jwtService.sign(payload);
    return { access_token: token, user };
  }

  async resetPassword(username: string, newPassword: string, confirmNewPassword: string) {
    if (!username) throw new BadRequestException('Vui lòng cung cấp username');
    if (newPassword !== confirmNewPassword) throw new BadRequestException('Mật khẩu không trùng khớp');
    const minLen = 6;
    if (newPassword.length < minLen) {
      throw new BadRequestException('Mật khẩu cần tối thiểu 6 ký tự');
    }

    const user = await this.usersService.findByUsername(username);
    if (!user) throw new BadRequestException('User không tồn tại');

    const hash = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(user.user_id, { password_hash: hash });
    return { message: 'Đặt lại mật khẩu thành công' };
  }
}
