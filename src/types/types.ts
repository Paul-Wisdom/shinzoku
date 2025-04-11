import { PublicKey } from "@solana/web3.js"
import { User } from "../entity/user.entity"
import { Character } from "../entity/character.entity"
import { GameCharacter } from "../infrastructures/game-engine/classes/characters"
import { UpdateResult } from "typeorm"
import { specialAbilityData } from "../infrastructures/game-engine/types"

export type UserRepo = {
    findUserByPublicKey: (key: string) => Promise<User | null>,
    findUserByUsername: (username: string) => Promise<User | null>,
    createNewUserAndAccount: (username: string, publicKey: string) => Promise<User>,
    saveUser: (user: User) => Promise<User>,
}
export type CharacterRepository = {
    getCharacterById: (id: string) => Promise<Character | null>,
    getAllCharacters: () => Promise<Character[]>,
    getCharacterByNftId: (nftID: string) => Promise<Character | null>,
    generateRandomWarrior: (name: string,  user: User, ability: specialAbilityDataWithNFT) => Promise<Character>,
    generateRandomMage: (name: string,  user: User, ability: specialAbilityDataWithNFT) => Promise<Character>,
    generateRandomHealer: (name: string, user: User, ability: specialAbilityDataWithNFT) => Promise<Character>,
    updateCharacterNftId: (charId: string, nftID: string) => Promise<Character>,
    getRandomWarriorSpecialAbility: () => specialAbilityData,
    getRandomMageSpecialAbility: () => specialAbilityData
    getRandomHealerSpecialAbility: () => specialAbilityData
    
};
export type SolanaService = {
    verifySignature: (pubKey: string, signature: string, message: string) => boolean,
    convertStringToPublicKey: (key: string) => PublicKey,
    mintSpecialAbility: (ability: specialAbilityData, publicKey: string) => Promise<string>,
    mintCharacter: (characters: Character, publicKey: string) => Promise<string>,
}

export type CryptoEncryptionService = {
   generateNounce: () => string
}

export type GameService = {
    simulateBattle: (team1name: string, team1: GameCharacter[], team2name: string, team2: GameCharacter[]) => void,
    getPlayerDataFromCharacter: (character: Character) => GameCharacter
}

export type SimulateBattleUseCase = (team1name: string, team1Char: Character[], team2name: string, team2Char: Character[]) => void
export type CheckIfUserIsNewUseCase = (key: string) => Promise<boolean>
export type GenerateNounceUseCase = () => string
export type VerifySignatureUseCase = (pubKey: string, signature: string, message: string) => boolean
export type CheckIfUsernameIsUniqueUseCase = (username: string) => Promise<boolean>
export type CreateNewUserUseCase = (username: string, publicKey: string) => Promise<User>
export type FindUserByPublicKeyUseCase = (publicKey: string) => Promise<User | null>
export type GenerateStarterCharactersUseCase = (user: User, abilities: specialAbilityDataWithNFTObject) => Promise<Character[]>
export type AddCharactersToUserUseCase = (user: User, chars: Character[]) => Promise<User>
export type GenerateSpecialAbilitiesUseCase = () => {
    warrior: specialAbilityData[];
    mage: specialAbilityData[];
    healer: specialAbilityData[];
}
export type MintSpecialAbilityUseCase = (ability: specialAbilityData[], publicKey: string) => Promise<specialAbilityDataWithNFT[]>
export type MintCharacterUseCase = (characters: Character, publicKey: string) => Promise<string>
export type UpdateCharacterNftIdUseCase = (charId: string, nftID: string) => Promise<Character>;

export type UserType = {
    publicKey: string
}

export type specialAbilityDataWithNFTObject = {
    warrior: specialAbilityDataWithNFT [];
    mage: specialAbilityDataWithNFT [];
    healer: specialAbilityDataWithNFT [];
}

export type specialAbilityDataWithNFT = specialAbilityData & {nftId: string}
