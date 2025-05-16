import { AutoBattleField } from "./classes/autoBattlefield";
import { GameCharacter, Attribute, SpecialAbility } from "./classes/characters";
import { Team } from "./classes/teams";
import { Character } from "../../entity/character.entity";
import { GameService } from "../../types/types";


export const gameEngine: GameService = {
    getPlayerDataFromCharacter: (character: Character) => {
        const armor = new Attribute('armor', character.attributes.armor);
        const dmg = new Attribute('dmg', character.attributes.dmg);
        const hp = new Attribute('hp', character.attributes.hp);
        const mp = new Attribute('mp', character.attributes.mp);
        const range = new Attribute('range', character.attributes.range);
        const speed = new Attribute('speed', character.attributes.speed);
        const stamina = new Attribute('stamina', character.attributes.stamina);

        const attributes = [armor, dmg, hp, mp, range, speed, stamina];
        const specialAbilities = character.specialAbilities.map(ability => {
            return new SpecialAbility(ability.name, ability.value, ability.mpCost, ability.abilityName);
        })

        return new GameCharacter(character.name, character.class, attributes, specialAbilities)
    },

    simulateBattle: (team1name: string, team1: GameCharacter[], team2name: string, team2: GameCharacter[]) => {
        const firstTeam = new Team(team1name, team1);
        const secondTeam = new Team(team2name, team2);

        const battleield = new AutoBattleField(firstTeam, secondTeam);
        return battleield.runBattle()

    },
} 
