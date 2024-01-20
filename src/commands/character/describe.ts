import { Command } from '../../types'
import { chatManager } from '../../engine'

export const describe: Command = async (chatId, args) => {
  const [characterName, ...text] = args

  let message: string

  try {
    const context = chatManager.getContext(chatId)
    const character = context.getCharacter(characterName)
    if (text?.length) {
      character.description = text.join(' ')
      message = 'Testo salvato'
      chatManager.storeContext(chatId, context)
    } else {
      message = character.description
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
