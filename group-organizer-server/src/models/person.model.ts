import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.model';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPerson: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  jobTitle: string;

  @Column()
  dateCreated: Date;

  @Column()
  dateModified?: Date; 

  @ManyToOne(() => Group, (group) => group.idGroup)
  assignedGroup?: number;
}