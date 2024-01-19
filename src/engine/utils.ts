import { Context, context } from './Context'
import fs from 'fs'
import { Armor, Character, Weapon } from './components'
import { ArmorType, ItemType, WeaponType } from '../types'

export const random = (max = 20) => Math.floor(Math.random() * max) + 1

export const throwError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error'
}

export const isWeaponType = (item: ItemType) => Object.values(WeaponType).includes(item as WeaponType)
export const isArmorType = (item: ItemType) => Object.values(ArmorType).includes(item as ArmorType)

export const storeContext = () => {
  const data = JSON.stringify(context)

  try {
    fs.writeFileSync('context.txt', data, 'utf8')
    console.log('Context stored')
  } catch (error) {
    console.error(error)
  }
}

export const readContext = () => {
  try {
    const data: Context = JSON.parse(fs.readFileSync('context.txt', 'utf8'))

    data.characters.forEach(rawCharacter => {
      const character = Object.assign(new Character(rawCharacter.name, rawCharacter.attributes), rawCharacter)
      if (character.weapon1.itemType !== WeaponType.None) {
        character.weapon1 = new Weapon(character.weapon1.itemType)
      }
      if (character.weapon2.itemType !== WeaponType.None) {
        if (character.weapon2.itemType === ArmorType.Shield) {
          character.weapon2 = new Armor(ArmorType.Shield)
        } else {
          character.weapon1 = new Weapon(character.weapon2.itemType)
        }
      }
      if (character.armor.itemType !== ArmorType.None) {
        character.armor = new Armor(character.armor.itemType)
      }
      context.addCharacter(character)
    })

    console.log('Reading context from storage', context)
  } catch (err) {
    console.error(err)
  }
}
