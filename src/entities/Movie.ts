import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany
  } from 'typeorm';
  import { People } from './People';
  
  @Entity('movies')
  export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    title!: string;
  
    @Column({ unique: true })
    episode_id!: number;
  
    @Column({ type: 'text' })
    description!: string;
  
    @Column()
    director!: string; 
  
    @Column()
    producer!: string; 

    @Column({ type: 'date' })
    release_date!: Date; 

    @Column()
    url!: string;

    // @Column()
    // genre!: string;

    // @Column({ type: 'float', nullable: true })
    // rating?: number;

   @CreateDateColumn()
   created!: Date;

   @UpdateDateColumn()
   edited!: Date;
  

    // @ManyToMany(() => People, person => person.movies)
    // people!: People[];

    @ManyToMany(() => People, person => person.movies, { cascade: true }) // Adding cascade option
    people!: People[];
  }
  