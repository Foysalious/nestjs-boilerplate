import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from 'typeorm';
@Entity('companies')
export class Company extends BaseEntity { 
    @ObjectIdColumn()
    _id: string;
}
