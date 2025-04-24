import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Referral {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @OneToOne(() => User, (user) => user.referral)
    user: User

    @Column({default: 0})
    numberOfReferrals: number

    @Column({unique: true})
    referralCode: string
}