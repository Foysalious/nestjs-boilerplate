import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    const data = {
      "user_id": userId,
      "timestamp": date,
      "day": days[date.getDay()],
      "month": months[date.getMonth()],
      "year": date.getFullYear(),
      "date": date.getDate(),
      "type": "check-out"
    }
    const attendance = await this.attendanceRepository.findOne({ where: { user_id: userId, day: days[date.getDay()], month: months[date.getMonth()], year: date.getFullYear() }, order: { _id: "DESC" } })
    if (attendance == undefined) data.type = "check-in"
    if (attendance != undefined && attendance.type == "check-out") {
      throw new UnauthorizedException("You have already checked out for today!")
    }
    return this.attendanceRepository.save(data)

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
