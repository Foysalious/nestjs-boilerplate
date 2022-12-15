import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('attendance')
export class Attendance extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    user_id: string;

    @Column()
    @Index()
    date: Date;

    @Column()
    @Index()
    day: string;
}

