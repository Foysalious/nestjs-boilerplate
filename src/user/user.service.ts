import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

  ) { }
  async createUserByEmail(request: { password: string; email: string; name: string; }) {

    const salt = await bcrypt.genSaltSync(10);
    if (request.password)
      request.password = request.password
        ? await bcrypt.hashSync(request.password, salt)
        : null;
    const user = await this.userRepository.findOne({
      where: {
        email: request.email,
      }
    })
    if (user != undefined) {
      throw new UnauthorizedException("User Already Exist")
    }
    return await this.userRepository.save({
      email: request.email,
      password: request.password,
      name: request.name
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
