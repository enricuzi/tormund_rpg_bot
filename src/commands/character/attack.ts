import { Command, context, ItemType, throwError } from '../../engine'

export const attack: Command = async (args) => {
  const [characterName, itemType] = args

  let message: string

  try {
    const character = context.getCharacter(characterName)
    const value = character.attack(itemType as ItemType)

    message = `${characterName} attacco e' ${value}`
  } catch (error) {
    message = throwError(error)
  }

  return [message, []]
}
