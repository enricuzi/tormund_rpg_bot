import TelegramBot, {
  InlineKeyboardButton,
  Message
} from 'node-telegram-bot-api'
import { CommandType } from '../types'
import {
  attack,
  create,
  defend,
  equip,
  help,
  list,
  replace,
  rules,
  start,
  swap,
  unequip
} from '../commands'

export const message = (bot: TelegramBot) => async (msg: Message) => {
  const { id } = msg.chat
  const { text } = msg

  // Process the incoming message here
  console.log(id, text)

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
        [message, buttons] = await start(args)
        break
      case CommandType.Create:
        [message, buttons] = await create(args)
        break
      case CommandType.Equip:
        [message, buttons] = await equip(args)
        break
      case CommandType.Unequip:
        [message, buttons] = await unequip(args)
        break
      case CommandType.Attack:
        [message, buttons] = await attack(args)
        break
      case CommandType.Help:
        [message, buttons] = await help(args)
        break
      case CommandType.Rules:
        [message, buttons] = await rules(args)
        break
      case CommandType.List:
        [message, buttons] = await list(args)
        break
      case CommandType.Replace:
        [message, buttons] = await replace(args)
        break
      case CommandType.Swap:
        [message, buttons] = await swap(args)
        break
      case CommandType.Defend:
        [message, buttons] = await defend(args)
        break
    }
  } catch (error) {
    message = (error as Error).message
  }

  if (message) {
    buttons = []
    await bot.sendMessage(id, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [buttons]
      }
    })
  }
}
