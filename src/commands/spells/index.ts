import { ClassName, Command } from '../types'
import { fetchWebPage } from '../utils'

type SpellDescription = { name: string, level: number }

const spellMap = new Map<ClassName, SpellDescription[]>()

const init = async () => {
  const BASE_URLs: Array<{ className: ClassName, url: string }> = [
    {
      className: ClassName.Bard,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_del_Bardo'
    },
    {
      className: ClassName.Cleric,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_del_Chierico'
    },
    {
      className: ClassName.Druid,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_Del_Druido'
    },
    {
      className: ClassName.Mage,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_del_Mago'
    },
    {
      className: ClassName.Paladin,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_del_Paladino'
    },
    {
      className: ClassName.Ranger,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_del_Ranger'
    },
    {
      className: ClassName.Wizard,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_dello_Stregone'
    },
    {
      className: ClassName.Warlock,
      url: 'https://dungeonsanddragons.fandom.com/it/wiki/Incantesimi_del_Warlock'
    }
  ]

  for (const { className, url } of BASE_URLs) {
    const spells: SpellDescription[] = []

    const document = await fetchWebPage(url)
    const spellTable = document.querySelector('table.wikitable')

    if (spellTable) {
      const rows = spellTable.querySelectorAll('tr').slice(1)

      rows.forEach(row => {
        const [name, shchool, level, action, save, concentration] = row.querySelectorAll('td').map((column, index) => column.innerText)
        spells.push({ name: name.trim(), level: Number(level[0].trim()) })
      })

      spellMap.set(className, spells)
    }
  }
}

init().then(() => {
  console.log('Magie caricate')
}).catch(e => {
  console.error(e)
})

// /magia mago 3
export const spells: Command = async (chatId, args) => {
  const [className, filter] = args
  if (!className) {
    return 'Manca la classe'
  }

  if (!filter) {
    return 'Manca il livello o il nome dell\'incantesimo'
  }

  const spells = spellMap.get(className as ClassName)

  if (!spells) {
    return `Classe ${className} non trovata`
  }

  if (!isNaN(Number(filter))) {
    return `${
      spells
        .filter(spell => spell.level === Number(filter))
        .map(spell => `- ${spell.name}, ${spell.level}`)
        .join('\n')
    }`
  }

  return `${
    spells
      .filter(spell => spell.name === filter)
      .map(spell => `- ${spell.name}, ${spell.level}`)
      .join('\n')
  }`
}
