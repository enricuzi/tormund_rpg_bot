import {
  ArmorType,
  AttackType,
  AttributeMap,
  AttributeType,
  Equipment,
  Item,
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
    this.hand1 = new Weapon(equipment.hand1.type, equipment.hand1.bonus)
    this.hand2 = equipment.hand2.type === ArmorType.Shield
      ? new Armor(equipment.hand2.type, equipment.hand2.bonus)
      : new Weapon(equipment.hand2.type, equipment.hand2.bonus)
    this.armor = new Armor(equipment.armor.type, equipment.armor.bonus)
  }

  public get attack (): number {
    const attack1 = this.hand1.attack
    const attribute = this._getRelatedAttribute(this.hand1.attackType)

    let attack2

    if (this.hand2.itemType === WeaponType.None) {
      attack2 = Math.ceil(attack1 / 2)
    } else if (this.hand2.itemType === ArmorType.Shield) {
      attack2 = 0
    } else if (this.hand2.itemType === this.hand1.itemType) {
      attack2 = Math.floor(this.hand2.attack / 2) + random(attribute)
    } else {
      attack2 = this.hand2.attack + random(this._getRelatedAttribute(this.hand2.attackType))
    }

    console.log(attack1, attack2, attribute)

    return attack1 + attack2 + random(attribute)
  }

  public defend (attackType: AttackType = AttackType.Physical): number {
    const attribute = this._getRelatedAttribute(attackType)

    const armor = this.armor.itemType === ArmorType.None
      ? 0
      : this.armor.types.includes(attackType) ? this.armor.defend : 0

    const shield = this.hand2 instanceof Armor && this.hand2.types.includes(attackType) ? this.hand2.defend : 0

    console.log(attribute, armor, shield)

    return attribute + armor + shield
  }

  public equip (itemType: ItemType, bonus = 0): void {
    if (Object.values(WeaponType).includes(itemType as WeaponType)) {
      if (itemType === WeaponType.Bow || itemType === WeaponType.Staff) {
        this.hand1 = new Weapon(itemType, bonus)
        this.hand2 = new Weapon(WeaponType.None)
      } else if (this.hand1.itemType === WeaponType.None) {
        this.hand1 = new Weapon(itemType as WeaponType, bonus)
      } else if (this.hand2.itemType === WeaponType.None) {
        this.hand2 = new Weapon(itemType as WeaponType, bonus)
      }
    } else if (Object.values(ArmorType).includes(itemType as ArmorType)) {
      if (this.hand2.itemType === WeaponType.None && itemType === ArmorType.Shield) {
        this.hand2 = new Armor(itemType, bonus)
      } else {
        this.armor = new Armor(itemType as ArmorType, bonus)
      }
    }
  }

  public unequip (item: ItemType, bonus = 0): void {
    if (this.armor.itemType === item) {
      if (this.armor.bonus === bonus) {
        this.armor = new Armor(ArmorType.None)
      }
    } else if (this.hand2.itemType === item) {
      if (this.hand2.bonus === bonus) {
        this.hand2 = new Weapon(WeaponType.None)
      }
    } else if (this.hand1.itemType === item) {
      if (this.hand1.bonus === bonus) {
        this.hand1 = new Weapon(WeaponType.None)
      }
    } else {
      throw new Error('Non hai l\'oggetto da togliere')
    }
  }

  public swap () {
    if (this.hand2.itemType === ArmorType.Shield) {
      return
    }
    const temp = new Weapon(this.hand1.itemType, this.hand1.bonus)
    this.hand1 = new Weapon(this.hand2.itemType, this.hand2.bonus)
    this.hand2 = temp
  }

  public level (attributeType: AttributeType, newValue: string) {
    if (newValue.startsWith('+')) {
      this.attributes[attributeType] += Number(newValue.padStart(1))
    } else {
      this.attributes[attributeType] = Number(newValue)
    }
  }

  public print (): string {
    return `
      Name: ${this.name}
      ${AttributeType.Physic}: ${this.attributes[AttributeType.Physic]}
      ${AttributeType.Mind}: ${this.attributes[AttributeType.Mind]}
      ${AttributeType.Life}: ${this.attributes[AttributeType.Life]}
      Mano1: ${this.printItem(this.hand1)}
      Mano2: ${this.printItem(this.hand2)}
      Armatura: ${this.printItem(this.armor)}
    `
  }

  private printItem ({ itemType, bonus }: Item) {
    if (itemType === WeaponType.None || itemType === ArmorType.None) {
      return '-'
    }
    return bonus ? `${itemType}+${bonus}` : itemType
  }

  private _getRelatedAttribute (type: AttackType) {
    return type === AttackType.Physical ? this.attributes[AttributeType.Physic] : this.attributes[AttributeType.Mind]
  }
}
