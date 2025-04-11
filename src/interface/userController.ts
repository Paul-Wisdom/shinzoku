import { NextFunction, Request, Response } from "express";
import { CheckIfUserIsNewUseCase, CheckIfUsernameIsUniqueUseCase, CreateNewUserUseCase} from "../types/types";
import { instanceToPlain } from "class-transformer";

export const UserController = ({checkIfUsernameIsUnique, createNewUser, checkIfUserIsNew}: {checkIfUsernameIsUnique: CheckIfUsernameIsUniqueUseCase, createNewUser: CreateNewUserUseCase, checkIfUserIsNew: CheckIfUserIsNewUseCase}) => {
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

            const userExists = !await checkIfUserIsNew(publicKey);
            if(userExists){
                res.status(409).json({error: "User already exists"});
                return;
            }
            const isUnique = await checkIfUsernameIsUnique(username);
            if (!isUnique) {
                res.status(400).json({error: "Username already taken"});
                return;
            }

            const user = await createNewUser(username, publicKey);
            if (!user) {
                res.status(500).json({error: "Error creating user"});
                return;
            }

            res.json({message: "User created successfully", user: instanceToPlain(user)});
        }
    }
}