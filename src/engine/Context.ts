import { Character } from './Character'

class Context {
  private readonly _characters: Character[]

  constructor () {
    this._characters = []
  }

  public addCharacter (character: Character) {
    if (this.hasCharacter(character.name)) throw new Error(`Character ${character.name} already exists`)
    this._characters.push(character)
  }

  public getCharacter (name: string) {
    if (!name) throw new Error('Il nome del personaggio e\' obbligatorio')
    const character = this._characters.find((c) => c.name === name)
    if (!character) throw new Error(`${name} non esiste`)
    return character
  }

  public hasCharacter (name: string) {
    return this._characters.some((c) => c.name === name)
  }

  public printCharacters () {
    return this._characters.map((character) => character.name).join('\n') || 'Nessun personaggio creato'
  }
}

export const context = new Context()
