import { AttackType, WeaponType } from '../types'
import { random } from '../utils'
import { Item } from './Item'

export class Weapon implements Item {
  public readonly attackType: AttackType
  public readonly value: number
  public readonly bonus = 0

  constructor (public readonly itemType: WeaponType) {
    switch (this.itemType) {
      case WeaponType.Bow:
        this.attackType = AttackType.Physical
        this.value = 5
        break
      case WeaponType.Sword:
        this.attackType = AttackType.Physical
        this.value = 8
        break
      case WeaponType.Fist:
        this.attackType = AttackType.Physical
        this.value = 3
        break
      case WeaponType.Globe:
        this.attackType = AttackType.Magical
        this.value = 4
        break
      case WeaponType.Staff:
        this.attackType = AttackType.Magical
        this.value = 6
        break
      default:
        this.attackType = AttackType.Physical
        this.value = 0
    }
  }

  public get attack (): number {
    return Math.floor(random(this.value) + this.bonus)
  }
}