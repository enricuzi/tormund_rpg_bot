import { Command } from './types'

export * from './character/attack'
export * from './character/create'
export * from './character/equip'
export * from './home/help'
export * from './home/list'
export * from './character/replace'
export * from './character/unequip'

export const start: Command = async (args) => {
  return 'Iniziamo a tormundare!'
}
