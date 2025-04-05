import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, Unique, OneToOne, JoinColumn, Relation } from "typeorm"
import { Account } from "./account.entity"

@Entity()
export class User{

    @PrimaryColumn()
    publicKey: string

    @Column()
    userName: string

    @OneToOne(() => Account, (account) => account.user )
    @JoinColumn()
    account: Relation<Account>

}
