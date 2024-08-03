import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Client } from "./Client";

export enum RoleTypes{
    ADMIN = 'admin',
    USER = 'user',
    TEST = 'test'
}


@Entity('role')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    role_id!: Number

   @Column({
    type: "enum",
    enum: RoleTypes
   })
   role!: RoleTypes


   @OneToMany(() => Client, client => client.role)
   clients!: Client[];

}
  


