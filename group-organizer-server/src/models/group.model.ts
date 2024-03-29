import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  idGroup: number;

  @Column()
  name: string;
  
  @Column()
  dateCreated: Date;

  @Column()
  dateModified: Date;

  @Column()
  assignedGroupId?: number;
}