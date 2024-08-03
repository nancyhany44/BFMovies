import { Entity, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, PrimaryColumn, BaseEntity} from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "./Role";
@Entity('users')
export class Client extends BaseEntity {
    @PrimaryColumn({
        unique: true
    })
    user_id!: number;
    
    @Column({ unique: true })
    username!: string;

    @Column()
    name!: string;

    @Column()
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


    @ManyToOne(() => Role, role => role.clients, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
    @JoinColumn({ name: 'role_id' })
    role!: Role;
}

