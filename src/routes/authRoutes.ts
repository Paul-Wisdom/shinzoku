import {Router} from 'express'
import { authController } from '../interface/authController'
import { verifySignatureUseCase } from '../application/use-cases/verifySignature'
import { generateNounceUseCase } from '../application/use-cases/generateNounce'
import { checkIfUserIsNewUseCase } from '../application/use-cases/checkForNewUser'
import { userRepository } from '../infrastructures/databases/userRepository'
import { solanaService } from '../infrastructures/blockchain/solanaService'
import { cryptoEncryptionService } from '../infrastructures/encryption/cryptoEncryptionService'

const AuthRouter = Router()

const controller = authController({verifySignature: verifySignatureUseCase(solanaService), generateNounce: generateNounceUseCase(cryptoEncryptionService), checkIfUserIsNew: checkIfUserIsNewUseCase(userRepository)})
AuthRouter.post('/request-nonce', controller.getNonceController)
AuthRouter.post('/verify-signature', controller.postVerifySignatureController)

export {AuthRouter}