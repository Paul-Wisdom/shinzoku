import { AppDataSource } from "../../data-source"
import { Account } from "../../entity/account.entity"
import { User } from "../../entity/user.entity"

const accountRepo = AppDataSource.getRepository(Account)
export const accountRepository = {

    createAccount: async (user: User) => {
        const account = new Account()
        account.user = user
        account.kino = 3000
        account.gems = 100
        return accountRepo.save(account)
    }

}