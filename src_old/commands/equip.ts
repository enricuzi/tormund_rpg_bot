import { Command } from '../types'
import { chatManager } from '../engine'

export const equip: Command = async (chatId, args) => {
  const [
    characterName,
    item1, item2, item3
  ] = args

  let message = 'TODO'

  try {
    const context = chatManager.getContext(chatId)
    if (item1) {
      const character = context.getCharacter(characterName)

      if (item1.includes('+')) {
        const [item, bonus] = item1.split('+')
        // character.equip(item as GoodType, Number(bonus))
      } else {
        // character.equip(item1 as GoodType)
      }

      if (item2 && item2.includes('+')) {
        const [item, bonus] = item2.split('+')
        // character.equip(item as GoodType, Number(bonus))
      } else {
        // character.equip(item2 as GoodType)
      }
      if (item3 && item3.includes('+')) {
        const [item, bonus] = item3.split('+')
        // character.equip(item as GoodType, Number(bonus))
      } else {
        // character.equip(item3 as GoodType)
      }

      chatManager.storeContext(chatId, context)

      message = character.print
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
