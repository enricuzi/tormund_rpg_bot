export enum AttackType {
  Physical = 'fisico',
  Magical = 'magico',
}

export enum AttributeType {
  Physic = 'fisico',
  Mind = 'mente',
  Life = 'vita'
}

export type AttributeMap = Map<AttributeType, number>

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
