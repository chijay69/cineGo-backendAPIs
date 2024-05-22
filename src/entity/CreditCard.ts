import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { User } from "./User";

  @Entity({ name: "creditcards"})
  export class CreditCard{
    @PrimaryGeneratedColumn("uuid")
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