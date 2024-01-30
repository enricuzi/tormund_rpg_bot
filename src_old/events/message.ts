import TelegramBot, { Message } from 'node-telegram-bot-api'
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
  roll,
  rules,
  start,
  swap,
  unequip,
  view
} from '../commands'
import fs from 'fs'
import * as path from 'path'

const DIR = path.resolve(__dirname)

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

  try {
    switch (command) {
      case CommandType.Start:
        message = await start(chatId, args)
        break
      case CommandType.Create:
        message = await create(chatId, args)
        break
      case CommandType.Equip:
        message = await equip(chatId, args)
        break
      case CommandType.Unequip:
        message = await unequip(chatId, args)
        break
      case CommandType.Attack:
        message = await attack(chatId, args)
        break
      case CommandType.Help:
        message = await help(chatId, args)
        break
      case CommandType.Rules:
        message = await rules(chatId, args)
        break
      case CommandType.Level:
        message = await level(chatId, args)
        break
      case CommandType.List:
        message = await list(chatId, args)
        break
      case CommandType.Replace:
        message = await replace(chatId, args)
        break
      case CommandType.Swap:
        message = await swap(chatId, args)
        break
      case CommandType.Defend:
        message = await defend(chatId, args)
        break
      case CommandType.Describe:
        message = await describe(chatId, args)
        break
      case CommandType.Roll:
        message = await roll(chatId, args)
        break
      case CommandType.View:
        message = await view(chatId, args)
        break
      case CommandType.Dice:
        message = ''
        const fileReader = fs.readFileSync
        return await bot.sendPhoto(chatId, fileReader(`${DIR}/../images/${args[0]}.png`))
      // return await bot.sendDocument(chatId, 'www.dndbeyond.com/sheet-pdfs/enricuzi_95653679.pdf')
    }
  } catch (error) {
    message = (error as Error).message
  }

  if (message) {
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: []
      }
    })
  }
}
