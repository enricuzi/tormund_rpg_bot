import { Command, context, readContext } from '../../engine'

export const start: Command = async (args) => {
  if (!context.characters.length) {
    readContext()
  }

  return 'Iniziamo a tormundare!'
}
