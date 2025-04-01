import { UserRepo } from "../../utils/types"

export const checkIfUserIsNewUseCase = (userRepository: UserRepo) => {
    return async (key: string) => {
        const user = await userRepository.findUserByPublicKey(key)
        return user ? false : true
    }
    
}    
