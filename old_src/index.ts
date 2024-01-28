import TelegramBot from 'node-telegram-bot-api'
import { message, query } from './events'

const TOKEN = '6722269863:AAG0sZgG1tuEFckLc2WshQV7UFGqNzOaZA8'
const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('message', message(bot))

bot.on('callback_query', query(bot))
