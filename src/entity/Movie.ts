import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
  } from "typeorm";
import { User } from "./User";
  
  @Entity({ name: "movies" })
  export class Movie {
    @PrimaryGeneratedColumn("uuid")
    id: number;
  
    @Column({ nullable: false })
    title: string;
  
    @Column({ nullable: false })
    description: string;
  
    @Column({ nullable: false })
    url: string;
  
    @Column({ nullable: false })
    director: string;
  
    @Column({ nullable: false })
    year: number;
  
    @Column({ nullable: false })
    rating: string;
  
    @Column({ nullable: false })
    image: string;
  
    @Column("simple-array",{ nullable: false })
    cast: string[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user) => user.movies)
    @JoinTable()
    user: User;
  }