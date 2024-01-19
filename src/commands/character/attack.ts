import { Command, context, ItemType, throwError } from '../../engine'

export const attack: Command = async (args) => {
  const [characterName, itemType] = args

  try {
    const character = context.getCharacter(characterName)
    const value = character.attack(itemType as ItemType)

    return `${characterName} attacco e' ${value}`
  } catch (error) {
    return throwError(error)
  }
}
