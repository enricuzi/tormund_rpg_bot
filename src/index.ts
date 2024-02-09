import TelegramBot, { Message } from 'node-telegram-bot-api'
import { chatManager } from './core/ChatManager'
import { spells } from './commands/spells'
import { weapons } from './commands/weapons'

const TOKEN = '6722269863:AAG0sZgG1tuEFckLc2WshQV7UFGqNzOaZA8'
const bot = new TelegramBot(TOKEN, { polling: true })

export enum CommandName {
  Load = '/carica',
  Spells = '/magie',
  Weapons = '/armi'
}

bot.on('message', async (msg: Message) => {
  const { id: chatId } = msg.chat
  const { text } = msg

  // Process the incoming message here
  console.log(chatId, text)

  if (!text || !text.startsWith('/') || text === '/') {
    return
  }

  const params = text.split(' ')
  const command = params[0] as CommandName

  if (!Object.values(CommandName).includes(command)) {
    return
  }

  const args = params.slice(1)

  let message = ''

  try {
    switch (command) {
      case CommandName.Spells:
        message = await spells(chatId, args)
        break
      case CommandName.Weapons:
        message = await weapons(chatId, args)
        break
    }
  } catch (e) {
    message = chatManager.getErrorMessage(e)
  }

  if (message) {
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: []
      }
    })
  }
})
