import { AppDataSource } from "../../data-source"
import { User } from "../../entity/user.entity"
import { UserRepo } from "../../types/types"
import { accountRepository } from "./accountRepository"

const userRepo = AppDataSource.getRepository(User)
export const userRepository: UserRepo = {
    findUserByPublicKey: async (key: string) => {
        return userRepo.findOne({where: {publicKey: key}})
    },
    findUserByUsername: async (username: string) => {
        return userRepo.findOne({where: {userName: username}})
    },
    createNewUserAndAccount: async (username: string, publicKey: string) => {
        const user = new User()
        user.userName = username
        user.publicKey = publicKey

        const userAccount = await accountRepository.createAccount(user)
        user.account = userAccount
        return userRepo.save(user)
    },
    saveUser: async (user: User) => {
        return userRepo.save(user)
    }
}