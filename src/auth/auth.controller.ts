import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogInDto, LogInResponseDto } from '../dto/log-in.dto';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';

@Controller({
  version: '1',
})
@ApiTags('App')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOkResponse({ type: LogInResponseDto })
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @Get('protected')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '{ message: Access granted }',
  })
  protected() {
    return { message: 'Access granted' };
  }
}
