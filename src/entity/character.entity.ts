import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity";
import { attribute } from "../infrastructures/game-engine/types";
import { Exclude } from "class-transformer";

type specialAbility = {
    nftId: string,
    name: string,
    value: number,
    mpCost: number,
    abilityName: string
}

@Entity()
export class Character{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: true})
    nftID: string

    @Column()
    name: string

    @Exclude()
    @ManyToOne(() => User, (user) => user.characters)
    user: Relation<User>

    @Column()
    class: string

    @Column('jsonb')
    attributes: attribute

    @Column('jsonb')
    specialAbilities: specialAbility[]
}
