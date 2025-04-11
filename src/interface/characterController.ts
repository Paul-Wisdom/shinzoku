import { Request, Response } from "express"
import { GenerateStarterCharactersUseCase, AddCharactersToUserUseCase, FindUserByPublicKeyUseCase, GenerateSpecialAbilitiesUseCase, MintSpecialAbilityUseCase, specialAbilityDataWithNFTObject, MintCharacterUseCase, UpdateCharacterNftIdUseCase } from "../types/types"
import { instanceToPlain } from "class-transformer"

export const CharacterController = ({ generateStarterCharacters, addCharactersToUser, findUserByPublicKey, generateSpecialAbilities, mintSpecialAbility, mintCharacter, updateCharacterNftId }
    : {
        generateStarterCharacters: GenerateStarterCharactersUseCase,
        addCharactersToUser: AddCharactersToUserUseCase,
        findUserByPublicKey: FindUserByPublicKeyUseCase,
        generateSpecialAbilities: GenerateSpecialAbilitiesUseCase,
        mintSpecialAbility: MintSpecialAbilityUseCase,
        mintCharacter: MintCharacterUseCase,
        updateCharacterNftId: UpdateCharacterNftIdUseCase
    }) => {
    return {
        generateStarterCharacters: async (req: Request, res: Response) => {
            const publicKey = req.user?.publicKey;
            const specialAbilityDataWithNFTObject: specialAbilityDataWithNFTObject = {
                warrior: [],
                mage: [],
                healer: []
            };

            if (!publicKey) {
                res.status(400).json({ error: "No PublicKey provided" });
                return
            }

            const user = await findUserByPublicKey(publicKey);
            if (!user) {
                res.status(400).json({ error: "No user found" });
                return
            }
            const abilities = generateSpecialAbilities();
            //mint abilities nft
            specialAbilityDataWithNFTObject.warrior = await mintSpecialAbility(abilities.warrior, user.publicKey)
            specialAbilityDataWithNFTObject.mage = await mintSpecialAbility(abilities.mage, user.publicKey)
            specialAbilityDataWithNFTObject.healer = await mintSpecialAbility(abilities.healer, user.publicKey)

            const characters = await generateStarterCharacters(user, specialAbilityDataWithNFTObject);

            const updatedCharacters = await Promise.all(
                characters.map(async (character) => {
                    const nftID = await mintCharacter(character, user.publicKey);
                    return await updateCharacterNftId(character.id, nftID);
                }
            ))

            const returnedUser = instanceToPlain(await addCharactersToUser(user, updatedCharacters));

            res.status(200).json({ message: "Starter characters generated successfully", user: returnedUser });
        }
    }
}