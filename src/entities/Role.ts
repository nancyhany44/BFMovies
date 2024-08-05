import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { RoleEnum, Constants } from '../enums/RoleEnum';

@Entity('role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  role_id!: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
  })
  role!: RoleEnum;

  @OneToMany(() => Users, (user) => user.role)
  users!: Users[];
}
