import { Command } from '../types'
import { ItemType } from '../../engine/types'
import { context } from '../../engine/Context'
import { throwError } from '../utils'

export const equip: Command = async (args) => {
  const [
    characterName,
    item1, item2, item3
  ] = args

  try {
    if (!item1) {
      throw new Error('Il tipo di oggetto e\' obbligatorio')
    }

    const character = context.getCharacter(characterName)

    character.equip(item1 as ItemType)

    if (item2) {
      character.equip(item2 as ItemType)
    }
    if (item3) {
      character.equip(item3 as ItemType)
    }

    return character.print()
  } catch (error) {
    return throwError(error)
  }
}
