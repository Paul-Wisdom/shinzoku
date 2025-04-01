import { PublicKey } from "@solana/web3.js"
import { User } from "../entity/User"

export type UserRepo = {
    findUserByPublicKey: (key: string) => Promise<User | null>
}
export type SolanaService = {
    verifySignature: (pubKey: string, signature: string, message: string) => boolean,
    convertStringToPublicKey: (key: string) => PublicKey
}

export type CryptoEncryptionService = {
   generateNounce: () => string
}

export type CheckIfUserIsNew = (key: string) => Promise<boolean>
export type GenerateNounceUseCase = () => string
export type VerifySignatureUseCase = (pubKey: string, signature: string, message: string) => boolean