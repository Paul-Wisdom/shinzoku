import { Request, Response } from "express"
import {sign} from 'jsonwebtoken'

import { nonces } from "../app"
import { JWT_SECRET } from "../utils/config"
import { CheckIfUserIsNew, VerifySignatureUseCase, GenerateNounceUseCase } from "../utils/types"


const generalmessage = "This is a nonce to verify the signature. Its value is: "
export const authController = ({verifySignature, generateNounce, checkIfUserIsNew}:{verifySignature: VerifySignatureUseCase, generateNounce: GenerateNounceUseCase, checkIfUserIsNew: CheckIfUserIsNew}) => {
    return {
        postVerifySignatureController: async (req: Request, res: Response) => {
            const {publicKey, signature} = req.body //publicKey and signature encoded as base58 using bs58
            if(!publicKey || !signature){
                res.status(400).json({error: "No public key or signature provided"})
                return
            }
            console.log(nonces)
            const nounce = nonces.get(publicKey)
        
            if (!nounce) {
                res.status(400).json({error: "No associated nounce"})
                return
            }
        
            nonces.delete(publicKey)
            let message = generalmessage + nounce
            
            const validSignature = verifySignature(publicKey, signature, message)
        
            if (!validSignature) {
                res.status(401).json({error: "Invalid signature"})
                return
            }
            const token = sign({publicKey}, JWT_SECRET, {expiresIn: '1h'});
            
            //check if user is new
            const newUser = await checkIfUserIsNew(publicKey);
        
            res.json({message: "Signature verified successfully" , token: token, isNewUser: newUser})
        },

        getNonceController: (req: Request, res: Response) => {
            const publicKey = req.body.publicKey
            if (!publicKey){
                res.status(400).json({error: "No public key provided"})
                return
            }
            const generatedNounce = generateNounce()
            nonces.set(publicKey, generatedNounce)
        
            res.json({nonce: generatedNounce, message: generalmessage})
        }
    }
}


