---
title: "Caractéristiques électriques"
description: "D'un pack 18650 à une carte mère qui fonctionne."
summary: "Source d'alimentation, charge, protection et régulation sur la carte mère de Chromapi : pack 2S 18650, charge USB-C et rails 5V/3.3V."
date: 2026-08-29
lastmod: 2026-09-25
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

## Batterie

Chromapi est alimenté avec deux cellules Li-ion 18650, logées dans un support en son sein.

| Propriété | Valeur |
| :--- | :--- |
| Cellules | 2 Molicel INR18650-P28A |
| Configuration | 2S (série) |
| Tension nominale | 7,2V |
| Plage de tension | 6,0V - 8,4V |
| Capacité | 2800 mAh |
| Énergie | ≈ 20 Wh |
| Courant de décharge max. (par cellule) | 35 A |

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Les cellules Li-ion peuvent être dangereuses en cas de court-circuit, de choc ou de décharge profonde. Utilisez des cellules de marque, et ne laissez jamais le robot charger sans surveillance.
{{< /callout >}}

## Charge et protection

Chromapi possède un port de charge USB-C, directement sur la carte mère. Cette dernière contient également un circuit de protection contre la décharge excessive, les surintensités et les courts-circuits (BMS), afin de préserver les batteries et limiter les risques. 

| Propriété | Valeur |
| :--- | :--- |
| Autonomie | h |
| Temps de charge | h |

## Mesure de puissance

La consommation du robot est mesurée en permanence par un INA226, placé juste après l'interrupteur d'alimentation.

| Propriété | Valeur |
| :--- | :--- |
| Composant | INA226 |
| Grandeurs mesurées | Tension, courant et puissance |
| Résistance de shunt | 2 mΩ |
| Courant max. mesurable | 8 A |
| Interface | I2C à 400 kHz (adresse `0x40`) |
| Fréquence de lecture | 10 Hz |

La tension actuelle qui traverse Chromapi est constamment affichée grâce à une LED de statut sur la carte mère.

## Régulation et distribution

| Rail | Régulateur | Type | Consommateurs |
| :--- | :--- | :--- | :--- |
| V_SYS (6,0 - 8,4V) | — | Tension batterie, après protection et mesure | Servomoteurs |
| +5V | TPS51388 | Régulateur à découpage (Buck), 600 kHz | Raspberry Pi, ventilateur, anneau de LEDs RGB |
| +3,3V | LD39050 | Régulateur linéaire (LDO), alimenté par le +5V | MCU STM32, IMU, capteur de puissance, amplificateur audio et microphone |

## Architecture d'alimentation

```mermaid
%%{init: {'themeVariables': {'edgeLabelBackground':'transparent'}}}%%
flowchart TD
    CHG[["Charge USB-C<br/>CN3302"]] -.->|"charge → B+ ≈ 7,2–8,4V"| CELLS[("Batterie<br/>18650 x2")]
    CELLS -->|"B+/BM/B-"| HY["HY2120<br/>Protection BMS"]
    HY -->|"B+"| SW[["Interrupteur"]]

    SW -->|"V_BATT ≈ 7,2–8,4V"| SHUNT[["Shunt INA226<br/>2mΩ"]]
    SHUNT -->|"V_SYS ≈ 7,2–8,4V"| REG5{{"Régulation de tension<br/>TPS51388 · Fsw=600kHz"}}
    SHUNT -->|"V_SYS"| SERVOS(["Servomoteurs x12<br/>Feetech STS3215-C001"])

    REG5 -->|"+5V"| RPI["Raspberry Pi"]
    REG5 -->|"+5V"| FANPWR(["Ventilateur<br/>Noctua NF-A4x10"])
    REG5 -->|"+5V"| LEDPWR(["LEDs RGB<br/>WS2812B"])
    REG5 -->|"+5V"| REG33{{"Régulation de tension<br/>LD39050 LDO"}}

    REG33 -->|"+3,3V"| MCU["MCU<br/>STM32G431KBT6"]
    REG33 -->|"+3,3V"| IMU["IMU<br/>BMI088"]
    REG33 -->|"+3,3V"| INA["Capteur de puissance<br/>INA226"]
    REG33 -->|"+3,3V"| AUDIO["Haut-parleur + Microphone<br/>MAX98357A / ICS-43434"]

    classDef power fill:#dd2757,color:#ffffff,stroke:none
    classDef voltreg fill:#ea684c,color:#ffffff,stroke:none
    classDef ic fill:#25b3ae,color:#ffffff,stroke:none
    classDef actuator fill:#c027e7,color:#ffffff,stroke:none
    classDef sensor fill:#5c5aed,color:#ffffff,stroke:none

    class CHG,CELLS,HY,SW power
    class REG5,REG33 voltreg
    class MCU,RPI,AUDIO ic
    class SERVOS,FANPWR,LEDPWR actuator
    class SHUNT,IMU,INA sensor
```

## Ressources

* Schémas électriques (PDF) : [`hardware/schematic_pdf`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/schematic_pdf)
* Fichiers de fabrication (Gerbers, BOM, CPL) : [`hardware/production`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/production)
* Composants de la carte mère : [Liste de matériel du PCB]({{< relref "chromapi/bom/pcb_bom/" >}})
