import { Command } from '../types'
import { chatManager } from '../engine'
import { ClassName, RaceName, WeaponName } from '../engine/core'

enum Parameter {
  Characters = 'personaggi',
  Weapons = 'armi',
  Armors = 'armature',
  Items = 'oggetti',
  Spells = 'incantesimi',
  Classes = 'classi',
  Razze = 'razze'
}

export const list: Command = async (chatId, args) => {
  const what = args[0] as Parameter

  let message: string

  try {
    switch (what) {
      case Parameter.Characters:
        const context = chatManager.getContext(chatId)
        message = context.printCharacters()
        break
      case Parameter.Classes:
        message = `\n${Object.values(ClassName).join('\n')}`
        break
      case Parameter.Razze:
        message = `\n${Object.values(RaceName).join('\n')}`
        break
      case Parameter.Weapons:
        message = `\n${Object.values(WeaponName).join('\n')}`
        break
      default:
        message = 'Comando non implementato...'
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
