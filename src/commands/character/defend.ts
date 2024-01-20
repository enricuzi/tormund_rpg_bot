import { AttackType, AttributeType, Command } from '../../types'
import { chatManager } from '../../engine'

export const defend: Command = async (chatId, args) => {
  const [characterName, monsterAttack, attackType] = args

  let message: string

  try {
    if (!monsterAttack) {
      throw new Error('Mancano i danni del mostro')
    }

    const character = chatManager.getContext(chatId).getCharacter(characterName)

    const value = character.defend(attackType as AttackType)

    message = `${characterName} defende su ${attackType || AttackType.Physical} con ${value}`

    if (Number(monsterAttack) > value) {
      character.attributes[AttributeType.Life] -= Number(monsterAttack) - value
      message += `\n${characterName} subisce ${Number(monsterAttack) - value} danni`
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return [message, []]
}
