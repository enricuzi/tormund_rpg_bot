import { Context, context } from './Context'
import fs from 'fs'
import { Character } from './components'

export const random = (max = 20) => Math.floor(Math.random() * max) + 1

export const throwError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error'
}

export const storeContext = () => {
  const data = JSON.stringify(context)

  try {
    fs.writeFileSync('context.txt', data, 'utf8')
    console.log('Context stored')
  } catch (error) {
    console.error(error)
  }
}

export const readContext = () => {
  try {
    const data: Context = JSON.parse(fs.readFileSync('context.txt', 'utf8'))

    data.characters.forEach(character => {
      context.addCharacter(Object.assign(new Character(character.name, character.attributes, character.equipment), character))
    })

    console.log('Reading context from storage', context)
  } catch (err) {
    console.error(err)
  }
}
