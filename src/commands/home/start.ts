import { Command, CommandType } from '../../types'
import { chatManager } from '../../engine'

export const start: Command = async (chatId) => {
  const context = chatManager.getContext(chatId)
  if (!context.characters.length) {
    chatManager.loadContext(chatId)
  }

  return ['Context laoaded', [
    { text: 'Lista', callback_data: CommandType.List },
    { text: 'Manuale', callback_data: CommandType.Help },
    { text: 'Regole', callback_data: CommandType.Rules }
  ]]
}
