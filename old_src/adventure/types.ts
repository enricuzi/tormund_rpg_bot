export type RawGood = {
  name: string
  price: number
  currency: 'mp' | 'mo' | 'ma' | 'mr'
  weight: string
  tags: string[]
  description: string
}

export enum RawGoodTag {
  General = 'General',
  Cloth = 'Cloth'
}
