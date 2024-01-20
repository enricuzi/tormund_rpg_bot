import { InlineKeyboardButton } from 'node-telegram-bot-api'

export type Command = (chatId: number, args: string[]) => Promise<[string, InlineKeyboardButton[]]>

export enum CommandType {
  Start = '/inizia',
  Create = '/crea',
  Equip = '/metti',
  Unequip = '/togli',
  Replace = '/cambia',
  Help = '/guida',
  List = '/mostra',
  Level = '/livello',
  Attack = '/attacca',
  Rules = '/regole',
  Swap = '/inverti',
  Defend = '/difendi',
  Describe = '/descrivi'
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

export type Equipment = {
  hand1: { type: WeaponType, bonus?: number }
  hand2: { type: WeaponType | ArmorType.Shield, bonus?: number }
  armor: { type: ArmorType, bonus?: number }
}

export type Item = {
  readonly itemType: ItemType
  readonly value: number
  readonly bonus: number
}
