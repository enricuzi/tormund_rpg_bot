import {
  Command,
  context,
  ItemType,
  storeContext,
  throwError
} from '../../engine'

export const replace: Command = async (args) => {
  const [characterName, item, newItem] = args

  let message: string

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

    storeContext()

    message = character.print()
  } catch (error) {
    message = throwError(error)
  }

  return [message, []]
}
