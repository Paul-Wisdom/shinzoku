import { Router } from "express";
import { UserController } from "../interface/userController";
import { checkIfUserIsNewUseCase, checkIfUsernameIsUniqueUseCase, createNewUserUseCase } from "../application/use-cases/database/user";
import { userRepository } from "../infrastructures/databases/userRepository";

import { authController } from "./authRoutes";

const UserRouter = Router();
const controller = UserController({checkIfUsernameIsUnique: checkIfUsernameIsUniqueUseCase(userRepository), createNewUser: createNewUserUseCase(userRepository), checkIfUserIsNew: checkIfUserIsNewUseCase(userRepository)});

UserRouter.post("/complete-user-registration", authController.verifyJWT, controller.postCompleteUserRegistration);

export {UserRouter}