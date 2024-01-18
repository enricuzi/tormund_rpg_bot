import { Command } from '../types'
import { context } from '../../engine/Context'
import { throwError } from '../utils'
import { ItemType } from '../../engine/types'

export const attack: Command = async (args) => {
  const [characterName, itemType] = args

  try {
    const character = context.getCharacter(characterName)
    const value = character.attack(itemType as ItemType)

    return `${characterName} attacco e' ${value}`
  } catch (error) {
    return throwError(error)
  }
}
