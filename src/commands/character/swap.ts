import { Command } from '../../types'
import { context, storeContext, throwError } from '../../engine'

export const swap: Command = async (args) => {
  const [characterName] = args

  let message: string

  try {
    const character = context.getCharacter(characterName)

    character.swap()

    storeContext()

    message = character.print()
  } catch (error) {
    message = throwError(error)
  }

  return [message, []]
}
