import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('attendances')
export class Attendance extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    @Index()
    user_id: string;

    @Column()
    @Index()
    date: Number;

    @Column()
    @Index()
    day: string;

    @Column()
    @Index()
    timestamp: Date;

    @Column()
    @Index()
    month: String;

    @Column()
    @Index()
    year: Number;

    @Column()
    @Index()
    type: String;
}

