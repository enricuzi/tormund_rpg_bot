import { Command } from '../types'
import { Dice } from '../engine/core'

export const roll: Command = async (chatId, args) => {
  const [...inputs] = args
  const rolls: number[] = []

  inputs.forEach((input, index) => {
    const values = input.split('+').map(value => Number(value))
    const dado = new Dice(values[0])
    rolls.push(dado.roll({ bonus: values[1] ?? 0 }))
  })

  return rolls.join(', ')
}
