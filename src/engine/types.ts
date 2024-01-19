export type Command = (args: string[]) => Promise<string>

export enum CommandType {
  Start = '/inizia',
  Create = '/crea',
  Equip = '/metti',
  Unequip = '/togli',
  Replace = '/cambia',
  Help = '/guida',
  List = '/lista',
  Attack = '/attacca'
}

export enum AttackType {
  Physical = 'fisico',
  Magical = 'magico',
}

export enum AttributeType {
  Physic = 'fisico',
  Mind = 'mente',
  Life = 'vita'
}

export type AttributeMap = Record<AttributeType, number>

export enum WeaponType {
  None = 'none',
  Bow = 'arco',
  Fist = 'pugno',
  Globe = 'globo',
  Staff = 'bastone',
  Sword = 'spada',
}

export enum ArmorType {
  None = 'none',
  Shield = 'scudo',
  Light = 'leggera',
  Medium = 'media',
  Heavy = 'pesante',
}

export type ItemType = WeaponType | ArmorType
