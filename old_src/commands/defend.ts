import { Command } from '../types'
import { chatManager } from '../engine'

export const defend: Command = async (chatId, args) => {
  const [characterName, monsterAttack, attackType] = args

  let message = 'TODO'

  try {
    if (!monsterAttack) {
      throw new Error('Mancano i danni del mostro')
    }

    const character = chatManager.getContext(chatId).getCharacter(characterName)

    // const value = character.defend(attackType as AttackType)

    // message = `${characterName} defende su ${attackType || AttackType.Physical} con ${value}`

    // if (Number(monsterAttack) > value) {
    //   const damage = Number(monsterAttack) - value
    //   character.attributes[AttributeType.Life] -= damage
    //   message += `\n${characterName} subisce ${damage} danni`
    //
    //   if (character.attributes[AttributeType.Life] <= 0) {
    //     message += '\n\nOH NO!! SEI MORTO!!'
    //   }
    // }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
