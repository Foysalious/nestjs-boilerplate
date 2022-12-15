import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>,

  ) { }
  create(userId: string) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date_ob = new Date();
    


    return this.attendanceRepository.save({
     "user_id": userId,
     "date": date_ob,
     "day":days[date_ob.getDay()]
    })
  }

  findAll() {
    return `This action returns all attendence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendence`;
  }

  update(id: number, updateAttendenceDto: UpdateAttendenceDto) {
    return `This action updates a #${id} attendence`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendence`;
  }
}
