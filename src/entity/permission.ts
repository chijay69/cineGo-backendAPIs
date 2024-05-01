// enum Permission {
//     READ = "READ",
//     WRITE = "WRITE",
//     CREATE = "CREATE",
//     UPDATE = "UPDATE",
//     DELETE = "DELETE"
// }

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "permissions" })
export class Permission {
    @PrimaryGeneratedColumn("rowid")
    id: number

    @Column({ nullable: false })
    name: string

}