import { Router } from "express";
import { simulateBattleUseCase } from "../application/use-cases/game-engine";
import { gameEngine } from "../infrastructures/game-engine";
import { getCharacterByIdUseCase, getUserCharactersUseCase } from "../application/use-cases/database/character";
import { characterRepository } from "../infrastructures/databases/characterRepository";
import { userRepository } from "../infrastructures/databases/userRepository";
import { findUserByPublicKeyUseCase } from "../application/use-cases/database/user";
import { GameController } from "../interface/gameController";
import { authController } from "./authRoutes";

const GameRouter = Router()

const controller = GameController({simulateBattle: simulateBattleUseCase(gameEngine), getCharacterById: getCharacterByIdUseCase(characterRepository), findUserByPublicKey: findUserByPublicKeyUseCase(userRepository), getUserCharacters: getUserCharactersUseCase(characterRepository)})
GameRouter.post("/pve-battle-simulation", authController.verifyJWT, controller.PVEBattleSimulationController);

export {GameRouter}