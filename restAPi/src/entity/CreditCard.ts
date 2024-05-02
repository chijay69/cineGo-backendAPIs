import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./User";

  @Entity({ name: "creditcards"})
  export class CreditCard{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cardNumber: string

    @Column()
    expairyDate: string

    @Column()
    cvv: string

    @OneToOne(()=>User, (user)=>user.creditCard)
    @JoinColumn()
    user: User
  }