import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
require('dotenv').config()

export default registerAs(
    'typeOrmConfig',
    (): TypeOrmModuleOptions => ({
        type: 'mongodb',
        url: 'mongodb+srv://qwerty1234:qwerty1234@cluster0.7bupr.mongodb.net/attendence',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        useUnifiedTopology: true 
    }),
);
