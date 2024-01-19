import { ArmorType, AttackType, Item } from '../../types'

export class Armor<ArmorTypeConstraints extends ArmorType = ArmorType> implements Item {
  public readonly types: AttackType[]
  public readonly value: number
  public readonly bonus = 0

  constructor (public readonly itemType: ArmorTypeConstraints) {
    switch (itemType) {
      case ArmorType.Light:
        this.types = [AttackType.Magical]
        this.value = 2
        break
      case ArmorType.Medium:
        this.types = [AttackType.Physical, AttackType.Magical]
        this.value = 4
        break
      case ArmorType.Heavy:
        this.types = [AttackType.Physical]
        this.value = 6
        break
      case ArmorType.Shield:
        this.types = [AttackType.Physical]
        this.value = 2
        break
      default:
        this.types = [AttackType.Physical]
        this.value = 0
    }
  }

  public get defend (): number {
    return this.value + this.bonus
  }
}
