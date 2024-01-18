import { Command } from '../types'
import { throwError } from '../utils'
import { context } from '../../engine/Context'
import { ItemType } from '../../engine/types'

export const replace: Command = async (args) => {
  const [characterName, item, newItem] = args

  try {
    const character = context.getCharacter(characterName)

    if (!item) {
      throw new Error('Il tipo di oggetto da togliere e\' obbligatorio')
    }
    if (!newItem) {
      throw new Error('Il tipo di oggetto da mettere e\' obbligatorio')
    }

    character.unequip(item as ItemType)
    character.equip(newItem as ItemType)

    return character.print()
  } catch (error) {
    return throwError(error)
  }
}
