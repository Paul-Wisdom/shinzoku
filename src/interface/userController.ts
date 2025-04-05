import { NextFunction, Request, Response } from "express";
import { CheckIfUsernameIsUnique, CreateNewUser } from "../types/types";

export const UserController = ({checkIfUsernameIsUniqueUseCase, createNewUserUseCase}: {checkIfUsernameIsUniqueUseCase: CheckIfUsernameIsUnique, createNewUserUseCase: CreateNewUser}) => {
    return {
        postCompleteUserRegistration: async (req: Request, res: Response, next: NextFunction) => {
            const {username} = req.body;
            const publicKey = req.user?.publicKey;

            if (!publicKey) {
                res.status(400).json({error: "No public key provided"});
                return;
            }
            if (!username) {
                res.status(400).json({error: "No username provided"});
                return;
            }

            const isUnique = await checkIfUsernameIsUniqueUseCase(username);
            if (!isUnique) {
                res.status(400).json({error: "Username already taken"});
                return;
            }

            const user = await createNewUserUseCase(username, publicKey);
            if (!user) {
                res.status(500).json({error: "Error creating user"});
                return;
            }

            res.json({message: "User created successfully", user});
        }
    }
}