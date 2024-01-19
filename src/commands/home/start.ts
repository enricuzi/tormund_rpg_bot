import { Command, CommandType, context, readContext } from '../../engine'

export const start: Command = async () => {
  if (!context.characters.length) {
    readContext()
  }

  return ['Iniziamo a tormundare!', [
    { text: 'Lista', callback_data: CommandType.List },
    { text: 'Manuale', callback_data: CommandType.Help }
  ]]
}
