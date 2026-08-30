---
title: "Capteurs, audio & périphériques"
description: "IMU, caméra, LEDs, ventilateur — tout ce qui capte ou affiche."
summary: "L'IMU, les contacteurs de pied, la caméra grand-angle, l'audio I2S, l'anneau de LEDs RGB et le ventilateur de Chromapi, avec leurs interfaces."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 40
toc: true
icon: "device-imac-cog"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "L'IMU, les contacteurs de pied, la caméra grand-angle, l'audio I2S, l'anneau de LEDs RGB et le ventilateur de Chromapi, avec leurs interfaces."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/specifications/sensors/"
   noindex: false
   robots: "index, follow"
---

Coming soon!

<script type="text/plain" hidden>
## Centrale inertielle (IMU)

| Propriété | Valeur |
| :--- | :--- |
| Modèle | BMI088 |
| Interface | SPI @ 5 MHz |
| Filtre de fusion | Filtre de Mahony, à 100 Hz |
| Sortie | Accélération, vitesse angulaire et quaternion d'orientation |

## Détection de contact au sol

Quatre contacteurs de pied (microswitches) détectent le contact au sol, utilisés pour le
timing de la démarche.

## Caméra

| Propriété | Valeur |
| :--- | :--- |
| Modèle | IMX219-D160 (grand-angle) |
| Interface | CSI-2, directement au Raspberry Pi |

## Audio

Chromapi dispose d'un haut-parleur et d'un microphone, pilotés en **I2S** depuis le
Raspberry Pi.

| Fonction | Composant | Interface |
| :--- | :--- | :--- |
| Amplificateur du haut-parleur | MAX98357A | I2S |
| Microphone | ICS-43434 (MEMS) | I2S |

Le traitement audio (mot de réveil, classification sonore, ou sortie vocale au-delà des
pilotes actuels) fait partie de la feuille de route [RL playground]({{</* relref "chromapi/#feuille-de-route" */>}})
et n'est pas encore implémenté.

## Anneau de LEDs RGB

| Propriété | Valeur |
| :--- | :--- |
| Modèle | WS2812B |
| Piloté depuis | STM32, PWM + DMA @ 800 kHz |
| Adaptation de niveau | SN74AHCT1G125 (3,3V → 5V) |

## Refroidissement

Un ventilateur Noctua NF-A4x10 est piloté par le Raspberry Pi en PWM, avec retour tachymétrique.

Source : README de
[`chromapi_motherboard`](https://github.com/Mowibox/chromapi_motherboard)
("The Senses & Balance" et "The Voice & Expression"), firmware (`bmi088.c`, `mahony.c`,
`ws2812b.c`), et `src/chromapi/assets/chromapi_scream.wav` dans le dépôt
[`chromapi`](https://github.com/Mowibox/chromapi) pour un exemple de son embarqué.
</script>
