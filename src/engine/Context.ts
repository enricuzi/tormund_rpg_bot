import { Character } from './components'

export class Context {
  public readonly characters: Character[] = []

  public addCharacter (character: Character) {
    if (this.hasCharacter(character.name)) throw new Error(`Character ${character.name} already exists`)
    this.characters.push(character)
  }

  public getCharacter (name: string) {
    if (!name) throw new Error('Il nome del personaggio e\' obbligatorio')
    const character = this.characters.find((c) => c.name === name)
    if (!character) throw new Error(`${name} non esiste`)
    return character
  }

  public hasCharacter (name: string) {
    return this.characters.some((c) => c.name === name)
  }

  public printCharacters () {
    return this.characters.map((character) => character.name).join('\n') || 'Nessun personaggio creato'
  }
}

export const context = new Context()
