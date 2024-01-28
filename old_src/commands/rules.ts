import { ArmorType, AttributeType, Command, WeaponType } from '../types'

export const rules: Command = async () => {
  return `Regole di gioco:
  <b>ATTRIBUTI</b>
  GLi attributi di un personaggio sono un numero da 1 a 10 e il loro valore contribuisce alle azioni associate
  - <i>${AttributeType.Physic}</i>: Azioni di forza, agilita', e resistenza ai danni
  - <i>${AttributeType.Mind}</i>: Azioni di intelletto, magia, e influenza mentale
  - <i>${AttributeType.Life}</i>: Punti vita del personaggio
  
  <b>EQUIPAGGIAMENTO</b>
  Ogni personaggio puo' indossare:
  - 1 arma e mano libera
  - 2 armi, una per mano
  - 1 arma e 1 scudo
  - 1 armatura, indipendentemente dalle armi
  
  <i>Armi</>
  - ${WeaponType.Bow}:
    Danno: 5
    Attributo: ${AttributeType.Physic}
    Mani: 2
  - ${WeaponType.Sword}:
    Danno: 8
    Attributo: ${AttributeType.Physic}
    ManiL 1 o 2
  - ${WeaponType.Fist}:
    Danno: 3
    Attributo: ${AttributeType.Physic}
    ManiL 1 o 2
  - ${WeaponType.Staff}:
    Danno: 7
    Attributo: ${AttributeType.Mind}
    Mani: 2
  - ${WeaponType.Globe}:
    Danno: 4
    Attributo: ${AttributeType.Mind}
    Mani: 1
    
  <i>Armature</i>
  - ${ArmorType.Shield}:
    Difesa: 2
    Attributo: ${AttributeType.Physic}
    Mani: 1
  - ${ArmorType.Light}:
    Difesa: 2
    Attributo: ${AttributeType.Physic}/${AttributeType.Mind}
    Mani: -
  - ${ArmorType.Medium}:
    Difesa: 4
    Attributo: ${AttributeType.Physic}/${AttributeType.Mind}
    Mani: 1
  - ${ArmorType.Heavy}:
    Difesa: 8
    Attributo: ${AttributeType.Physic}
    Mani: 1
  `
}
