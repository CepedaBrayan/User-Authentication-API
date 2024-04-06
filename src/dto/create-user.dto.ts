import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
