import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    if (loginDto.username === 'admin' && loginDto.password === 'admin') {
      const tokenPayload = { username: loginDto.username };
      const access_token = await this.jwtService.signAsync(tokenPayload);

      return {
        userId: 0,
        username: loginDto.username,
        access_token,
      };
    } else {
      return 'Invalid login';
    }
  }
}
