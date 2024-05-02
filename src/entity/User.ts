import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, OneToOne } from "typeorm"
import { Role } from "./role"
import { Movie } from "./Movie"
import { Billing } from "./Billing"
import { CreditCard } from "./CreditCard"
import { Profile } from "./Profile"


@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;
    
    @Column({ nullable: false })
    country: string;
    
    @Column({ nullable: true })
    referalCode?: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(()=> CreditCard, (creditCard)=> creditCard.user)
    creditCard: CreditCard;

    @OneToMany(()=>Profile, (profile)=>profile.user)
    profile: Profile;
    
    @ManyToMany(() => Movie, (movie) => movie.user)
    @JoinTable()
    movies: Movie;

    @OneToMany(() => Billing, (billing) => billing.user)
    billing: Billing[];
    
    @ManyToMany(()=> Role)
    @JoinTable()
    roles: Role[]
}
