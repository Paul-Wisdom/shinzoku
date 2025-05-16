import { AppDataSource } from "./data-source";
import { User } from "./entity/user.entity";

import "reflect-metadata";
import { app } from "./app";
import { DB_URL, PORT } from "./utils/config";

AppDataSource.initialize()
    .then(async () => {
        const port = process.env.PORT || 3000; // Use the PORT environment variable or fallback to 3000
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
