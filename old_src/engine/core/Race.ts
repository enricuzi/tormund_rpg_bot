import { AbilityName } from './Ability'
import { Printable } from './types'

export enum RaceName {
  Human = 'Umano',
  Elf_High = 'Elfo Alto',
  Elf_Wood = 'Elfo dei Boschi',
  Elf_Half = 'Mezzelfo',
  Drow = 'Elfo Scuro',
  Dwarf_Hill = 'Nano delle Colline',
  Dwarf_Mountain = 'Nano delle Montagne',
  Orc_Half = 'Mezzorco',
  Halfling_Stout = 'Halfling Paffuto',
  Halfling_Lightfoot = 'Halfling Fortunato',
  Dragonide = 'Dragonide',
  Gnome_Rock = 'Gnomo delle Rocce',
  Gnome_Forest = 'Gnomo delle Foreste',
  Tiefling = 'Tiefling',
}

type RaceBonus = {
  attributes: Array<{ name: AbilityName, bonus: number }>
}

const MapRaceBonus: Record<RaceName, RaceBonus> = {
  [RaceName.Human]: {
    attributes: [
      { name: AbilityName.Strength, bonus: 1 },
      { name: AbilityName.Dexterity, bonus: 1 },
      { name: AbilityName.Constitution, bonus: 1 },
      { name: AbilityName.Intelligence, bonus: 1 },
      { name: AbilityName.Wisdom, bonus: 1 },
      { name: AbilityName.Charisma, bonus: 1 }
    ]
  },
  [RaceName.Elf_High]: {
    attributes: [
      { name: AbilityName.Intelligence, bonus: 1 }
    ]
  },
  [RaceName.Elf_Wood]: {
    attributes: [
      { name: AbilityName.Wisdom, bonus: 1 }
    ]
  },
  [RaceName.Drow]: {
    attributes: [
      { name: AbilityName.Charisma, bonus: 1 }
    ]
  },
  [RaceName.Dwarf_Mountain]: {
    attributes: [
      { name: AbilityName.Strength, bonus: 2 }
    ]
  },
  [RaceName.Dwarf_Hill]: {
    attributes: [
      { name: AbilityName.Wisdom, bonus: 1 }
    ]
  },
  [RaceName.Halfling_Lightfoot]: {
    attributes: [
      { name: AbilityName.Charisma, bonus: 1 }
    ]
  },
  [RaceName.Halfling_Stout]: {
    attributes: [
      { name: AbilityName.Constitution, bonus: 1 }
    ]
  },
  [RaceName.Gnome_Forest]: {
    attributes: [
      { name: AbilityName.Dexterity, bonus: 1 }
    ]
  },
  [RaceName.Gnome_Rock]: {
    attributes: [
      { name: AbilityName.Constitution, bonus: 1 }
    ]
  },
  [RaceName.Elf_Half]: {
    attributes: [
      { name: AbilityName.Charisma, bonus: 2 }
      // TODO: Add free choice on 2 Abilities by 1
    ]
  },
  [RaceName.Orc_Half]: {
    attributes: [
      { name: AbilityName.Constitution, bonus: 1 },
      { name: AbilityName.Strength, bonus: 2 }
    ]
  },
  [RaceName.Tiefling]: {
    attributes: [
      { name: AbilityName.Intelligence, bonus: 1 },
      { name: AbilityName.Charisma, bonus: 2 }
    ]
  },
  [RaceName.Dragonide]: {
    attributes: [
      { name: AbilityName.Strength, bonus: 2 },
      { name: AbilityName.Charisma, bonus: 1 }
    ]
  }
}

export class Race implements Printable {
  constructor (public readonly name: RaceName) {
  }

  get print (): string {
    return `${this.name}`
  }

  public get attributes () {
    return MapRaceBonus[this.name].attributes
  }
}
