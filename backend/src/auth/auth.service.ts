import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(username: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new BadRequestException('Mật khẩu không trùng khớp');
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
}
