import { PublicKey } from "@solana/web3.js"
import { User } from "../entity/user.entity"

export type UserRepo = {
    findUserByPublicKey: (key: string) => Promise<User | null>,
    findUserByUsername: (username: string) => Promise<User | null>,
    createNewUserAndAccount: (username: string, publicKey: string) => Promise<User>
}
export type SolanaService = {
    verifySignature: (pubKey: string, signature: string, message: string) => boolean,
    convertStringToPublicKey: (key: string) => PublicKey
}

export type CryptoEncryptionService = {
   generateNounce: () => string
}

export type UserType = {
    publicKey: string
}

export type CheckIfUserIsNew = (key: string) => Promise<boolean>
export type GenerateNounceUseCase = () => string
export type VerifySignatureUseCase = (pubKey: string, signature: string, message: string) => boolean
export type CheckIfUsernameIsUnique = (username: string) => Promise<boolean>
export type CreateNewUser = (username: string, publicKey: string) => Promise<User>