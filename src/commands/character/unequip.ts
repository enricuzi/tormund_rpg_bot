import {
  Command,
  context,
  ItemType,
  storeContext,
  throwError
} from '../../engine'

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

    storeContext()

    return character.print()
  } catch (error) {
    return throwError(error)
  }
}
