import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, Unique } from "typeorm"

@Entity()
export class User{

    @PrimaryColumn()
    publicKey: string

    @Column()
    userName: string

}
