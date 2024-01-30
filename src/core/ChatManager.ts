import fs from 'fs'
import { Context } from './Context'

class ChatManager {
  public readonly chats: Record<number, Context> = {}

  public setContext (chatId: number, context: Context) {
    this.chats[chatId] = context
  }

  public getContext (chatId: number) {
    if (!this.chats[chatId]) {
      this.chats[chatId] = new Context()
    }

    return this.chats[chatId]
  }

  public storeContext (contextName: string, contextData: unknown) {
    const data = JSON.stringify(contextData)

    try {
      fs.writeFileSync(`${contextName}.txt`, data, 'utf8')
      console.log(`Context ${contextName} stored`)
    } catch (error) {
      console.error(error)
    }
  }

  public loadContext<Context>(contextName: string, catchErrors = false) {
    try {
      const data: Context = JSON.parse(fs.readFileSync(`${contextName}.txt`, 'utf8'))

      console.log(`Context ${contextName} loaded from storage`)

      return data
    } catch (err) {
      if (catchErrors) {
        console.error(err)
      }
    }
  }

  public getErrorMessage (error: unknown) {
    return (error as Error).message
  }
}

export const chatManager = new ChatManager()
