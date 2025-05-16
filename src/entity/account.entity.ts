import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    id: number

    @Exclude()
    @OneToOne(() => User, (user) => user.account)
    user: Relation<User>

    @Column()
    kino: number

    @Column()
    gems: number
}