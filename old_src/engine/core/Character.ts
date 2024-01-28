import { Dice } from './Dice'
import { Ability, AbilityName } from './Ability'
import { MapSkillAttribute, SkillName, Skills } from './Skills'
import { Race } from './Race'
import { Class } from './Class'
import { Weapon } from './Weapon'
import { Printable } from './types'

export class Character implements Printable {
  public readonly name: string
  public readonly classs: Class
  public readonly race: Race
  public readonly abilities: Record<AbilityName, Ability>
  public readonly skills: Record<SkillName, Skills>
  public readonly feats: Record<string, string>
  public readonly properties: { attacks: number }
  public readonly equipment: { weapons: Weapon[] }
  public readonly health: { total: number, temp?: number }
  public readonly notes: Record<string, string>

  public level: number

  constructor (nome: string, config: {
    classs: Class
    race: Race
    level: number
    equipment?: { weapons: Weapon[] }
    abilities?: Record<AbilityName, Ability>
    notes?: Record<string, string>
  }) {
    this.name = nome
    this.classs = config.classs
    this.race = config.race
    this.level = config.level
    this.equipment = config.equipment ?? { weapons: [] }

    this.abilities = config.abilities ?? this.getRandomAbilities()

    this.health = { total: this.getHealthPoints() }
    this.skills = this.getSkills()
    this.feats = this.getFeats()

    this.properties = {
      attacks: Math.floor(this.level / 5) + 1
    }

    this.notes = config.notes ?? {}
  }

  public skillCheck (skillName: SkillName) {
    const dado = new Dice(20)
    return dado.roll({ bonus: this.skills[skillName].value })
  }

  public attack () {
    const numberOfAttacks = this.properties.attacks
    const attacks: number[] = new Array(numberOfAttacks).map(() => 0)
    const damages: number[] = new Array(numberOfAttacks).map(() => 0)

    const [primaryWeapon, secondWeapon] = this.equipment.weapons
    if (!primaryWeapon && !secondWeapon) {
      return { attacks, damages }
    }

    for (let i = 0; i < numberOfAttacks; i++) {
      const weapon = i === numberOfAttacks - 1 ? primaryWeapon : secondWeapon
      const { value, damage } = weapon.hit({})
      attacks[i] = value
      damages[i] = damage
    }

    return { attacks, damages }
  }

  public equip () {
  }

  public get print () {
    return `
      <b>Nome</b>: ${this.name}
      <b>Classe</b>: ${this.classs.print}
      <b>Razza</b>: ${this.race.print}
      <b>Livello</b>: ${this.level}
      <b>Caratteristiche</b>:
      ${Object.values(this.abilities).map(attribute => `- ${attribute.print}`).join('\n')}
      <b>Equipaggiamento</b>:
      ${this.equipment.weapons.map(weapon => `- ${weapon.print}`).join('\n')}
      <b>Abilita'</b>:
      ${Object.values(this.skills).map(skill => `- ${skill.print}`).join('\n')}
    `
  }

  private getHealthPoints () {
    let vita = 0
    for (let i = 0; i < this.level; i++) {
      if (i === 0) {
        vita += this.classs.diceHP + this.abilities.Costituzione.bonus
      } else {
        vita += new Dice(this.classs.diceHP).roll({ bonus: this.abilities.Costituzione.bonus })
      }
    }
    return vita
  }

  private getRandomAbilities () {
    const dice = new Dice(6)
    const abilities: Record<AbilityName, Ability> = {
      [AbilityName.Strength]: new Ability(AbilityName.Strength, dice.roll({
        number: 4,
        max: 3
      })),
      [AbilityName.Dexterity]: new Ability(AbilityName.Dexterity, dice.roll({
        number: 4,
        max: 3
      })),
      [AbilityName.Constitution]: new Ability(AbilityName.Constitution, dice.roll({
        number: 4,
        max: 3
      })),
      [AbilityName.Intelligence]: new Ability(AbilityName.Intelligence, dice.roll({
        number: 4,
        max: 3
      })),
      [AbilityName.Wisdom]: new Ability(AbilityName.Wisdom, dice.roll({
        number: 4,
        max: 3
      })),
      [AbilityName.Charisma]: new Ability(AbilityName.Charisma, dice.roll({
        number: 4,
        max: 3
      }))
    }

    this.race.attributes.forEach(attribute => {
      const { name, bonus } = attribute
      abilities[name].value += bonus
    })

    return abilities
  }

  private getSkills () {
    return Object.keys(MapSkillAttribute).reduce<Partial<typeof this.skills>>((map, key) => {
      const skillName = key as SkillName
      const bonus = this.abilities ? this.abilities[MapSkillAttribute[skillName]].bonus : 0
      map[skillName] = new Skills(skillName, bonus)
      return map
    }, {}) as typeof this.skills
  }

  private getFeats () {
    return {}
  }
}
