import { AppDataSource } from "../../data-source"
import { User } from "../../entity/user.entity"
import { UserRepo } from "../../types/types"
import { accountRepository } from "./accountRepository"
import { referralRepository } from "./referralRepository"

const userRepo = AppDataSource.getRepository(User)
export const userRepository: UserRepo = {
    findUserByPublicKey: async (key: string) => {
        return userRepo.findOne({where: {publicKey: key}, relations: ['account', 'referral', 'characters']})
    },
    findUserByUsername: async (username: string) => {
        return userRepo.findOne({where: {userName: username}})
    },
    createNewUserAndAccount: async (username: string, publicKey: string) => {
        const user = new User()
        user.userName = username
        user.publicKey = publicKey

        const userAccount = await accountRepository.createAccount(user)
        const userReferral = await referralRepository.create(user);

        user.account = userAccount
        user.referral = userReferral
        return userRepo.save(user)
    },
    saveUser: async (user: User) => {
        return userRepo.save(user)
    }
}