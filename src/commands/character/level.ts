import { AttributeType, Command } from '../../types'
import { chatManager } from '../../engine'

export const level: Command = async (chatId, args) => {
  const [characterName, attributeType, value] = args

  let message: string

  try {
    if (!attributeType && !value) {
      throw new Error('Mancano l\'attributo e il nuovo valore')
    }

    const context = chatManager.getContext(chatId)

    const character = context.getCharacter(characterName)
    character.level(attributeType as AttributeType, value)

    chatManager.storeContext(chatId, context)

    message = character.print()
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
