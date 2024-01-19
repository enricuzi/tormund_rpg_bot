import {
  ArmorType,
  AttributeType,
  Command,
  CommandType,
  WeaponType
} from '../../engine'

export const help: Command = async (ctx) => {
  return `Manuale dei comandi:
  ${CommandType.Start} - Inizia il gioco

  ${CommandType.Create} [nome] [attributi]- Crea un nuovo personaggio
    Il nome [opzionale] e' il nome del personaggio.
    Gli attributi [opzionali] sono una lista di numeri nell'ordine ${AttributeType.Physic}, ${AttributeType.Mind}, ${AttributeType.Life}
    Example:
    - /create
    - /create Tormund
    - /create Tormund 5 6 9

  ${CommandType.Equip} [nome] [oggetti] - Equipaggia un personaggio con uno o piu' oggetti
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
        
  ${CommandType.Unequip} [nome] [oggetti] - Dequipaggia un personaggio con uno o piu' oggetti
    Example:
    - /unequip Tormund ${WeaponType.Sword}
  
  ${CommandType.Replace} [nome] [oggetto] [oggetto] - Sostituisce un oggetto con un altro equipaggiato da un personaggio
    Example:
    - /replace Tormund ${WeaponType.Sword} ${WeaponType.Bow}
  
  ${CommandType.Attack} [nome] [oggetto] - Il personaggio attacca con l'oggetto
    Example:
    - /attack Tormund ${WeaponType.Sword}
  
  ${CommandType.List} [nome]- Lista i nomi dei personaggi oppure printa i dettagli di un personaggio
    Example:
    - /list
    - /list Tormund
  
  /guida - Questo messaggio
  `
}
