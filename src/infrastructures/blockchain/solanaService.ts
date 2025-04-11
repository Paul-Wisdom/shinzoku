import { PublicKey } from '@solana/web3.js'
import { signature, Signature, verifySignature } from '@solana/kit'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { randomBytes } from 'crypto'
import { Character } from '../../entity/character.entity'
import { specialAbilityData } from '../game-engine/types'

export const solanaService = {
    verifySignature: (pubKey: string, signature: string, message: string) => {
        const decodedSignature = bs58.decode(signature)
        const encodedMessage = new TextEncoder().encode(message)
        const decodedPublicKey = bs58.decode(pubKey)

        // const verified = verifySignature(pubKey, decodedSignature, messageBytes)
        const verified = nacl.sign.detached.verify(encodedMessage, decodedSignature, decodedPublicKey)
        return verified
    },
    convertStringToPublicKey: (publicKey: string): PublicKey => {
        return new PublicKey(publicKey)
    },

    mintCharacter: async (characters: Character, publicKey: string) => {
        // implement minting logic here

        return randomBytes(32).toString('hex');
    },

    mintSpecialAbility: async (ability: specialAbilityData, publicKey: string) => {
        // implement minting logic here

        return randomBytes(32).toString('hex');
    }
}