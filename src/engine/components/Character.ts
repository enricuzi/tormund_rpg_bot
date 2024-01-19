import {
  ArmorType,
  AttackType,
  AttributeMap,
  AttributeType,
  Equipment,
  ItemType,
  WeaponType
} from '../../types'
import { Weapon } from './Weapon'
import { Armor } from './Armor'
import { random } from '../utils'

export class Character {
  public hand1: Weapon
  public hand2: Weapon | Armor<ArmorType.Shield>
  public armor: Armor

  constructor (public readonly name: string, public attributes: AttributeMap, equipment: Equipment) {
    this.hand1 = new Weapon(equipment.hand1)
    this.hand2 = equipment.hand2 === ArmorType.Shield ? new Armor(equipment.hand2) : new Weapon(equipment.hand2)
    this.armor = new Armor(equipment.armor)
  }

  public get items (): string {
    return [this.hand1.itemType, this.hand2.itemType, this.armor.itemType].filter((item) => item !== WeaponType.None && item !== ArmorType.None).join(', ')
  }

  public attack (itemType: ItemType = this.hand1.itemType): number {
    let attack1 = 0
    let attribute = 0

    if (this.hand1.itemType === itemType) {
      attack1 = this.hand1.attack
      attribute = random(this._getRelatedAttribute(this.hand1.attackType))
    }

    const attack2 = this.hand2 instanceof Weapon
      ? this.hand2.itemType === WeaponType.None
        ? Math.ceil(attack1 / 2)
        : this.hand2.itemType === itemType ? Math.floor(this.hand2.attack / 2) : 0
      : 0

    console.log(attack1, attack2, attribute)

    return attack1 + attack2 + attribute
  }

  public defend (type: AttackType = AttackType.Magical): number {
    const attribute = type === AttackType.Physical ? this.attributes[AttributeType.Physic] : this.attributes[AttributeType.Mind]

    const armor = this.armor.types.includes(type) ? random(attribute) : 0

    const shield = this.hand2 instanceof Armor && this.hand2.types.includes(type) ? this.hand2.defend : 0

    return attribute + armor + shield
  }

  public equip (itemType: ItemType): void {
    if (Object.values(WeaponType).includes(itemType as WeaponType)) {
      if (itemType === WeaponType.Bow || itemType === WeaponType.Staff) {
        this.hand1 = new Weapon(itemType)
        this.hand2 = new Weapon(WeaponType.None)
      } else if (this.hand1.itemType === WeaponType.None) {
        this.hand1 = new Weapon(itemType as WeaponType)
      } else if (this.hand2.itemType === WeaponType.None) {
        this.hand2 = new Weapon(itemType as WeaponType)
      }
    } else if (Object.values(ArmorType).includes(itemType as ArmorType)) {
      if (this.hand2.itemType === WeaponType.None && itemType === ArmorType.Shield) {
        this.hand2 = new Armor(itemType)
      } else {
        this.armor = new Armor(itemType as ArmorType)
      }
    }
  }

  public unequip (item: ItemType): void {
    if (this.armor.itemType === item) {
      this.armor = new Armor(ArmorType.None)
    } else if (this.hand2.itemType === item) {
      this.hand2 = new Weapon(WeaponType.None)
    } else if (this.hand1.itemType === item) {
      this.hand1 = new Weapon(WeaponType.None)
    } else {
      throw new Error('Non hai l\'oggetto da togliere')
    }
  }

  public print (): string {
    return `
      Name: ${this.name}
      ${AttributeType.Physic}: ${this.attributes[AttributeType.Physic]}
      ${AttributeType.Mind}: ${this.attributes[AttributeType.Mind]}
      ${AttributeType.Life}: ${this.attributes[AttributeType.Life]}
      Equipment: ${this.items}
    `
  }

  private _getRelatedAttribute (type: AttackType) {
    return type === AttackType.Physical ? this.attributes[AttributeType.Physic] : this.attributes[AttributeType.Mind]
  }
}
