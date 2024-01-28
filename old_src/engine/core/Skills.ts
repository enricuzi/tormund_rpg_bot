import { AbilityName } from './Ability'
import { Printable } from './types'

export enum SkillName {
  Athletics = 'Atletica',
  Acrobatics = 'Acrobazia',
  Sleight_of_Hand = 'Prestidigitazione',
  Stealth = 'Furtività',
  History = 'Storia',
  Investigation = 'Indagare',
  Nature = 'Natura',
  Religion = 'Religione',
  Arcana = 'Arcanismo',
  Perception = 'Percepire',
  Survival = 'Sopravvivenza',
  Medicine = 'Medicina',
  Insight = 'Intuire',
  Animal_Handling = 'Simpatia Animale',
  Deception = 'Inganno',
  Intimidation = 'Intimorire',
  Performance = 'Intrattenere',
  Persuation = 'Persuasione'
}

export const MapSkillAttribute: Record<SkillName, AbilityName> = {
  [SkillName.Athletics]: AbilityName.Strength,
  [SkillName.Acrobatics]: AbilityName.Dexterity,
  [SkillName.Sleight_of_Hand]: AbilityName.Dexterity,
  [SkillName.Stealth]: AbilityName.Dexterity,
  [SkillName.History]: AbilityName.Intelligence,
  [SkillName.Investigation]: AbilityName.Intelligence,
  [SkillName.Nature]: AbilityName.Intelligence,
  [SkillName.Religion]: AbilityName.Intelligence,
  [SkillName.Arcana]: AbilityName.Intelligence,
  [SkillName.Perception]: AbilityName.Wisdom,
  [SkillName.Survival]: AbilityName.Wisdom,
  [SkillName.Medicine]: AbilityName.Wisdom,
  [SkillName.Insight]: AbilityName.Wisdom,
  [SkillName.Animal_Handling]: AbilityName.Wisdom,
  [SkillName.Deception]: AbilityName.Charisma,
  [SkillName.Intimidation]: AbilityName.Charisma,
  [SkillName.Performance]: AbilityName.Charisma,
  [SkillName.Persuation]: AbilityName.Charisma
}

export class Skills implements Printable {
  constructor (public readonly name: SkillName, public bonusAttribute: number, public bonusSkill = 0) {
  }

  get print (): string {
    return `${this.name}: ${this.value}`
  }

  public get value () {
    return this.bonusAttribute + this.bonusSkill
  }
}
