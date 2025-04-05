import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, (user) => user.account)
    user: Relation<User>

    @Column()
    kino: number

    @Column()
    gems: number
}