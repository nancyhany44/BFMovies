import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './Role';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({ unique: true })
  @IsNotEmpty()
  username!: string;

  @Column()
  @IsNotEmpty()
  name!: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email!: string;

  @Column()
  @IsNotEmpty()
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'role_id' })
  role!: Role | null;
}
