import { Command, context, throwError } from '../../engine'

export const list: Command = async (args) => {
  const [characterName] = args

  try {
    if (characterName) {
      const character = context.getCharacter(characterName)

      return character.print()
    }

    return context.printCharacters()
  } catch (error) {
    return throwError(error)
  }
}
