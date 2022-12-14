import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import dbConfig from './config/database.config';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { AttendenceModule } from './attendence/attendance.module';
import { Attendance } from './attendence/entities/attendance.entity';
import { AttendanceController } from './attendence/attendance.controller';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig()), AuthModule, UserModule, TypeOrmModule.forFeature([User, Attendance]), CompanyModule, AttendenceModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, UserService],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware).exclude(
        { path: 'api/v1/auth/login', method: RequestMethod.POST },
        { path: 'api/v1/auth/register', method: RequestMethod.POST }
      )
      .forRoutes(AuthController, AttendanceController);
  }
}
