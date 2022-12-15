import { Controller, Get, Post, Body, Patch, UsePipes, Param, Delete, Res, ValidationPipe, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const user = await this.authService.register(registerDto);
    return response.status(201).send(user);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() authCredentialDto: LoginDto) {
    return await this.authService.login(authCredentialDto);
  }

  @Post('auth/refresh')
  @UsePipes(new ValidationPipe({ transform: true }))
  async refreshToken(@Res() response: Response) {
    const token = await this.authService.refresh(response.locals.userPayload);
    return response.status(201).send(token);
  }
}
