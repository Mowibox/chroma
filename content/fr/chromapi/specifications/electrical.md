---
title: "Caractéristiques électriques"
description: "D'un pack 18650 à une carte mère qui fonctionne."
summary: "Source d'alimentation, charge, protection et régulation sur la carte mère de Chromapi : pack 2S 18650, charge USB-C et rails 5V/3.3V."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 20
toc: true
icon: "battery"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Source d'alimentation, charge, protection et régulation sur la carte mère de Chromapi : pack 2S 18650, charge USB-C et rails 5V/3.3V."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/specifications/electrical/"
   noindex: false
   robots: "index, follow"
---

Coming soon!

<script type="text/plain" hidden>
## Source d'alimentation

Chromapi fonctionne sur un **pack 2S de cellules Li-ion 18650** (≈ 7,2–8,4V).

| Fonction | Composant | Notes |
| :--- | :--- | :--- |
| Charge USB-C | CN3302 | Charge les deux cellules 18650 via USB-C |
| Protection batterie | HY2120 | Protection contre décharge excessive, surintensité et court-circuit |
| Surveillance de puissance | INA226 | Mesure tension, courant et puissance via I2C @ 400 kHz |

## Régulation de tension

| Rail | Régulateur | Notes |
| :--- | :--- | :--- |
| +5V | TPS51388 | Régulateur à découpage, fréquence de commutation 600 kHz |
| +3.3V | LD39050 | Régulateur linéaire (LDO) |

## Ce qui fonctionne sur chaque rail

| Rail | Consommateurs |
| :--- | :--- |
| V_SYS (batterie, ≈ 7,2–8,4V) | Servomoteurs (via le bus RS485) |
| +5V | Raspberry Pi, ventilateur, anneau de LEDs RGB |
| +3.3V | MCU STM32, IMU, capteur de puissance, codecs audio |

Cet arbre d'alimentation est détaillé, avec le diagramme correspondant, dans
[Notes de conception → Architecture d'alimentation]({{</* relref "chromapi/design/power_architecture/" */>}}).

Source : README et schémas de
[`chromapi_motherboard`](https://github.com/Mowibox/chromapi_motherboard)
(`hardware/voltage_regulation.kicad_sch`, `hardware/pwr_supply_charge.kicad_sch`).
</script>
