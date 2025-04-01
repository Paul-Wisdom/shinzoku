import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"
import { UserRepo } from "../../utils/types"

const userRepo = AppDataSource.getRepository(User)
export const userRepository: UserRepo = {
    findUserByPublicKey: async (key: string) => {
        return userRepo.findOne({where: {publicKey: key}})
    }
}