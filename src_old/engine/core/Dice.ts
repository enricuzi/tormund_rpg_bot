export type DiceProperties = {
  diceSize: number
  diceNumber: number
}

export class Dice {
  constructor (private readonly size: number) {
  }

  public roll ({ number = 1, base = 1, max = number, bonus = 0 }: {
    number?: number
    base?: number
    max?: number
    bonus?: number
  }): number {
    if (number === 1) {
      return Math.floor(Math.random() * this.size) + bonus + base
    }
    const values: number[] = []
    for (let i = 0; i < number; i++) {
      values.push(Math.floor(Math.random() * this.size) + bonus + base)
    }
    values.sort()
    values.shift()
    return values.reduce((sum, value) => {
      return sum + value
    }, 0)
  }
}
