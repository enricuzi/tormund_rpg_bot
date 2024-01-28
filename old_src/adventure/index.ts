import { RawGood } from './types'
import { random } from '../engine'

export const getRandomGood = (goods: RawGood[], filter?: [keyof RawGood, string]): RawGood | null => {
  const filteredList = filter ? goods.filter(good => good[filter[0]] === filter[1]) : goods

  if (filteredList.length === 0) {
    return null
  }

  if (filteredList.length === 1) {
    return filteredList[0]
  }

  return filteredList[random(filteredList.length)]
}

export const getRandomGoods = (goods: RawGood[], totalPrice: number, filter?: [keyof RawGood, string]): RawGood[] | null => {
  const totalGoods = []
  let currentPrice = 0

  do {
    const item = getRandomGood(goods, filter)
    if (item) {
      totalGoods.push(item)
      currentPrice += item.price
    }
  } while (currentPrice <= totalPrice)

  return totalGoods
}
