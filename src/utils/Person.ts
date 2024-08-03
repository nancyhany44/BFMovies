import { Entity, BaseEntity, Column} from "typeorm";

@Entity()
export class Person extends BaseEntity {

    @Column({ unique: true })
    username!: string;



}
