import { Router } from "express";
import { CharacterController } from "../interface/characterController";
import { characterRepository } from "../infrastructures/databases/characterRepository";
import { authController } from "./authRoutes";
import { generateSpecialAbilitiesUseCase, generateStarterCharacterUseCase, updateCharacterNftIdUseCase } from "../application/use-cases/database/character";
import { addCharactersToUserUseCase, findUserByPublicKeyUseCase } from "../application/use-cases/database/user";
import { userRepository } from "../infrastructures/databases/userRepository";
import { mintCharacterUseCase, mintSpecialAbilityUseCase } from "../application/use-cases/blockchain";
import { solanaService } from "../infrastructures/blockchain/solanaService";

const CharacterRouter = Router();

const controller = CharacterController({generateStarterCharacters: generateStarterCharacterUseCase(characterRepository), addCharactersToUser: addCharactersToUserUseCase(userRepository), findUserByPublicKey: findUserByPublicKeyUseCase(userRepository), generateSpecialAbilities: generateSpecialAbilitiesUseCase(characterRepository), mintSpecialAbility: mintSpecialAbilityUseCase(solanaService), mintCharacter: mintCharacterUseCase(solanaService), updateCharacterNftId: updateCharacterNftIdUseCase(characterRepository)})
CharacterRouter.post("/generate-starter-characters", authController.verifyJWT, controller.generateStarterCharacters);
export {CharacterRouter}