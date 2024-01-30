import { Dice, DiceProperties } from './Dice'
import { Printable } from './types'

export enum WeaponName {
  Handaxe = 'Ascia',
  Quarterstaff = 'Bastone Ferrato',
  Sickle = 'Falcetto',
  Javelin = 'Giavellotto',
  Spear = 'Lancia',
  Light_Hammer = 'Martello Leggero',
  Mace = 'Mazza',
  Dagger = 'Pugnale',
  Club = 'Randello',
  Greatclub = 'Randello Pesante',
  Shortbow = 'Arco Corto',
  Crossbow_Light = 'Balestra Leggera',
  Dart = 'Dardo',
  Sling = 'Fionda',
  Halberd = 'Alabarda',
  Greataxe = 'Ascia Bipenne',
  Battleaxe = 'Ascia da Battaglia',
  Glaive = 'Falcione',
  Whip = 'Frusta',
  Lance = 'Lancia da Cavaliere',
  Maul = 'Maglio',
  Warhammer = 'Martello da Guerra',
  Flail = 'Mazzafrusto',
  Morningstar = 'Morningstar',
  Pike = 'Picca',
  War_Pick = 'Piccone da Guerra',
  Scimitar = 'Scimitarra',
  Shortsword = 'Spada Corta',
  Longsword = 'Spada Lunga',
  Greatsword = 'Spadone',
  Rapier = 'Stocco',
  Trident = 'Tridente',
  Longbow = 'Arco Lungo',
  Crossbow_Hand = 'Balestra a Mano',
  Crossbow_Heavy = 'Balestra Pesante',
  Blowgun = 'Cerbottana',
  Net = 'Rete'
}

type WeaponDamage = DiceProperties

enum WeaponType { Simple = 'Semplice', War = 'Guerra' }

enum WeaponPropertyName {
  Light = 'Leggero',
  Two_Hands = '2 Mani',
  Finesse = 'Finezza',
  Thrown = 'Lancio',
  Versatile = 'Versatile',
  Loading = 'Carica',
  Heavy = 'Pesante',
  Reach = 'Raggio'
}

type WeaponProperties = {
  [WeaponPropertyName.Light]?: boolean
  [WeaponPropertyName.Two_Hands]?: boolean
  [WeaponPropertyName.Finesse]?: boolean
  [WeaponPropertyName.Thrown]?: boolean
  [WeaponPropertyName.Versatile]?: DiceProperties
  [WeaponPropertyName.Loading]?: boolean
  [WeaponPropertyName.Heavy]?: boolean
  [WeaponPropertyName.Reach]?: boolean
}

