import { create } from "domain";
import { AppDataSource } from "../../data-source";
import { Referral } from "../../entity/referral.entity";
import { generateReferralCode } from "../../utils/referralCodeGenerator";
import { User } from "../../entity/user.entity";

const referralRepo = AppDataSource.getRepository(Referral)

export const referralRepository = {
    create: async (user: User) => {
        const referral = new Referral()
        let attempts = 0
        let maxAttempts = 5
        let referralCode;

        while (attempts < maxAttempts) {
            referralCode = generateReferralCode()

            const usedCode = await referralRepo.findOne({where: {referralCode: referralCode }});
            if (!usedCode) {
                referral.referralCode = referralCode;
                referral.user = user;
                return await referralRepo.save(referral)
            }
            attempts++;
            continue
        }

        throw new Error('Failed to generate code after multiple attempts')
    },

    incrementReferrals: async (referralCode: string) => {
        const referral = await referralRepo.findOne({where: {referralCode: referralCode}});

        if(!referral) return null;

        referral.numberOfReferrals = referral.numberOfReferrals + 1;
        return await referralRepo.save(referral)
    }
}