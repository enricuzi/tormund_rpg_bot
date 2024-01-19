import {
  ArmorType,
  AttackType,
  AttributeMap,
  AttributeType,
  ItemType,
  WeaponType
} from '../types'
import { Weapon } from './Weapon'
import { Armor } from './Armor'
import { random } from '../utils'

export class Character {
  public weapon1: Weapon = new Weapon(WeaponType.None)
  public weapon2: Weapon | Armor<ArmorType.Shield> = new Weapon(WeaponType.None)
  public armor: Armor = new Armor(ArmorType.None)

  constructor (public readonly name: string, public attributes: AttributeMap, public equipment: ItemType[] = []) {
    equipment.forEach((item) => {
      this._addItem(item)
    })
  }

  public get items (): string {
    return [this.weapon1.itemType, this.weapon2.itemType, this.armor.itemType].filter((item) => item !== WeaponType.None && item !== ArmorType.None).join(', ')
  }

  public attack (itemType: ItemType = WeaponType.None): number {
    let attack1 = 0
    let attribute = 0

    if (this.weapon1.itemType === itemType) {
      attack1 = this.weapon1.attack
      attribute = Math.floor(this._getRelatedAttribute(this.weapon1.attackType))
    }

    const attack2 = this.weapon2 instanceof Weapon
      ? this.weapon2.itemType === WeaponType.None
        ? Math.ceil(attack1 / 2)
        : this.weapon2.itemType === itemType ? Math.floor(this.weapon2.attack / 2) : 0
      : 0

    console.log(attack1, attack2, attribute)

    return attack1 + attack2 + attribute
  }

  public defend (type: AttackType = AttackType.Magical): number {
    const attribute = type === AttackType.Physical ? this.attributes[AttributeType.Physic] : this.attributes[AttributeType.Mind]

    const armor = this.armor.types.includes(type) ? random(attribute) : 0

    const shield = this.weapon2 instanceof Armor && this.weapon2.types.includes(type) ? this.weapon2.defend : 0

    return attribute + armor + shield
  }

  public equip (itemType: ItemType): void {
    this._addItem(itemType)
  }

  public unequip (item: ItemType): void {
    if (this.armor.itemType === item) {
      this.armor = new Armor(ArmorType.None)
    } else if (this.weapon2.itemType === item) {
      this.weapon2 = new Weapon(WeaponType.None)
    } else if (this.weapon1.itemType === item) {
      this.weapon1 = new Weapon(WeaponType.None)
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

  private _addItem (itemType: ItemType): void {
    if (Object.values(WeaponType).includes(itemType as WeaponType)) {
      if (this.weapon1.itemType === WeaponType.None) {
        this.weapon1 = new Weapon(itemType as WeaponType)

        if (itemType === WeaponType.Bow) {
          this.weapon2 = new Weapon(WeaponType.None)
        }
      } else if (this.weapon2.itemType === WeaponType.None) {
        this.weapon2 = new Weapon(itemType as WeaponType)
      }
    } else if (Object.values(ArmorType).includes(itemType as ArmorType)) {
      if (this.weapon2.itemType === WeaponType.None && itemType === ArmorType.Shield) {
        this.weapon2 = new Armor(itemType)
      } else {
        this.armor = new Armor(itemType as ArmorType)
      }
    }
  }

  private _getRelatedAttribute (type: AttackType) {
    return type === AttackType.Physical ? this.attributes[AttributeType.Physic] : this.attributes[AttributeType.Mind]
  }
}
