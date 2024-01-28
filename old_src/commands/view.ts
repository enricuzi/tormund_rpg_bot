import { Command } from '../types'
import { chatManager } from '../engine'
import parse from 'node-html-parser'

export const view: Command = async (chatId, args) => {
  const [characterName] = args

  let message: string

  const response = await fetch('https://www.dndbeyond.com/characters/95653679')
  const page = await response.text()

  const document = parse(page)

  const abilities =
    document.querySelectorAll('.ddbc-signed-number.ddbc-signed-number--large').map(node => {
      console.log(node?.getAttribute('aria-label')?.replace(' ', ''))
      return node?.getAttribute('aria-label')?.replace(' ', '')
    }
    )

  console.log(abilities)

  try {
    const context = chatManager.getContext(chatId)
    if (characterName) {
      const character = context.getCharacter(characterName)

      message = character.print
    } else {
      message = context.printCharacters()
    }
  } catch (error) {
    message = chatManager.getErrorMessage(error)
  }

  return message
}
