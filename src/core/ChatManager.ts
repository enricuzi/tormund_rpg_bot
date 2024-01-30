import fs from 'fs'
import { Context } from './Context'

class ChatManager {
  public readonly chats: Record<number, Context> = {}

  public setContext(chatId: number, context: Context) {
    this.chats[chatId] = context
  }

  public getContext(chatId: number) {
    if (!this.chats[chatId]) {
      this.chats[chatId] = new Context()
    }

    return this.chats[chatId]
  }

  public storeContext(chatId: number, context: Context) {
    const data = JSON.stringify(context)

    try {
      fs.writeFileSync(`${chatId}.txt`, data, 'utf8')
      console.log('Context stored')
    } catch (error) {
      console.error(error)
    }
  }

  public loadContext(chatId: number) {
    try {
      const data: Context = JSON.parse(fs.readFileSync(`${chatId}.txt`, 'utf8'))

      const context = new Context()

      console.log('Reading description from storage', context)

      this.setContext(chatId, context)
    } catch (err) {
      console.error(err)
    }
  }

  public getErrorMessage(error: unknown) {
    return (error as Error).message
  }
}

export const chatManager = new ChatManager()
