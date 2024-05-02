import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    token: string;
}
