import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { isString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

type decodedToken = null | {
  [key: string]: any;
} | string
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) { }

  async register(request: RegisterDto): Promise<{ token: string }> {
    const user = await this.userService.createUserByEmail(request);
    return await this.getAccessToken(user._id, user.name, user.email, user.company_id, user.role);
  }

  async refresh(token: any) {
    return await this.getAccessToken(token._id, token.name, token.email, token.company_id, token.role);
  }

  async login(authCredentialDto: LoginDto) {
    const { email, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user == undefined) throw new NotFoundException("No User Found")
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Incorrect username or password');
    return await this.getAccessToken(user._id, user.name, user.email, user.company_id, user.role);
  }

  async getAccessToken(id: string, name: string, email: string, company_id: string, role: string): Promise<{ token: string }> {
    const payload: JwtPayload = { id, name, email, company_id, role };
    const secret = { secret: process.env.APP_SECRET ?? 'topsecret51' };
    const token = this.jwtService.sign(payload, secret);
    return { token };
  }

  async getProfile(userInfo: { email: string }) {
    const user = await this.userRepository.findOne({ where: { email: userInfo.email, }, select: ['_id', 'email'] });
    if (user == undefined) throw new NotFoundException("No User Found")
    return user
  }

  async jwtTokenDecode(jwt: string): Promise<JwtPayload> {
    const decodedToken: decodedToken = this.jwtService.decode(jwt);
    if (!decodedToken || isString(decodedToken)) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    this.getProfile({ email: decodedToken.email })
    return { id: decodedToken.id, name: decodedToken.name, email: decodedToken.email, company_id: decodedToken.company_id, role: decodedToken.role };
  }
}
