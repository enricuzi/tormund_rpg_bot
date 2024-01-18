import { Command } from '../types'
import { ItemType } from '../../engine/types'
import { context } from '../../engine/Context'
import { throwError } from '../utils'

export const unequip: Command = async (args) => {
  const [characterName, item1, item2, item3] = args

  try {
    const character = context.getCharacter(characterName)

    if (!item1) {
      throw new Error('Il tipo di oggetto e\' obbligatorio')
    }

    character.unequip(item1 as ItemType)

    if (item2) {
      character.unequip(item2 as ItemType)
    }
    if (item3) {
      character.unequip(item3 as ItemType)
    }

    return character.print()
  } catch (error) {
    return throwError(error)
  }
}
