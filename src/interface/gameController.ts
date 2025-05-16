import { Request, Response } from "express";
import { FindUserByPublicKeyUseCase, GetCharacterByIdUseCase, GetUserCharactersUseCase, SimulateBattleUseCase } from "../types/types";
import { Character } from "../entity/character.entity";

export const GameController = ({ simulateBattle, getCharacterById, findUserByPublicKey, getUserCharacters }: { simulateBattle: SimulateBattleUseCase, getCharacterById: GetCharacterByIdUseCase, findUserByPublicKey: FindUserByPublicKeyUseCase, getUserCharacters: GetUserCharactersUseCase }) => {
    return {
        PVEBattleSimulationController: async (req: Request, res: Response) => {
            try {
                const playerCharIds = req.body.playerCharIds
                const opponentCharId = req.body.opponentCharIds
                const userPublicKey = req.user?.publicKey
                if (!userPublicKey) {
                    res.status(400).json({ error: "No public key provided" })
                    return
                }
                const user = await findUserByPublicKey(userPublicKey)

                if (!playerCharIds) {
                    res.status(400).json({ error: "No character IDs provided" })
                    return
                }
                if (!opponentCharId) {
                    res.status(400).json({ error: "No enemy character IDs provided" })
                    return
                }

                //load players characters
                const playerTeam = await getUserCharacters(playerCharIds, userPublicKey)

                const opponentTeam: Character[] = await Promise.all(
                    opponentCharId.map(async (id: string) => {
                        const character = await getCharacterById(id)
                        if (!character) {
                            res.status(400).json({ error: "Character not found", characterId: id })
                            return
                        }
                        return character
                    })
                )

                const playerTeamName = `${user?.userName}'s team`
                const opponentTeamName = "AI's team"
                const result = simulateBattle(playerTeamName, playerTeam, opponentTeamName, opponentTeam)
                res.json(result)
            } catch (error) {
                console.error(error)
                res.status(500).json({ error: "Error simulating battle" })
            }
        }

    }
}
