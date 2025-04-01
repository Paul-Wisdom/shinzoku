import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { DB_URL } from "./utils/config"

export const AppDataSource = new DataSource({
    type: "postgres",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
    url: DB_URL
})
