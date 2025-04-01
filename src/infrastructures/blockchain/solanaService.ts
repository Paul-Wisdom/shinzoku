import { PublicKey } from '@solana/web3.js'
import { Signature, verifySignature } from '@solana/kit'
import nacl from 'tweetnacl'
import bs58 from 'bs58'

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
    }
}