import { Command } from '../types'
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { random, throwError } from '../utils'
import { Character } from '../../engine/Character'
import { context } from '../../engine/Context'
import { AttributeType } from '../../engine/types'

const MAX_ATTRIBUTE_VALUE = 10

export const create: Command = async (args) => {
  const name = args[0] || uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
  const physic = Math.max(Number(args[1]), MAX_ATTRIBUTE_VALUE) || random(MAX_ATTRIBUTE_VALUE)
  const mind = Math.max(Number(args[2]), MAX_ATTRIBUTE_VALUE) || random(MAX_ATTRIBUTE_VALUE)
  const life = Math.max(Number(args[3]), MAX_ATTRIBUTE_VALUE) || random(MAX_ATTRIBUTE_VALUE)

  try {
    const character = new Character(name, new Map([
      [AttributeType.Physic, physic],
      [AttributeType.Mind, mind],
      [AttributeType.Life, life],
    ]))

    context.addCharacter(character)

    return character.print()
  } catch (error) {
    return throwError(error)
  }
}
