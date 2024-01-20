import { Command } from '../../types'
import { chatManager } from '../../engine'

export const swap: Command = async (chatId, args) => {
  const [characterName] = args

  let message: string

  try {
    const context = chatManager.getContext(chatId)
    const character = context.getCharacter(characterName)

    character.swap()

    chatManager.storeContext(chatId, context)

    message = character.print()
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
