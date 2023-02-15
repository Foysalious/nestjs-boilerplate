import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendenceDto as CreateAttendanceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto as UpdateAttendanceDto } from './dto/update-attendence.dto';
import { Response, Request } from 'express';
@Controller('api/v1')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post('attendance')
  storeUserAttendance(@Res() response: Response) {
     this.attendanceService.create(response.locals.userPayload.id);
    return response.status(201).send({ message: "Successful" });
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
