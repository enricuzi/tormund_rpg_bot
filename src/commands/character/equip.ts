import { InlineKeyboardButton } from 'node-telegram-bot-api'
import {
  ArmorType,
  Command,
  CommandType,
  ItemType,
  WeaponType
} from '../../types'
import { chatManager } from '../../engine'

export const equip: Command = async (chatId, args) => {
  const [
    characterName,
    item1, item2, item3
  ] = args

  let message
  let buttons: InlineKeyboardButton[] = []

  try {
    const context = chatManager.getContext(chatId)
    if (item1) {
      const character = context.getCharacter(characterName)

      if (item1.includes('+')) {
        const [item, bonus] = item1.split('+')
        character.equip(item as ItemType, Number(bonus))
      } else {
        character.equip(item1 as ItemType)
      }

      if (item2 && item2.includes('+')) {
        const [item, bonus] = item2.split('+')
        character.equip(item as ItemType, Number(bonus))
      } else {
        character.equip(item2 as ItemType)
      }
      if (item3 && item3.includes('+')) {
        const [item, bonus] = item3.split('+')
        character.equip(item as ItemType, Number(bonus))
      } else {
        character.equip(item3 as ItemType)
      }

      chatManager.storeContext(chatId, context)

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
    message = chatManager.getErrorMessage(error)
  }

  return [message, buttons]
}
