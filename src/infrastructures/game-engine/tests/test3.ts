import { AppDataSource } from "../../../data-source";
import { Character } from "../../../entity/character.entity";
import { gameEngine } from "../index";

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
    const charRepo = AppDataSource.getRepository(Character);
    return charRepo.find({});

}
).then(r => {
    console.log(r[0]);
    
    const c = gameEngine.getPlayerDataFromCharacter(r[0]);
    console.log(c.getBattleRank());
    
}).catch((err) => {
    console.error("Error during Data Source initialization", err)
}
);
