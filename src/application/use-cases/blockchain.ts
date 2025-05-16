import { Character } from "../../entity/character.entity"
import { specialAbilityData } from "../../infrastructures/game-engine/types"
import { SolanaService, specialAbilityDataWithNFT } from "../../types/types"

export const verifySignatureUseCase = (solanaService: SolanaService) => {
    return (pubKey: string, signature: string, message: string) => {
        return solanaService.verifySignature(pubKey, signature, message)
    }
}

export const mintSpecialAbilityUseCase = (solanaService: SolanaService) => {
    return async (ability: specialAbilityData[], publicKey: string) => {
        let returnedAblity : specialAbilityDataWithNFT[] = []
        let nftId: string
        ability.forEach(async (ability) => {
            nftId = await solanaService.mintSpecialAbility(ability, publicKey)
            returnedAblity.push({ ...ability, nftId })
        })
        return returnedAblity; 
    }
}

export const mintCharacterUseCase = (solanaService: SolanaService) => {
    return async (characters: Character, publicKey: string) => {
        let nftId: string
        nftId = await solanaService.mintCharacter(characters, publicKey)
        return nftId; 
    }
}