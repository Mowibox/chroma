---
title: "Spécifications des actionneurs"
description: "12 servomoteurs sur un même bus RS485."
summary: "Les 12 servomoteurs Feetech STS3215-C001 de Chromapi, le câblage du bus RS485 et la fréquence de lecture."
date: 2026-08-29
lastmod: 2026-09-25
draft: false
weight: 30
toc: true
icon: "circuit-motor"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Les 12 servomoteurs Feetech STS3215-C001 de Chromapi, le câblage du bus RS485, et la fréquence de lecture des positions."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/specifications/actuators/"
   noindex: false
   robots: "index, follow"
---

## Servomoteurs

| Propriété | Valeur |
| :--- | :--- |
| Modèle | Feetech STS3215-C001 (version 7,4V) |
| Quantité | 12 |
| Tension d'alimentation | ≈ 6,0-8,4V |
| Rapport de réduction | 1:345 |
| Couple de blocage | 19,5 kg.cm à 7,4V |
| Vitesse à vide | 0,22 s/60° à 7,4V |
| Poids | 55 g |
| Capteur de position | Encodeur magnétique 12 bits (4096 pas/tour, ≈ 0,088°/pas) |
| Retours disponibles | Position, vitesse, charge, tension, température |

{{< callout context="tip" title="Astuce" icon="outline/bulb" >}}
L'architecture de Chromapi est assez permissive pour utiliser la version 12V du STS3215 si vous avez besoin de plus de couple, à condition d'adapter l'alimentation en conséquence.
{{< /callout >}}

## Répartition sur les pattes

Chaque patte de Chromapi comporte trois articulations, nommées selon la convention utilisée ci-dessous :

| Articulation | Nom | Axe | Plage de mouvement |
| :--- | :--- | :--- | :--- |
| Hanche | coxa (`*_1`) | Lacet | ±70° |
| Hanche | fémur (`*_2`) | Tangage | ±90° |
| Genou | tibia (`*_3`) | Tangage | ±90° |

Les identifiants des servomoteurs sur le bus sont attribués patte par patte :

| Patte | Coxa | Fémur | Tibia |
| :--- | :---: | :---: | :---: |
| `tl` (avant gauche) | 1 | 2 | 3 |
| `bl` (arrière gauche) | 4 | 5 | 6 |
| `br` (arrière droite) | 7 | 8 | 9 |
| `tr` (avant droite) | 10 | 11 | 12 |

## Bus de communication

| Propriété | Valeur |
| :--- | :--- |
| Type de bus | Série half-duplex (protocole Feetech) |
| Débit | 1 Mbps |
| Fréquence de lecture | 200 Hz (lecture synchronisée des 12 servomoteurs) |

Le STM32 interroge les 12 servomoteurs en une seule trame de lecture synchronisée, puis renvoie leur état au Raspberry Pi. Les commandes envoyées par le Raspberry Pi sont réencodées en trames Feetech et relayées sur le bus : voir le [protocole de communication]({{< relref "chromapi/documentation/protocol/" >}}) pour plus de détails sur le fonctionnement de la communication.

## Ressources

* Pilote firmware : [`sts3215_hal.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/sts3215_hal.c), [`sts3215_protocol.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/sts3215_protocol.c) et [`sts3215_regs.h`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Inc/sts3215_regs.h)
