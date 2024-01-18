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

const TOKEN = '6722269863:AAG0sZgG1tuEFckLc2WshQV7UFGqNzOaZA8'
const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('message', async (msg: Message) => {
  const { id } = msg.chat
  const { text } = msg

  // Process the incoming message here
  console.log(id, text)

  if (!text || !text.startsWith('/')) {
    return
  }

  const texts = text.split(' ')
  const command = texts[0]
  const args = texts.slice(1)
  const actions: SendMessageOptions = {}

  let message: string

  try {
    switch (command) {
      case '/start':
        message = await start(args)
        // actions = {
        //   parse_mode: 'HTML',
        //   reply_markup: {
        //     inline_keyboard: [
        //       [{ text: 'Crea A Caso', callback_data: '/create' }],
        //       [{ text: 'Lista', callback_data: '/list' }],
        //       [{ text: 'Help', callback_data: '/help' }]
        //     ]
        //   }
        // }
        break
      case '/create':
        message = await create(args)
        break
      case '/equip':
        message = await equip(args)
        break
      case '/unequip':
        message = await unequip(args)
        break
      case '/attack':
        message = await attack(args)
        break
      case '/guida':
        message = await help(args)
        break
      case '/list':
        message = await list(args)
        break
      case '/replace':
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
  console.log(query)
})
