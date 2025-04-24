import { Router } from "express";
import { UserController } from "../interface/userController";
import { checkIfUserIsNewUseCase, checkIfUsernameIsUniqueUseCase, createNewUserUseCase, findUserByPublicKeyUseCase } from "../application/use-cases/database/user";
import { userRepository } from "../infrastructures/databases/userRepository";

import { authController } from "./authRoutes";
import { updateReferralUseCase } from "../application/use-cases/database/referral";
import { referralRepository } from "../infrastructures/databases/referralRepository";

const UserRouter = Router();
const controller = UserController({checkIfUsernameIsUnique: checkIfUsernameIsUniqueUseCase(userRepository), createNewUser: createNewUserUseCase(userRepository), checkIfUserIsNew: checkIfUserIsNewUseCase(userRepository), updateReferral: updateReferralUseCase(referralRepository), findUserByPublicKey: findUserByPublicKeyUseCase(userRepository)});

UserRouter.post("/complete-user-registration", authController.verifyJWT, controller.postCompleteUserRegistration);
UserRouter.get('/:publicKey', authController.verifyJWT, controller.getUserByPublicKey)

export {UserRouter}