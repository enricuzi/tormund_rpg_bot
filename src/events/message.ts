import TelegramBot, {
  InlineKeyboardButton,
  Message
} from 'node-telegram-bot-api'
import { CommandType } from '../types'
import {
  attack,
  create,
  defend,
  describe,
  equip,
  help,
  level,
  list,
  replace,
  rules,
  start,
  swap,
  unequip
} from '../commands'

export const message = (bot: TelegramBot) => async (msg: Message) => {
  const { id: chatId } = msg.chat
  const { text } = msg

  // Process the incoming message here
  console.log(chatId, text)

  if (!text || !text.startsWith('/') || text === '/') {
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
      case CommandType.Start:
        [message, buttons] = await start(chatId, args)
        break
      case CommandType.Create:
        [message, buttons] = await create(chatId, args)
        break
      case CommandType.Equip:
        [message, buttons] = await equip(chatId, args)
        break
      case CommandType.Unequip:
        [message, buttons] = await unequip(chatId, args)
        break
      case CommandType.Attack:
        [message, buttons] = await attack(chatId, args)
        break
      case CommandType.Help:
        [message, buttons] = await help(chatId, args)
        break
      case CommandType.Rules:
        [message, buttons] = await rules(chatId, args)
        break
      case CommandType.Level:
        [message, buttons] = await level(chatId, args)
        break
      case CommandType.List:
        [message, buttons] = await list(chatId, args)
        break
      case CommandType.Replace:
        [message, buttons] = await replace(chatId, args)
        break
      case CommandType.Swap:
        [message, buttons] = await swap(chatId, args)
        break
      case CommandType.Defend:
        [message, buttons] = await defend(chatId, args)
        break
      case CommandType.Describe:
        [message, buttons] = await describe(chatId, args)
        break
    }
  } catch (error) {
    message = (error as Error).message
  }

  if (message) {
    buttons = []
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [buttons]
      }
    })
  }
}
