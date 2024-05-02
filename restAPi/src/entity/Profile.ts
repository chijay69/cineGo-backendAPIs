import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";

@Entity({ name: "profile"})
export class Profile {

    @Column({ nullable: false })
    profileName: string;

    @Column({ nullable: false })
    profileAvatar: string;

    @Column()
    profilePin: number;

    @Column({nullable:false})
    Rratings: string

    @Column({ default: false })
    profileLock: boolean;

    @Column({nullable: false})
    displayLanguage: string;

    @Column({nullable: false})
    audioSubtitle: string;

    @Column({ default: true })
    autoPlaynext: boolean

    @ManyToOne(()=>(User), (user)=>user.profile)
    user: User
}