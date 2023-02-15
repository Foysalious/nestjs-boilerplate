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
  async create(userId: string) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date();

    const attendance = await this.attendanceRepository.findOne({ where: { user_id: userId } })
    console.log(attendance);

    // const data = {
    //   "user_id": userId,
    //   "date": date,
    //   "day": days[date.getDay()],
    //   "month": months[date.getMonth()],
    //   "type": "check-in"
    // }
    // return this.attendanceRepository.save(data)
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
