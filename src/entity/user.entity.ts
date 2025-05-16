import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, Unique, OneToOne, JoinColumn, Relation, OneToMany } from "typeorm"
import { Account } from "./account.entity"
import { Character } from "./character.entity"
import { Referral } from "./referral.entity"

@Entity()
export class User{

    @PrimaryColumn()
    publicKey: string

    @Column()
    userName: string

    @OneToOne(() => Account, (account) => account.user )
    @JoinColumn()
    account: Relation<Account>

    @OneToMany(() => Character, (char) => char.user)
    @JoinColumn()
    characters: Relation<Character[]>

    @OneToOne(() => Referral, (referral) => referral.user)
    @JoinColumn()
    referral: Relation<Referral>

}
