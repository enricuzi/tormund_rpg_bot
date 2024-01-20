import {
  ArmorType,
  AttributeType,
  Command,
  CommandType,
  WeaponType
} from '../../types'

export const help: Command = async () => {
  return [`Manuale dei comandi:
  ${CommandType.Start} - Inizia il gioco

  ${CommandType.Create} [nome] [attributi]- Crea un nuovo personaggio
    Il nome [opzionale] e' il nome del personaggio.
    Gli attributi [opzionali] sono una lista di numeri nell'ordine ${AttributeType.Physic}, ${AttributeType.Mind}, ${AttributeType.Life}
    Example:
    - ${CommandType.Create}
    - ${CommandType.Create} Tormund
    - ${CommandType.Create} Tormund 5 6 9

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
    - ${CommandType.Equip} Tormund ${WeaponType.Sword} ${ArmorType.Heavy}
        
  ${CommandType.Unequip} [nome] [oggetti] - Dequipaggia un personaggio con uno o piu' oggetti
    Example:
    - ${CommandType.Unequip} Tormund ${WeaponType.Sword}
  
  ${CommandType.Replace} [nome] [oggetto] [oggetto] - Sostituisce un oggetto con un altro equipaggiato da un personaggio
    Example:
    - ${CommandType.Replace} Tormund ${WeaponType.Sword} ${WeaponType.Bow}
  
  ${CommandType.Swap} [nome] - Inverte gli oggetti nelle mani del personaggio. Lo scudo non puo' essere invertito
    Example:
    - ${CommandType.Swap} Tormund
  
  ${CommandType.Attack} [nome] - Il personaggio attacca con l'equipaggiamento attivo
    Example:
    - ${CommandType.Attack} Tormund
  
  ${CommandType.Defend} [nome] [attacco del mostro] [tipo di attacco] - Il personaggio difende con l'equipaggiamento attivo rispetto ai danni ricevuti e sul tipo di attacco.
  Il tipo di attacco di default e' "fisico"
    Example:
    - ${CommandType.Defend} Tormund
    - ${CommandType.Defend} Tormund 12
    - ${CommandType.Defend} Tormund 12 mente
  
  ${CommandType.Level} [nome] [attributo] [valore] - Setta un attributo o ne aggiunge una quantita' per un personaggio
    Example:
    - ${CommandType.Level} Tormund fisico 12
    - ${CommandType.Level} Tormund fisico +3
  
  ${CommandType.List} [nome] - Lista i nomi dei personaggi oppure printa i dettagli di un personaggio
    Example:
    - ${CommandType.List}
    - ${CommandType.List} Tormund
  
  ${CommandType.Describe} [nome] [testo]- Aggiungi un contenuto testuale al personaggio o mostra il testo
    Example:
    - ${CommandType.List} Tormund
    - ${CommandType.List} Tormund qui si fa sul serio!
  
  ${CommandType.Rules} - Mostra le regole di gioco del bot

  ${CommandType.Help} - Questo messaggio
  `, []]
}
