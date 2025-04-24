import { ReferralRepository } from "../../../types/types"

export const updateReferralUseCase = (referralRepo: ReferralRepository) => {
    return async (referralCode: string) => {
        const referral = await referralRepo.incrementReferrals(referralCode);
        return referral
    }
}