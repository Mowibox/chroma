---
title: "Spécifications des actionneurs"
description: "12 servomoteurs sur un même bus RS485."
summary: "Les 12 servomoteurs Feetech STS3215-C001 de Chromapi, le câblage du bus RS485 et la fréquence de scrutation."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 30
toc: true
icon: "circuit-motor"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Les 12 servomoteurs Feetech STS3215-C001 de Chromapi, le câblage du bus RS485, et la fréquence de scrutation des positions."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/specifications/actuators/"
   noindex: false
   robots: "index, follow"
---

Coming soon!

<script type="text/plain" hidden>
## Servomoteurs

Chromapi utilise **12 servomoteurs série Feetech STS3215-C001** — 3 par patte (coxa, femur,
tibia), reprenant la nomenclature utilisée dans toute la CAO et les modèles de simulation.

| Propriété | Valeur |
| :--- | :--- |
| Modèle | Feetech STS3215-C001 |
| Quantité | 12 (3 par patte × 4 pattes) |
| Bus | RS485 half-duplex |
| Vitesse du bus | 1 Mbps (USART2 sur le STM32) |
| Fréquence de scrutation | 200 Hz |

## Interface du bus

Le bus RS485 half-duplex est bufferisé par deux circuits logiques sur la carte mère :

| Composant | Rôle |
| :--- | :--- |
| SN74LVC1G126 | Buffer de bus |
| SN74LVC1G125 | Buffer de bus |

Le firmware STM32 scrute les positions des 12 servos à 200 Hz et les renvoie au Raspberry Pi
dans la trame `STATE_FEEDBACK` — voir les pages [cheatsheet]({{</* relref "chromapi/documentation/cheatsheet/" */>}})
et [protocole de communication]({{</* relref "chromapi/documentation/protocol/" */>}}) pour le détail des octets, et
[Repères & cinématique]({{</* relref "chromapi/documentation/kinematics/" */>}}) pour la convention de nommage des
pattes (coxa/femur/tibia).

Source : README de
[`chromapi_motherboard`](https://github.com/Mowibox/chromapi_motherboard) ("The Muscles") et
firmware (`sts3215_hal.c`, `sts3215_protocol.c`, `sts3215_regs.h`).
</script>
