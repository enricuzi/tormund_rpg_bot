import { Context, context } from './Context'
import fs from 'fs'
import { Character } from './components'
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
      const character = new Character(rawCharacter.name, rawCharacter.attributes, {
        hand1: rawCharacter.hand1.itemType,
        hand2: rawCharacter.hand2.itemType,
        armor: rawCharacter.armor.itemType
      })
      context.addCharacter(character)
    })

    console.log('Reading context from storage', context)
  } catch (err) {
    console.error(err)
  }
}
