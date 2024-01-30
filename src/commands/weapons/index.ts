import { Command } from '../types'
import { fetchWebPage } from '../utils'

let formattedMessage = 'Comando non implementato'

const init = async () => {
  const BASE_URL = 'https://dungeonsanddragons.fandom.com/it/wiki/Equipaggiamento#Armi'
  const INDEX = 4

  const document = await fetchWebPage(BASE_URL)

  const rows = document.querySelectorAll('table.wikitable.article-table')[INDEX].querySelectorAll('tr').slice(1)

  const table: string[][] = []

  rows.forEach(row => {
    const [name, price, damage, weight, properties] = row.querySelectorAll('td').map((column, index) => column.innerText)
    table.push([name.trim(), damage.trim(), properties.trim()])
  })

  formattedMessage = `${table.map(row => {
    row[0] = `<b>${row[0]}</b>`

    if (!row[1]) {
      return `\n${row[0]}`
    }

    row[1] = `<i>${row[1]}</i>`
    return `- ${row.join(', ')}`
  }).join('\n')}
  `
}

init().then(() => {
  console.log('Armi caricate')
}).catch(e => {
  console.error(e)
})

export const weapons: Command = async (chatId, args) => formattedMessage
