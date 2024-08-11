import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany,
    JoinTable
  } from 'typeorm';
  import { Movie } from './Movie';

  @Entity('people')
  export class People extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;  
  
    @Column()
    name!: string;  

    @Column()
    birth_year!: string;

    @Column()
    eye_color!: string;

    @Column()
    gender!: string;

    @Column()
    hair_color!: string;

    @Column()
    height!: string;


    @Column()
    mass!: string;


    @Column()
    skin_color!: string;


    @Column()
    homeworld!: string;

    @Column()
    url!: string;

    @CreateDateColumn()
    created!: Date; 
  
    @UpdateDateColumn()
    edited!: Date;

    @ManyToMany(() => Movie, movie => movie.people)
    @JoinTable()  // Make sure this decorator is placed here
    movies!: Movie[];
  }



  