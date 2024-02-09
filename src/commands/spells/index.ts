import { ClassName, Command } from '../types'
import { fetchWebPage } from '../utils'
import { chatManager } from '../../core/ChatManager'

type SpellDescription = { name: string, level: number, details: string }

const allSpells: SpellDescription[] = []
const classSpellsMap = new Map<ClassName, SpellDescription[]>()

const BASE_URL = 'https://dungeonsanddragons.fandom.com/it/wiki'

const init = async () => {
  const BASE_URLs: Array<{ className: ClassName, url: string }> = [
    {
      className: ClassName.Bard,
      url: `${BASE_URL}/Incantesimi_del_Bardo`
    },
    {
      className: ClassName.Cleric,
      url: `${BASE_URL}/Incantesimi_del_Chierico`
    },
    {
      className: ClassName.Druid,
      url: `${BASE_URL}/Incantesimi_Del_Druido`
    },
    {
      className: ClassName.Mage,
      url: `${BASE_URL}/Incantesimi_del_Mago`
    },
    {
      className: ClassName.Paladin,
      url: `${BASE_URL}/Incantesimi_del_Paladino`
    },
    {
      className: ClassName.Ranger,
      url: `${BASE_URL}/Incantesimi_del_Ranger`
    },
    {
      className: ClassName.Wizard,
      url: `${BASE_URL}/Incantesimi_dello_Stregone`
    },
    {
      className: ClassName.Warlock,
      url: `${BASE_URL}/Incantesimi_del_Warlock`
    }
  ]

  for (const { className, url } of BASE_URLs) {
    let spells = chatManager.loadContext<SpellDescription[]>(`incantesimi_${className}`)
    if (!spells) {
      console.log(`Fetching gli incantesimi da ${className}`)

      spells = []
      const document = await fetchWebPage(url)
      const spellTable = document.querySelector('table.wikitable')

      if (spellTable) {
        const rows = spellTable.querySelectorAll('tr').slice(1)

        for (const row of rows) {
          const [spellName, school, level, action, save, concentration] = row.querySelectorAll('td').map((column, index) => column.innerText)

          const spellPage = await fetchWebPage(`${BASE_URL}/${spellName}`)
          const description = spellPage.querySelector('.mw-parser-output')?.querySelector('p:nth-child(3)')?.innerText

          spells.push({
            name: spellName.trim(),
            level: Number(level[0].trim()),
            details: `
          - <b>Scuola</b>: ${school.trim()}
          - <b>Azione</b>: ${action.trim()}
          - <b>Salvezza</b>: ${save.trim()}
          - <b>Concentrazione</b>: ${concentration.trim()}
          - ><b>Descrizione</b>: ${description?.trim()}
          `.replace(/\s+/g, ' ').replace(/\s-/g, '\n-')
          })
        }

        chatManager.storeContext(`store/incantesimi_${className}`, spells)
      }
    }
    spells.forEach(spell => {
      if (!allSpells.find(allSpell => allSpell.name === spell.name)) {
        allSpells.push(spell)
      }
    })

    classSpellsMap.set(className, spells)
    console.log(`Incantesimi da ${className} caricati`)
  }
}

init().then(() => {
  console.log('Magie caricate')
}).catch(e => {
  console.error(e)
})

// /magia mago 3
export const spells: Command = async (chatId, args) => {
  const [name, ...filter] = args
  if (!name) {
    return 'Manca la classe'
  }

  if (!filter.length) {
    filter[0] = '0'
  }

  let spell: SpellDescription | undefined

  const spells = classSpellsMap.get(name as ClassName)

  if (spells) {
    if (!isNaN(Number(filter[0]))) {
      return `${
        spells
          .filter(spell => spell.level === Number(filter[0]))
          .map(spell => `- ${spell.name}, ${spell.level}`)
          .join('\n')
      }`
    }

    const spellName = filter.join(' ').toLowerCase()

    spell = spells.find(spell => spell.name.toLowerCase() === spellName)

    if (!spell) {
      return `Magia ${filter} non trovata`
    }
  } else {
    const spellName = args.join(' ').toLowerCase()
    spell = allSpells.find(spell => spell.name.toLowerCase() === spellName)

    if (!spell) {
      return 'Magia non trovata'
    }
  }

  return `<b>${spell.name}</b> (${spell.level})
<i>${spell.details}</i>
`
}
