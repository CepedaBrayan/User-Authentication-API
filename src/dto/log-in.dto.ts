import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  public username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  public password: string;
}

export class LogInResponseDto {
  @ApiProperty()
  public access_token: string;
}
