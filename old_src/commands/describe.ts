import { Command } from '../types'
import { chatManager } from '../engine'

export const describe: Command = async (chatId, args) => {
  const [characterName, ...text] = args

  let message: string

  try {
    const context = chatManager.getContext(chatId)
    const character = context.getCharacter(characterName)
    if (text?.length) {
      character.notes[`nota${Object.keys(character.notes).length}`] = text.join(' ')
      message = 'Testo salvato'
      chatManager.storeContext(chatId, context)
    } else {
      message = Object.keys(character.notes).map(key => `${key}: ${character.notes[key]}`).join('\n')
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
