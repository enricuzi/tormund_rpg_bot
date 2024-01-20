import { InlineKeyboardButton } from 'node-telegram-bot-api'
import { Command, CommandType } from '../../types'
import { chatManager } from '../../engine'

export const list: Command = async (chatId, args) => {
  const [characterName] = args

  let message: string
  let buttons: InlineKeyboardButton[] = []

  try {
    const context = chatManager.getContext(chatId)
    if (characterName) {
      const character = context.getCharacter(characterName)

      message = character.print()
      buttons = [
        // {
        //   text: 'Metti',
        //   callback_data: `${CommandType.Equip} ${characterName}`
        // },
        {
          text: 'Attacca',
          callback_data: `${CommandType.Attack} ${characterName}`
        }
        // {
        //   text: 'Togli',
        //   callback_data: `${CommandType.Unequip} ${characterName}`
        // },
        // {
        //   text: 'Cambia',
        //   callback_data: `${CommandType.Replace} ${characterName}`
        // }
      ]
    } else {
      message = context.printCharacters()
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, buttons]
}
