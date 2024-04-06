import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  version: '1',
})
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  @Public()
  @ApiResponse({
    description: '{ message: User registered successfully }',
    status: 201,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.appService.findOne(createUserDto.username);
    if (existingUser) throw new ConflictException('Username already exists');
    await this.appService.register(createUserDto);
    return { message: 'User registered successfully' };
  }
}
