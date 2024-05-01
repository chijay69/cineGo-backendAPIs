// class Role {
//     constructor(public name: string, public permissions: Permission[]) {
        
//     }
// }

// export const adminRole = new Role("Admin", [Permission.READ, Permission.WRITE, Permission.CREATE, Permission.UPDATE, Permission.DELETE]);

// export const userRole = new Role("User", [Permission.READ, Permission.WRITE, Permission.CREATE]);

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