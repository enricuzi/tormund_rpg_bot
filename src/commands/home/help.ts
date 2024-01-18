import { Command } from '../types'
import { ArmorType, AttributeType, WeaponType } from '../../engine/types'

export const help: Command = async (ctx) => {
  return `Manuale dei comandi:
  /start - Inizia il gioco

  /create <nome> <attributi>- Crea un nuovo personaggio
    Il nome [opzionale] e' il nome del personaggio.
    Gli attributi [opzionali] sono una lista di numeri nell'ordine ${AttributeType.Physic}, ${AttributeType.Mind}, ${AttributeType.Life}
    Example:
    - /create
    - /create Tormund
    - /create Tormund 5 6 9

  /equip <nome> <oggetti> - Equipaggia un personaggio con uno o piu' oggetti
    Il nome del personaggio da equipaggiare
    Il nome dell'oggetto da equipaggiare:
        Armi:
        - ${WeaponType.Bow}
        - ${WeaponType.Fist}
        - ${WeaponType.Globe}
        - ${WeaponType.Staff}
        - ${WeaponType.Sword}
        
        Armature:
        - ${ArmorType.Shield}
        - ${ArmorType.Light}
        - ${ArmorType.Medium}
        - ${ArmorType.Heavy}
    Example:
    - /equip Tormund ${WeaponType.Sword} ${ArmorType.Heavy}
        
  /unequip <nome> <oggetti> - Dequipaggia un personaggio con uno o piu' oggetti
    Example:
    - /unequip Tormund ${WeaponType.Sword}
  
  /replace <nome> <oggetto> <oggetto> - Sostituisce un oggetto con un altro equipaggiato da un personaggio
    Example:
    - /replace Tormund ${WeaponType.Sword} ${WeaponType.Bow}
  
  /attack <nome> <oggetto> - Il personaggio attacca con l'oggetto
    Example:
    - /attack Tormund ${WeaponType.Sword}
  
  /list <nome>- Lista i nomi dei personaggi oppure printa i dettagli di un personaggio
    Example:
    - /list
    - /list Tormund
  
  /guida - Questo messaggio
  `
}
