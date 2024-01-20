import { Command, ItemType } from '../../types'
import { chatManager } from '../../engine'

export const unequip: Command = async (chatId, args) => {
  const [characterName, item1, item2, item3] = args

  let message: string

  try {
    const context = chatManager.getContext(chatId)
    const character = context.getCharacter(characterName)

    if (!item1) {
      throw new Error('Il tipo di oggetto e\' obbligatorio')
    }

    if (item1.includes('+')) {
      const [item, bonus] = item1.split('+')
      character.unequip(item as ItemType, Number(bonus))
    } else {
      character.unequip(item1 as ItemType)
    }

    if (item2) {
      character.unequip(item2 as ItemType)
    }
    if (item3) {
      character.unequip(item3 as ItemType)
    }

    chatManager.storeContext(chatId, context)

    message = character.print()
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
