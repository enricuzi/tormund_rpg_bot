import { ItemType } from './types'

export type Item = {
  readonly itemType: ItemType
  readonly value: number
  readonly bonus: number
}
