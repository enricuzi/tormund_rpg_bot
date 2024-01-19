import { Command, CommandType, context, throwError } from '../../engine'
import { InlineKeyboardButton } from 'node-telegram-bot-api'

export const list: Command = async (args) => {
  const [characterName] = args

  let message: string
  let buttons: InlineKeyboardButton[] = []

  try {
    if (characterName) {
      const character = context.getCharacter(characterName)

      message = character.print()
      buttons = [
        {
          text: 'Metti',
          callback_data: `${CommandType.Equip} ${characterName}`
        },
        {
          text: 'Attacca',
          callback_data: `${CommandType.Attack} ${characterName}`
        },
        {
          text: 'Togli',
          callback_data: `${CommandType.Unequip} ${characterName}`
        },
        {
          text: 'Cambia',
          callback_data: `${CommandType.Replace} ${characterName}`
        }
      ]
    } else {
      message = context.printCharacters()
    }
  } catch (error) {
    message = throwError(error)
  }

  return [message, buttons]
}
