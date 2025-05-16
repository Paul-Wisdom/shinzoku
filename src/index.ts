import { AppDataSource } from "./data-source"
import { User } from "./entity/user.entity"

import "reflect-metadata"
import { app } from "./app"
import { DB_URL } from "./utils/config"

AppDataSource.initialize().then(async () => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })

}).catch(error => console.log(error))
