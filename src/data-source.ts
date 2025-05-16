import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"
import { DB_URL } from "./utils/config"
import { Account } from "./entity/account.entity"
import { Character } from "./entity/character.entity"
import { Referral } from "./entity/referral.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [User, Account, Character, Referral],
    migrations: [],
    subscribers: [],
    url: DB_URL
})
