import { Printable } from './types'

export enum ClassName {
  Barbarian = 'Barbaro',
  Bard = 'Bardo',
  Cleric = 'Chierico',
  Druid = 'Druido',
  Warrior = 'Guerriero',
  Rogue = 'Ladro',
  Mage = 'Mago',
  Wizard = 'Stregone',
  Monk = 'Monaco',
  Paladin = 'Paladino',
  Ranger = 'Ranger',
  Warlock = 'Warlock'
}

type ClassBonus = {
  diceHP: number
}

const MapClassBonus: Record<ClassName, ClassBonus> = {
  [ClassName.Barbarian]: {
    diceHP: 12
  },
  [ClassName.Bard]: {
    diceHP: 8
  },
  [ClassName.Cleric]: {
    diceHP: 8
  },
  [ClassName.Druid]: {
    diceHP: 8
  },
  [ClassName.Warrior]: {
    diceHP: 10
  },
  [ClassName.Rogue]: {
    diceHP: 8
  },
  [ClassName.Mage]: {
    diceHP: 6
  },
  [ClassName.Wizard]: {
    diceHP: 6
  },
  [ClassName.Monk]: {
    diceHP: 8
  },
  [ClassName.Paladin]: {
    diceHP: 10
  },
  [ClassName.Ranger]: {
    diceHP: 10
  },
  [ClassName.Warlock]: {
    diceHP: 8
  }
}

export class Class implements Printable {
  constructor (public readonly name: ClassName) {
  }

  public get diceHP () {
    return MapClassBonus[this.name].diceHP
  }

  public get print () {
    return `${this.name}`
  }
}
