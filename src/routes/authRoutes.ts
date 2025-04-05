import {Router} from 'express'
import { AuthController } from '../interface/authController'
import { verifySignatureUseCase } from '../application/use-cases/blockchain'
import { generateNounceUseCase } from '../application/use-cases/encryption'
import { checkIfUserIsNewUseCase } from '../application/use-cases/database'
import { userRepository } from '../infrastructures/databases/userRepository'
import { solanaService } from '../infrastructures/blockchain/solanaService'
import { cryptoEncryptionService } from '../infrastructures/encryption/cryptoEncryptionService'

const AuthRouter = Router()

const controller = AuthController({verifySignature: verifySignatureUseCase(solanaService), generateNounce: generateNounceUseCase(cryptoEncryptionService), checkIfUserIsNew: checkIfUserIsNewUseCase(userRepository)})
AuthRouter.post('/request-nonce', controller.getNonceController)
AuthRouter.post('/verify-signature', controller.postVerifySignatureController)
// AuthRouter.post('/verify-jwt', controller.verifyJWT)

export {AuthRouter, controller as authController}