---
title: "Spécifications générales"
description: "Deux cartes, un seul protocole de bridge."
summary: "L'architecture globale de calcul et de contrôle de Chromapi : carte mère STM32, Raspberry Pi, et répartition des rôles."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 10
toc: true
icon: "chromapi"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "L'architecture globale de calcul et de contrôle de Chromapi : carte mère STM32, Raspberry Pi, et répartition des rôles."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/specifications/general/"
   noindex: false
   robots: "index, follow"
---

Coming soon!

<script type="text/plain" hidden>
<p align="center">
    <img src="/chroma/images/chromapi/chromapi_motherboard.png" alt="Carte mère personnalisée de Chromapi" width="360" />
</p>

Chromapi répartit le contrôle entre deux cartes, reliées par un bridge UART personnalisé :

| Carte | Rôle |
| :--- | :--- |
| **STM32G431KBT6** (carte mère personnalisée) | Tâches temps réel : contrôle des servos, fusion de l'IMU, surveillance de l'alimentation |
| **Raspberry Pi 4 Model B** | Contrôle haut niveau, SDK Python et (à terme) vision |

Les deux communiquent via un protocole de bridge personnalisé à **1 Mbps** — voir
[Protocole de communication]({{</* relref "chromapi/documentation/protocol/" */>}}) pour le format des trames et le jeu
de commandes.

## Calcul

| Composant | Détail |
| :--- | :--- |
| MCU | STM32G431KBT6 (Arm Cortex-M4) |
| Ordinateur hôte | Raspberry Pi 4 Model B |
| Liaison inter-cartes | Protocole de bridge UART personnalisé, 1 Mbps |

## Logiciel

* Framework de contrôle, cinématique et utilitaires matériels : Python, dans
  [`chromapi`](https://github.com/Mowibox/chromapi)
* Firmware : projet généré par STM32Cube avec des pilotes écrits à la main, dans
  [`chromapi_motherboard`](https://github.com/Mowibox/chromapi_motherboard)

Pour le détail électrique, actionneurs, audio et capteurs, voir les autres pages de cette
section.
</script>
