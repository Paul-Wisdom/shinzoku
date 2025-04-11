import { Character } from "../../../entity/character.entity"
import { User } from "../../../entity/user.entity"
import { UserRepo } from "../../../types/types"

export const checkIfUserIsNewUseCase = (userRepository: UserRepo) => {
    return async (key: string) => {
        const user = await userRepository.findUserByPublicKey(key)
        return user ? false : true
    }
    
}    

export const checkIfUsernameIsUniqueUseCase = (userRepository: UserRepo) => {
    return async (username: string) => {
        const user = await userRepository.findUserByUsername(username)
        return user ? false : true
    }
}

export const findUserByPublicKeyUseCase = (userRepository: UserRepo) => {
    return async (publicKey: string) => {
        const user = await userRepository.findUserByPublicKey(publicKey)
        return user
    }
}

export const createNewUserUseCase = (userRepository: UserRepo) => {
    return async (username: string, publicKey: string) => {
        const user = await userRepository.createNewUserAndAccount(username, publicKey)
        return user
    }
}

export const addCharactersToUserUseCase = (userRepository: UserRepo) => {
    return async (user: User, chars: Character[]) => {
        const userChars = user.characters;
        const charArray: Character[] = [];

        charArray.push(...chars);
        if (userChars) {
            charArray.push(...userChars);
        }
        user.characters = charArray;

        const returnedUser = await userRepository.saveUser(user);
        return returnedUser;
    }
}
