import { chatManager } from '../engine'
import { Command } from '../types'

export const attack: Command = async (chatId, args) => {
  const [characterName] = args

  let message: string

  try {
    const character = chatManager.getContext(chatId).getCharacter(characterName)
    const value = character.attack

    message = `${characterName} attacco e' ${value}`
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
