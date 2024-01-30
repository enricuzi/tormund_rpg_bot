import { Command } from '../types'
import { chatManager } from '../engine'

export const replace: Command = async (chatId, args) => {
  const [characterName, item, newItem] = args

  let message: string

  try {
    const context = chatManager.getContext(chatId)
    const character = context.getCharacter(characterName)

    if (!item) {
      throw new Error('Il tipo di oggetto da togliere e\' obbligatorio')
    }
    if (!newItem) {
      throw new Error('Il tipo di oggetto da mettere e\' obbligatorio')
    }

    // character.unequip(item as GoodType)
    // character.equip(newItem as GoodType)

    chatManager.storeContext(chatId, context)

    message = character.print
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
