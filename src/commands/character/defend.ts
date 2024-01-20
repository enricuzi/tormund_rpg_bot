import { AttackType, Command } from '../../types'
import { chatManager } from '../../engine'

export const defend: Command = async (chatId, args) => {
  const [characterName, attackType] = args

  let message: string

  try {
    const character = chatManager.getContext(chatId).getCharacter(characterName)

    const value = character.defend(attackType as AttackType)

    message = `${characterName} defende su ${attackType || AttackType.Physical} con ${value}`
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
