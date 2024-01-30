import { Command } from '../types'
import { fetchWebPage } from '../utils'
import { chatManager } from '../../core/ChatManager'

type WeaponDescription = {
  name: string
  damage: string
  description: string
}

const weaponMap: WeaponDescription[] = []

const init = async () => {
  let weapons = chatManager.loadContext<WeaponDescription[]>('weapons')
  if (!weapons) {
    console.log('Fetching tutte le armi')
    weapons = []

    const BASE_URL = 'https://dungeonsanddragons.fandom.com/it/wiki/Equipaggiamento#Armi'
    const INDEX = 4

    const document = await fetchWebPage(BASE_URL)

    const rows = document.querySelectorAll('table.wikitable.article-table')[INDEX].querySelectorAll('tr').slice(1)

    rows.forEach(row => {
      const [name, price, damage, weight, properties] = row.querySelectorAll('td').map((column, index) => column.innerText)
      // @ts-expect-error defined before
      weapons.push({
        name: name.trim(),
        damage: damage.trim(),
        description: properties.trim()
      })
    })

    chatManager.storeContext('store/armi', weapons)
  }

  weaponMap.push(...weapons)
}

init().then(() => {
  console.log('Armi caricate')
}).catch(e => {
  console.error(e)
})

export const weapons: Command = async (chatId, args) => {
  const [weaponName] = args

  if (!weaponName) {
    return weaponMap.map(({
      name,
      damage,
      description
    }, index) => {
      if (damage) {
        return `<b>${name}</b> (${damage})`
      }
      return `\n<b>${name}</b>`
    }).join('\n')
  }

  const weapon = weaponMap.find(weapon => weapon.name === weaponName)
  if (!weapon) {
    return `Arma ${weaponName} non trovata`
  }

  return `<b>${weapon.name}</b> (${weapon.damage})
<i>${weapon.description}</i>>`
}
