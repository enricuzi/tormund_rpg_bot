import { chatManager } from '../engine'
import { Command } from '../types'
import { Character, Class, ClassName, Race, RaceName } from '../engine/core'

enum Parameter {
  Class = 'classe',
  Race = 'razza',
  Level = 'level'
}

export const create: Command = async (chatId, args) => {
  const name = args.shift()

  if (!name) {
    return 'Manca il nome del personaggio'
  }

  let className = ClassName.Warrior
  let raceName = RaceName.Human
  let level = 1

  args.forEach(argument => {
    const values = argument.split(':')
    switch (values[0]) {
      case Parameter.Class:
        className = values[1] as ClassName
        break
      case Parameter.Race:
        raceName = values[1] as RaceName
        break
      case Parameter.Level:
        level = Number(values[1])
        break
    }
  })

  const character = new Character(name, {
    classs: new Class(className),
    race: new Race(raceName),
    level
  })

  try {
    const context = chatManager.getContext(chatId)
    context.addCharacter(character)
    chatManager.storeContext(chatId, context)
  } catch (error) {
    chatManager.getErrorMessage(error)
  }

  return character.print
}
