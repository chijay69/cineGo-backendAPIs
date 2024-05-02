import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

import { Permission } from './permission'

@Entity({ name: "roles" })
export class Role {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ nullable: false })
    name: string

    @ManyToMany(()=> Permission)
    @JoinTable()
    permissions: Permission[];

}