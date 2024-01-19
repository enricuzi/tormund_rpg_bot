import {
  ArmorType,
  Command, CommandType,
  context,
  ItemType,
  storeContext,
  throwError, WeaponType
} from '../../engine'
import { InlineKeyboardButton } from 'node-telegram-bot-api'

export const equip: Command = async (args) => {
  const [
    characterName,
    item1, item2, item3
  ] = args

  let message = ''
  let buttons: InlineKeyboardButton[] = []

  try {
    if (item1) {
      const character = context.getCharacter(characterName)

      character.equip(item1 as ItemType)

      if (item2) {
        character.equip(item2 as ItemType)
      }
      if (item3) {
        character.equip(item3 as ItemType)
      }

      storeContext()

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
      ]
    } else {
      message = 'Scegli oggetto'
      buttons = Object.values(WeaponType).map(item => ({
        text: `${item}`,
        callback_data: `${CommandType.Equip} ${characterName} ${item}`
      })).concat(Object.values(ArmorType).map(item => ({
        text: `${item}`,
        callback_data: `${CommandType.Equip} ${characterName} ${item}`
      })))
    }
  } catch (error) {
    message = throwError(error)
  }

  return [message, buttons]
}
