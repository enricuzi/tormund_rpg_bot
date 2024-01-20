import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator
} from 'unique-names-generator'
import {
  Character,
  chatManager,
  random
} from '../../engine'
import { ArmorType, AttributeType, Command, WeaponType } from '../../types'

const MAX_ATTRIBUTE_VALUE = 10

export const create: Command = async (chatId, args) => {
  const name = args[0] || uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
  const physic = Math.max(Number(args[1]), MAX_ATTRIBUTE_VALUE) || random(MAX_ATTRIBUTE_VALUE)
  const mind = Math.max(Number(args[2]), MAX_ATTRIBUTE_VALUE) || random(MAX_ATTRIBUTE_VALUE)
  const life = Math.max(Number(args[3]), MAX_ATTRIBUTE_VALUE) || random(MAX_ATTRIBUTE_VALUE)

  let message: string

  try {
    const character = new Character(name, {
      [AttributeType.Physic]: physic,
      [AttributeType.Mind]: mind,
      [AttributeType.Life]: life
    }, {
      hand1: { type: WeaponType.None },
      hand2: { type: WeaponType.None },
      armor: { type: ArmorType.None }
    })

    const context = chatManager.getContext(chatId)
    context.addCharacter(character)
    chatManager.storeContext(chatId, context)

    message = character.print()
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