const MapWeapons: Record<WeaponName, {
  type: WeaponType
  damage: WeaponDamage
  properties: WeaponProperties
}> = {
  [WeaponName.Handaxe]: {
    properties: {
      [WeaponPropertyName.Light]: true,
      [WeaponPropertyName.Finesse]: true,
      [WeaponPropertyName.Thrown]: true
    },
    type: WeaponType.Simple,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Quarterstaff]: {
    properties: {
      [WeaponPropertyName.Versatile]: {
        diceSize: 8,
        diceNumber: 1
      }
    },
    type: WeaponType.Simple,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Sickle]: {
    properties: { [WeaponPropertyName.Light]: true },
    type: WeaponType.Simple,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Javelin]: {
    properties: { [WeaponPropertyName.Thrown]: true },
    type: WeaponType.Simple,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Spear]: {
    properties: {
      [WeaponPropertyName.Thrown]: true,
      [WeaponPropertyName.Versatile]: { diceSize: 8, diceNumber: 1 }
    },
    type: WeaponType.Simple,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Light_Hammer]: {
    properties: {
      [WeaponPropertyName.Light]: true,
      [WeaponPropertyName.Thrown]: true
    },
    type: WeaponType.Simple,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Mace]: {
    properties: {},
    type: WeaponType.Simple,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Dagger]: {
    properties: {
      [WeaponPropertyName.Finesse]: true,
      [WeaponPropertyName.Light]: true,
      [WeaponPropertyName.Thrown]: true
    },
    type: WeaponType.Simple,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Club]: {
    properties: { [WeaponPropertyName.Light]: true },
    type: WeaponType.Simple,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Greatclub]: {
    properties: { [WeaponPropertyName.Two_Hands]: true },
    type: WeaponType.Simple,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Shortbow]: {
    properties: { [WeaponPropertyName.Two_Hands]: true },
    type: WeaponType.Simple,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Crossbow_Light]: {
    properties: {
      [WeaponPropertyName.Loading]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.Simple,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Dart]: {
    properties: {
      [WeaponPropertyName.Finesse]: true,
      [WeaponPropertyName.Thrown]: true
    },
    type: WeaponType.Simple,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Sling]: {
    properties: {},
    type: WeaponType.Simple,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Halberd]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Reach]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 10, diceNumber: 1 }
  },
  [WeaponName.Greataxe]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 12, diceNumber: 1 }
  },
  [WeaponName.Battleaxe]: {
    properties: {
      [WeaponPropertyName.Versatile]: {
        diceSize: 10,
        diceNumber: 1
      }
    },
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Glaive]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Reach]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 10, diceNumber: 1 }
  },
  [WeaponName.Whip]: {
    properties: {
      [WeaponPropertyName.Finesse]: true,
      [WeaponPropertyName.Reach]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 4, diceNumber: 1 }
  },
  [WeaponName.Lance]: {
    properties: { [WeaponPropertyName.Reach]: true },
    type: WeaponType.War,
    damage: { diceSize: 12, diceNumber: 1 }
  },
  [WeaponName.Maul]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 6, diceNumber: 2 }
  },
  [WeaponName.Warhammer]: {
    properties: {
      [WeaponPropertyName.Versatile]: {
        diceSize: 10,
        diceNumber: 1
      }
    },
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Flail]: {
    properties: {},
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Morningstar]: {
    properties: {},
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Pike]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Reach]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 10, diceNumber: 1 }
  },
  [WeaponName.War_Pick]: {
    properties: {},
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Scimitar]: {
    properties: {
      [WeaponPropertyName.Finesse]: true,
      [WeaponPropertyName.Light]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Shortsword]: {
    properties: {
      [WeaponPropertyName.Finesse]: true,
      [WeaponPropertyName.Light]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Longsword]: {
    properties: {
      [WeaponPropertyName.Versatile]: {
        diceSize: 10,
        diceNumber: 1
      }
    },
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Greatsword]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 6, diceNumber: 2 }
  },
  [WeaponName.Rapier]: {
    properties: { [WeaponPropertyName.Finesse]: true },
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Trident]: {
    properties: {
      [WeaponPropertyName.Thrown]: true,
      [WeaponPropertyName.Versatile]: { diceSize: 8, diceNumber: 1 }
    },
    type: WeaponType.War,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Longbow]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 8, diceNumber: 1 }
  },
  [WeaponName.Crossbow_Hand]: {
    properties: {
      [WeaponPropertyName.Light]: true,
      [WeaponPropertyName.Loading]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 6, diceNumber: 1 }
  },
  [WeaponName.Crossbow_Heavy]: {
    properties: {
      [WeaponPropertyName.Heavy]: true,
      [WeaponPropertyName.Loading]: true,
      [WeaponPropertyName.Two_Hands]: true
    },
    type: WeaponType.War,
    damage: { diceSize: 10, diceNumber: 1 }
  },
  [WeaponName.Blowgun]: {
    properties: { [WeaponPropertyName.Loading]: true },
    type: WeaponType.War,
    damage: { diceSize: 1, diceNumber: 1 }
  },
  [WeaponName.Net]: {
    properties: { [WeaponPropertyName.Thrown]: true },
    type: WeaponType.War,
    damage: { diceSize: 1, diceNumber: 1 }
  }
}

export class Weapon implements Printable {
  constructor (public readonly name: WeaponName) {
  }

  get print (): string {
    const { diceSize, diceNumber } = MapWeapons[this.name].damage
    return `${this.name}: ${diceNumber}d${diceSize}`
  }

  public hit ({ bonusAttack = 0, bonusDamage = 0 }) {
    const value = new Dice(20).roll({ bonus: bonusAttack })

    const { diceSize, diceNumber } = MapWeapons[this.name].damage
    const damage = new Dice(diceSize).roll({
      number: diceNumber,
      bonus: bonusDamage
    })

    return { value, damage }
  }
}
