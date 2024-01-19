import TelegramBot, {
  CallbackQuery,
  InlineKeyboardButton
} from 'node-telegram-bot-api'
import { CommandType, throwError } from '../engine'
import { attack, equip, help, list } from '../commands'

export const query = (bot: TelegramBot) => async (query: CallbackQuery) => {
  console.log('Reacting to button event', query)

  const { data: text, from: { id: charId } } = query

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
        [message, buttons] = await list(args)
        break
      case CommandType.Help:
        [message, buttons] = await help(args)
        break
      case CommandType.Equip:
        [message, buttons] = await equip(args)
        break
      case CommandType.Attack:
        [message, buttons] = await attack(args)
        break
    }
  } catch (error) {
    message = throwError(error)
  }

  if (message) {
    await bot.sendMessage(charId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [buttons]
      }
    })
  }
}
