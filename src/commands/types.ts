export type Command = (chatId: number, args: string[]) => Promise<string>

export enum ClassName {
  Barbarian = 'barbaro',
  Bard = 'bardo',
  Cleric = 'chierico',
  Druid = 'druido',
  Warrior = 'guerriero',
  Rogue = 'ladro',
  Mage = 'mago',
  Wizard = 'stregone',
  Monk = 'monaco',
  Paladin = 'paladino',
  Ranger = 'ranger',
  Warlock = 'warlock'
}
