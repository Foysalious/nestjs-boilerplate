import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt-stratergy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET ?? 'topsecret51',
      signOptions: {
        expiresIn: 3000,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
