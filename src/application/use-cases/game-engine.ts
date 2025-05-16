import { Character } from "../../entity/character.entity"
import { GameService } from "../../types/types"

export const simulateBattleUseCase = (engine: GameService) => {
    return (team1name: string, team1Char: Character[], team2name: string, team2Char: Character[]) => {
        const team1 = team1Char.map((character) => engine.getPlayerDataFromCharacter(character))
        const team2 = team2Char.map((character) => engine.getPlayerDataFromCharacter(character))

        return engine.simulateBattle(team1name, team1, team2name, team2)
    }
}
