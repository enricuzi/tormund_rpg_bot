import { AttackType, Command } from '../../types'
import { context, throwError } from '../../engine'

export const defend: Command = async (args) => {
  const [characterName, attackType] = args

  let message: string

  try {
    const character = context.getCharacter(characterName)

    const value = character.defend(attackType as AttackType)

    message = `${characterName} defende su ${attackType || AttackType.Physical} con ${value}`
  } catch (error) {
    message = throwError(error)
  }

  return [message, []]
}
