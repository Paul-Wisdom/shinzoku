import { UserRepo } from "../../types/types"

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

export const createNewUserUseCase = (userRepository: UserRepo) => {
    return async (username: string, publicKey: string) => {
        const user = await userRepository.createNewUserAndAccount(username, publicKey)
        return user
    }
}