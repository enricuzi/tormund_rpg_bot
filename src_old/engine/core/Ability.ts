import { Printable } from './types'

export enum AbilityName {
  Strength = 'Forza',
  Dexterity = 'Destrezza',
  Constitution = 'Costituzione',
  Intelligence = 'Intelligenza',
  Wisdom = 'Saggezza',
  Charisma = 'Carisma'
}

export class Ability implements Printable {
  constructor (public readonly name: AbilityName, public value: number) {
  }

  get print (): string {
    return `${this.name}: ${this.value}`
  }

  public get bonus () {
    return Math.floor((this.value - 10) / 2)
  }
}
