import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from './utils';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await hashPassword(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
  }
}
