import { Character } from "../../../entity/character.entity";
import { User } from "../../../entity/user.entity";
import { specialAbilityData } from "../../../infrastructures/game-engine/types";
import { CharacterRepository, specialAbilityDataWithNFTObject } from "../../../types/types";



export const generateStarterCharacterUseCase = (charRepo: CharacterRepository) => {
    return async (user: User, abilities: specialAbilityDataWithNFTObject) => {
        const charArray: Character[] = [];

       const warriorPromises =  abilities.warrior.map(async (ability, index) => {
            const char = await charRepo.generateRandomWarrior(`warrior ${index + 1}`, user, ability);
            // char.specialAbilities.push(ability)
            charArray.push(char)

        })

        const magePromises = abilities.mage.map(async (ability, index) => {
            const char = await charRepo.generateRandomMage(`mage ${index + 1}`, user, ability);
            // char.specialAbilities.push(ability)
            charArray.push(char)

        })

        const healerPromies = abilities.healer.map(async (ability, index) => {
            const char = await charRepo.generateRandomHealer(`healer ${index + 1}`, user, ability);
            // char.specialAbilities.push(ability)
            charArray.push(char)

        })

        await Promise.all([
            ...warriorPromises,
            ...magePromises,
            ...healerPromies
        ])

        return charArray
    };

}

export const generateSpecialAbilitiesUseCase = (charRepo: CharacterRepository) => {
    return () => {
        let warriorSpecialAbilities: specialAbilityData[] = []
        let mageSpecialAbilities: specialAbilityData[] = []
        let healerSpecialAbilities: specialAbilityData[] = []

        for (let i = 0; i < 3; i++) {
            warriorSpecialAbilities.push(
                charRepo.getRandomWarriorSpecialAbility()
            )
        }

        for (let i = 0; i < 2; i++) {
            mageSpecialAbilities.push(
                charRepo.getRandomMageSpecialAbility()
            )
        }

        healerSpecialAbilities.push(
            charRepo.getRandomHealerSpecialAbility()
        )

        return { warrior: warriorSpecialAbilities, mage: mageSpecialAbilities, healer: healerSpecialAbilities }
    }
}

export const updateCharacterNftIdUseCase = (charRepo: CharacterRepository) => {
    return async (charId: string, nftID: string) => {
        return await charRepo.updateCharacterNftId(charId, nftID);
    }
}