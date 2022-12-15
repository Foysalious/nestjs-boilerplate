import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
require('dotenv').config()
// 'mongodb+srv://qwerty1234:qwerty1234@cluster0.7bupr.mongodb.net/attendence'
// mongodb://localhost:27017/attendence
export default registerAs(
    'typeOrmConfig',
    (): TypeOrmModuleOptions => ({
        type: 'mongodb',
        url: process.env.MONGO_DSN,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        useUnifiedTopology: true  
    }),
); 
 