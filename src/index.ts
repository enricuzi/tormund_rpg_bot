import TelegramBot, { Message, SendMessageOptions } from 'node-telegram-bot-api'
import {
  attack,
  create,
  equip,
  help,
  list,
  replace,
  start,
  unequip
} from './commands'
import { CommandType, throwError } from './engine'

const TOKEN = '6722269863:AAG0sZgG1tuEFckLc2WshQV7UFGqNzOaZA8'
const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('message', async (msg: Message) => {
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
  const actions: SendMessageOptions = {
    parse_mode: 'HTML'
  }

  let message: string

  try {
    // const pureCommand = command.replace('/', '')

    switch (command) {
      case CommandType.Start:
        message = await start(args)
        actions.reply_markup = {
          inline_keyboard: [
            [
              { text: 'Lista', callback_data: CommandType.List },
              { text: 'Manuale', callback_data: CommandType.Help }
            ]
          ]
        }
        break
      case CommandType.Create:
        message = await create(args)
        break
      case CommandType.Equip:
        message = await equip(args)
        break
      case CommandType.Unequip:
        message = await unequip(args)
        break
      case CommandType.Attack:
        message = await attack(args)
        break
      case CommandType.Help:
        message = await help(args)
        break
      case CommandType.List:
        message = await list(args)
        break
      case CommandType.Replace:
        message = await replace(args)
        break
      default:
        message = ''
        return
    }
  } catch (error) {
    message = (error as Error).message
  }

  if (message) {
    await bot.sendMessage(id, message, actions)
  }
})

bot.on('callback_query', async (query) => {
  console.log('Reacting to button event', query)

  const { data: text, from: { id: charId } } = query

  if (!text || !Object.values(CommandType).includes(text as CommandType)) {
    return
  }

  const params = text.split(' ')
  const command = params[0] as CommandType
  const args = params.slice(1)
  const actions: SendMessageOptions = {
    parse_mode: 'HTML'
  }
  let message

  try {
    switch (command) {
      case CommandType.List:
        message = await list(args)
        break
      case CommandType.Help:
        message = await help(args)
        break
      default:
        message = ''
    }
  } catch (error) {
    message = throwError(error)
  }

  await bot.sendMessage(charId, message, actions)
})
