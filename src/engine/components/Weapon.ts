import { AttackType, Item, WeaponType } from '../../types'
import { random } from '../utils'

export class Weapon implements Item {
  public readonly attackType: AttackType
  public readonly value: number

  constructor (public readonly itemType: WeaponType, public readonly bonus = 0) {
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
        this.value = 7
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
