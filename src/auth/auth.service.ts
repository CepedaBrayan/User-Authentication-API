import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from 'src/dto/log-in.dto';
import { AppService } from '../app.service';
import { comparePasswords } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private appService: AppService,
    private jwtService: JwtService,
  ) {}

  async logIn(logInDto: LogInDto): Promise<{ access_token: string }> {
    const { username, password } = logInDto;
    const user = await this.appService.findOne(username);
    if ((await comparePasswords(password, user.password)) === false)
      throw new UnauthorizedException();
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
