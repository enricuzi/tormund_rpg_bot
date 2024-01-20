import TelegramBot, {
  CallbackQuery,
  InlineKeyboardButton
} from 'node-telegram-bot-api'
import { attack, equip, help, list } from '../commands'
import { CommandType } from '../types'
import { chatManager } from '../engine'

export const query = (bot: TelegramBot) => async (query: CallbackQuery) => {
  console.log('Reacting to button event', query)

  const { data: text, from: { id: chatId } } = query

  if (!text) {
    return
  }

  const params = text.split(' ')
  const command = params[0] as CommandType

  if (!Object.values(CommandType).includes(command)) {
    return
  }

  const args = params.slice(1)

  let message = ''
  let buttons: InlineKeyboardButton[] = []

  try {
    switch (command) {
      case CommandType.List:
        [message, buttons] = await list(chatId, args)
        break
      case CommandType.Help:
        [message, buttons] = await help(chatId, args)
        break
      case CommandType.Equip:
        [message, buttons] = await equip(chatId, args)
        break
      case CommandType.Attack:
        [message, buttons] = await attack(chatId, args)
        break
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  if (message) {
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [buttons]
      }
    })
  }
}
