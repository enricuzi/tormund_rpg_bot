import { Command, context, throwError } from '../../engine'

export const attack: Command = async (args) => {
  const [characterName] = args

  let message: string

  try {
    const character = context.getCharacter(characterName)
    const value = character.attack

    message = `${characterName} attacco e' ${value}`
  } catch (error) {
    message = throwError(error)
  }

  return [message, []]
}
