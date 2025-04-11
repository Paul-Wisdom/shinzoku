import { AppDataSource } from "../../data-source";
import { Character } from "../../entity/character.entity";
import { User } from "../../entity/user.entity";
import { CharacterRepository, specialAbilityDataWithNFT } from "../../types/types";

const charRepo = AppDataSource.getRepository(Character);
const MIN = 500;
const MAX = 1000;

const rand = (min = MIN, max = MAX) => Math.floor(Math.random() * (max - min + 1)) + min;

const calculateMpCost = (mp: number) => {
    const minCost = Math.floor(mp * 0.10);
    const maxCost = Math.ceil(mp * 0.15);
    return rand(minCost, maxCost);
};


export const characterRepository = {
    getCharacterById: async (id: string) => {
        return charRepo.findOneBy({ id });
    },
    getAllCharacters: async () => {
        return charRepo.find({});
    },
    getCharacterByNftId: async (nftID: string) => {
        return charRepo.findOneBy({ nftID });
    },
    generateRandomWarrior: async (name: string, user: User, ability: specialAbilityDataWithNFT) => {
        const char = new Character();
        char.name = name;
        char.class = "warrior";
        char.specialAbilities = [ability];
        
        const attributes = {
            hp: rand(),
            mp: rand(),
            armor: rand(),
            dmg: rand(),
            speed: rand(),
            range: rand(3, 5),
            stamina: rand(),

        };
        const mp = attributes.mp
        char.attributes = attributes;
        
        
        char.user = user;
        return charRepo.save(char);

    },
    generateRandomMage: async (name: string, user: User, ability: specialAbilityDataWithNFT) => {
        const char = new Character();
        char.name = name;
        char.class = "mage";
        char.user = user;
        char.specialAbilities = [ability];

        const attributes = {
            hp: rand(),
            mp: rand(),
            armor: rand(),
            dmg: rand(),
            speed: rand(),
            range: rand(5, 10),
            stamina: rand(),

        };
        const mp = attributes.mp
        char.attributes = attributes;

        return charRepo.save(char);

    },
    generateRandomHealer: async (name: string, user: User, ability: specialAbilityDataWithNFT) => {
        const char = new Character();
        char.name = name;
        char.class = "healer";
        char.user = user;
        char.specialAbilities = [ability];
        
        const attributes = {
            hp: rand(),
            mp: rand(),
            armor: rand(),
            dmg: rand(),
            speed: rand(),
            range: rand(1, 5),
            stamina: rand(),

        };
        const mp = attributes.mp
        char.attributes = attributes;

        return charRepo.save(char);

    },

    updateCharacterNftId: async (charId: string, nftID: string) => {
        const char = await charRepo.findOneBy({ id: charId });
        if (!char) {
            throw new Error("Character not found");
        }
        char.nftID = nftID;
        return await charRepo.save(char);
    },

    getRandomWarriorSpecialAbility: () => {
        const abilities = [
            {
                name: "critical strike",
                value: rand(),
                mpCost: rand(10, 20),
                abilityName: "Rage",
            },
            {
                name: "evasion",
                value: rand(),
                mpCost: rand(10, 20),
                abilityName: "Dodge",
            }
        ]

        const randomIndex  = rand(0, abilities.length - 1);
        return abilities[randomIndex];
    },

    getRandomMageSpecialAbility: () => {
        const abilities = [
            {
                name: "poison",
                value: rand(),
                mpCost: rand(10, 20),
                abilityName: "poison cloud",
            },
            {
                name: "stun",
                value: rand(),
                mpCost: rand(10, 20),
                abilityName: "Ice Spike",
            }
        ]

        const randomIndex  = rand(0, abilities.length - 1);
        return abilities[randomIndex];
    },

    getRandomHealerSpecialAbility: () => {
        const abilities = [
            {
                name: "heal",
                value: rand(),
                mpCost: rand(10, 20),
                abilityName: "Healing Light",
            },
            {
                name: "buff",
                value: rand(),
                mpCost: rand(10, 20),
                abilityName: "Buff",
            }
        ]

        const randomIndex  = rand(0, abilities.length - 1);
        return abilities[randomIndex];
    },
};