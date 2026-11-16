---
title: "Liste de matériel du PCB"
description: "Chaque composant de la carte mère, généré depuis KiCad."
summary: "Liste de matériel interactive de la carte mère Chromapi : composants, références fabricant, fiches techniques et informations d'approvisionnement."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 70
toc: true
icon: "chip"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Liste de matériel interactive de la carte mère Chromapi : composants, références fabricant, fiches techniques et informations d'approvisionnement."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/bom/pcb_bom/"
   noindex: false
   robots: "index, follow"
---

## Tableau détaillé (BOM)

Le tableau ci-dessous liste chaque composant de la [carte mère de Chromapi](https://github.com/Mowibox/chromapi_motherboard).

| Désignateur | Qté | Description | Numéro de référence (MPN) | Fabricant |
| :--- | :--- | :--- | :--- | :--- |
| C1, C4, C7, C11, C31, C32, C35, C36, C37, C38, C39, C40 | 12 | CAP, CERM, 100nF, 50V, ±10%, X7R, 0603 | CC0603KRX7R9BB104 | YAGEO |
| C2, C3, C20, C21, C22, C23, C24, C27, C28, C29, C42 | 11 | CAP, CERM, 100nF, 50V, ±10%, X7R, 0402 | CL05B104KB54PNC | Samsung Electro-Mechanics |
| C5, C6 | 2 | CAP, électrolytique alu., 22µF, 16V, ±20%, 5x5.8mm | EEEHB1C220R | Panasonic |
| C8, C9, C10 | 3 | CAP, CERM, 22µF, 25V, ±10%, X5R, 1206 | CL31A226KAHNNNE | Samsung Electro-Mechanics |
| C12 | 1 | CAP, CERM, 2.2µF, 16V, ±10%, X5R, 0603 | CL10A225KO8NNNC | Samsung Electro-Mechanics |
| C13, C14, C15, C16 | 4 | CAP, CERM, 22µF, 25V, ±20%, X5R, 0805 | CL21A226MAQNNNE | Samsung Electro-Mechanics |
| C17 | 1 | CAP, CERM, 470pF, 50V, ±5%, C0G/NP0, 0603 | CC0603JRNPO9BN471 | YAGEO |
| C18, C19, C26 | 3 | CAP, CERM, 1µF, 50V, ±10%, X5R, 0603 | CL10A105KB8NNNC | Samsung Electro-Mechanics |
| C25, C30, C41 | 3 | CAP, CERM, 10µF, 25V, ±10%, X5R, 0805 | CL21A106KAYNNNE | Samsung Electro-Mechanics |
| C33, C34 | 2 | CAP, CERM, 220pF, 50V, ±10%, X7R, 0603 | CL10B221KB8NNNC | Samsung Electro-Mechanics |
| D1, D2 | 2 | Diode, Schottky, 40V, 3A, SMA | [SS34](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/ss34.pdf) | MDD |
| D3 | 1 | LED, rouge, 0603 | KT-0603R | Hubei KENTO Elec |
| D4 | 1 | LED, vert émeraude, 0603 | KT-0603G | Hubei KENTO Elec |
| D5 | 1 | LED, bleu, 0603 | KT-0603B | Hubei KENTO Elec |
| D6 | 1 | LED RGB adressable, 800kbit/s, SMD 2.2x2mm | [WS2812B-2020](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/WS2812B-2020_V10_EN_181106150240761.pdf) | Worldsemi |
| FB1, FB2, FB3 | 3 | Perle de ferrite, 330Ω @ 100MHz, 2.5A, 0805 | MPZ2012S331AT000 | TDK |
| L1 | 1 | Inductance, 4.7µH, 5.5A, DCR 40mΩ, SMD | IHLP2525CZER4R7M01 | Vishay |
| L2 | 1 | Inductance, 1.5µH, 14A, ±20%, DCR 5.3mΩ, taille 1040 | 7443552150 | Würth Elektronik |
| MK1 | 1 | Microphone MEMS, I2S 24 bits, LGA-6 | [ICS-43434](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/DS-000069-ICS-43434-v1.2.pdf) | TDK InvenSense |
| Q1, Q2 | 2 | MOSFET canal N, 30V, 101A, VSON-8 | [CSD17581Q3A](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/csd17581q3a.pdf) | Texas Instruments |
| Q3 | 1 | MOSFET canal P, 30V, 12A, SOP-8 | [AO4435](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/AO4435.pdf) | UMW |
| Q4 | 1 | MOSFET canal N, 30V, 10.5A, SOIC-8 | [AO4468](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/AO4468.pdf) | Alpha & Omega Semiconductor |
| R1, R4, R26 | 3 | RES, 330Ω, ±1%, 62.5mW, 0402 | 0402WGF3300TCE | UNI-ROYAL |
| R2, R3, R23, R24, R28, R29, R32, R33, R34, R35 | 10 | RES, 10kΩ, ±1%, 62.5mW, 0402 | 0402WGF1002TCE | UNI-ROYAL |
| R5, R8, R14, R16 | 4 | RES, 0Ω (pont), ±1%, 100mW, 0603 | 0603WAF0000T5E | UNI-ROYAL |
| R6 | 1 | RES, shunt de mesure, 2mΩ, ±1%, 2W, 2512 | HoYLR2512-2W-2mR-1% | Milliohm |
| R7 | 1 | RES, 2kΩ, ±1%, 62.5mW, 0402 | 0402WGF2001TCE | UNI-ROYAL |
| R9 | 1 | RES, shunt de mesure, 60mΩ, ±1%, 250mW, 1206 | RL1206FR-070R06L | YAGEO |
| R10, R11 | 2 | RES, 5.1kΩ, ±1%, 100mW, 0603 | 0603WAF5101T5E | UNI-ROYAL |
| R12, R13, R17, R22, R36 | 5 | RES, 1kΩ, ±1%, 100mW, 0603 | 0603WAF1001T5E | UNI-ROYAL |
| R15, R19, R30 | 3 | RES, 100kΩ, ±1%, 100mW, 0603 | 0603WAF1003T5E | UNI-ROYAL |
| R18 | 1 | RES, 137kΩ, ±1%, 100mW, 0603 | 0603WAF1373T5E | UNI-ROYAL |
| R20 | 1 | RES, 18.2kΩ, ±1%, 100mW, 0603 | RC0603FR-0718K2L | YAGEO |
| R21 | 1 | RES, 68kΩ, ±1%, 100mW, 0603 | CRCW060368K0FKEA | Vishay |
| R25, R27 | 2 | RES, 100Ω, ±1%, 62.5mW, 0402 | 0402WGF1000TCE | UNI-ROYAL |
| R31 | 1 | RES, 1MΩ, ±1%, 62.5mW, 0402 | 0402WGF1004TCE | UNI-ROYAL |
| U1 | 1 | IC, protection batterie Li-ion 2S, SOT-23-6 | [HY2120-CB](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/DS-HY2120_EN.pdf) | HYCON |
| U2 | 1 | IC, moniteur de puissance I2C, VSSOP-10 | [INA226AQDGSRQ1](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/ina226.pdf) | Texas Instruments |
| U3 | 1 | IC, contrôleur de charge Li-ion, SOP-8 | [CN3302](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/CN3302.pdf) | Consonance |
| U4 | 1 | IC, convertisseur buck synchrone 12A, VQFN-HR-13 | [TPS513885VABR](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/tps51388.pdf) | Texas Instruments |
| U5 | 1 | IC, régulateur LDO 3.3V, DFN-6 | [LD39050PU33R](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/ld39050.pdf) | STMicroelectronics |
| U6 | 1 | IC, buffer logique 3 états, SOT-23-5 | [SN74LVC1G126DBVR](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/sn74lvc1g126.pdf) | Texas Instruments |
| U7 | 1 | MCU, ARM Cortex-M4F, 170MHz, LQFP-32 | [STM32G431KBT6](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/stm32g431kb.pdf) | STMicroelectronics |
| U8 | 1 | IC, buffer logique 3 états, SOT-23-5 | [SN74AHCT1G125DBVR](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/sn74ahct1g125.pdf) | Texas Instruments |
| U9 | 1 | IC, buffer logique 3 états, SOT-23-5 | [SN74LVC1G125DBVR](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/sn74lvc1g125.pdf) | Texas Instruments |
| U10 | 1 | IC, amplificateur audio classe D I2S, TQFN-16 | [MAX98357AETE+T](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/max98357a-max98357b.pdf) | Maxim |
| U11 | 1 | IMU 6 axes (accéléromètre + gyroscope), SPI/I2C, LGA-16 | [BMI088](https://github.com/Mowibox/chromapi_motherboard/blob/main/docs/datasheets/bst-bmi088-ds001.pdf) | Bosch |

{{< callout context="note" title="Substitutions" icon="outline/info-circle" >}}
Sauf indication contraire, toutes les pièces peuvent être remplacées par des composants équivalents.
{{< /callout >}}

Les fichiers de fabrication complets (gerbers, fichiers de perçage, CPL) se trouvent dans
[`chromapi_motherboard/hardware/production`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/production).

## Visualisation interactive (iBOM)

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
La visualisation interactive est meilleure sur ordinateur. Cliquez sur une ligne pour surligner le composant correspondant sur la carte.
{{< /callout >}}

<iframe
  src="/chroma/chromapi/ibom.html"
  title="BOM interactive de la carte mère Chromapi"
  style="width: 100%; height: 90vh; border: 1px solid var(--bs-border-color, #dee2e6); border-radius: 0.5rem;"
  loading="lazy">
</iframe>
