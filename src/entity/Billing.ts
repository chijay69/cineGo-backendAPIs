import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Status } from "./Status";
import { Plan } from "./Plan";

@Entity({ name: "billing"})
export class Billing {

    @PrimaryGeneratedColumn("rowid")
    id: number

    @Column({ nullable: false })
    description: string

    @Column({ nullable: false })
    ammount: number

    @Column()
    status: Status[];
    
    @Column()
    plan: Plan[];

    @Column()
    method: string; // e.g., 'credit card'

    @Column()
    schedule: string; // e.g., 'monthly'

    @CreateDateColumn()
    startAt: Date;

    @UpdateDateColumn()
    endAt: Date;
    
    @ManyToOne(() => User, (user) => user.billing)
    user: User;
}