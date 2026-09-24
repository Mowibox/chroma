---
title: "Spécifications générales"
description: "Deux cartes, un seul protocole de bridge."
summary: "L'architecture globale de calcul et de contrôle de Chromapi : carte mère STM32, Raspberry Pi, et répartition des rôles."
date: 2026-08-29
lastmod: 2026-09-25
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

<p align="center">
    <img src="/chroma/gifs/chromapi_play.gif" alt="Chromapi Pool Play" />
</p>

## Caractéristiques clés

* Robot quadrupède à 12 degrés de liberté : 4 pattes de 3 DoF
* 12 servomoteurs série Feetech STS3215 sur un bus unique à 1 Mbps
* Carte mère personnalisée dédiée au temps réel : contrôle moteur, IMU et gestion de l'alimentation
* Raspberry Pi 4 embarquée pour le contrôle haut niveau, la vision et l'audio
* Batterie 2S 18650 rechargeable en USB-C directement sur le robot
* IMU, caméra grand-angle et microphone pour la perception
* Haut-parleur et anneau de 18 LEDs RGB pour l'expressivité
* Structure entièrement imprimable en 3D (PLA & TPU), poids d'environ 1,5 kg
* 100 % open source : matériel, firmware et logiciel

## Dimensions et masse

| Propriété | Valeur |
| :--- | :--- |
| Dimensions en position debout (L × l × h) | ≈ 40 × 35 × 15 cm |
| Masse totale | ≈ 1,5 kg |
| Longueur d'un segment coxa | 69 mm |
| Longueur d'un segment fémur | 68 mm |
| Longueur d'un segment tibia | 112 mm |

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Ces valeurs sont calculées à partir du modèle de simulation (URDF/MJCF), ainsi que de la CAO. Elles peuvent légèrement différer sur le robot réel selon les réglages d'impression et le câblage.
{{< /callout >}}

## Calcul

Chromapi répartit le contrôle entre deux cartes, reliées par un protocole de bridge UART personnalisé à 1Mbps :

| Carte | Rôle |
| :--- | :--- |
| STM32G431KBT6 (Arm Cortex-M4, carte mère personnalisée) | Tâches temps réel : contrôle des servomoteurs, fusion de l'IMU, surveillance de l'alimentation, anneau de LEDs |
| Raspberry Pi 4 Model B | Contrôle haut niveau, locomotion, SDK Python, audio et vision |

## Logiciels

| Composants | Dépôt |
| :--- | :--- |
| Framework de contrôle, cinématique, locomotion et modèles de simulation | [`chromapi`](https://github.com/Mowibox/chromapi) |
| Firmware de la carte mère et conception du PCB | [`chromapi_motherboard`](https://github.com/Mowibox/chromapi_motherboard) |
