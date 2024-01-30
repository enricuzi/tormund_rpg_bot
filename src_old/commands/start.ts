import { Command } from '../types'
import { chatManager } from '../engine'

export const start: Command = async (chatId) => {
  const context = chatManager.getContext(chatId)
  if (!context.characters.length) {
    chatManager.loadContext(chatId)
  }

  return 'Tutto pronto si comincia'
}
