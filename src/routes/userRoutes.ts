import { Router } from "express";
import { UserController } from "../interface/userController";
import { checkIfUsernameIsUniqueUseCase, createNewUserUseCase } from "../application/use-cases/database";
import { userRepository } from "../infrastructures/databases/userRepository";

import { authController } from "./authRoutes";

const UserRouter = Router();
const controller = UserController({checkIfUsernameIsUniqueUseCase: checkIfUsernameIsUniqueUseCase(userRepository), createNewUserUseCase: createNewUserUseCase(userRepository)});

UserRouter.post("/complete-user-registration", authController.verifyJWT, controller.postCompleteUserRegistration);

export {UserRouter}