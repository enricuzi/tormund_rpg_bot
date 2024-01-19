import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator
} from 'unique-names-generator'
import {
  AttributeType,
  Character,
  Command,
  context,
  random,
  storeContext,
  throwError
} from '../../engine'

const MAX_ATTRIBUTE_VALUE = 10

export const create: Command = async (args) => {
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
    })

    context.addCharacter(character)

    storeContext()

    message = character.print()
  } catch (error) {
    message = throwError(error)
  }

  return [message, []]
}
