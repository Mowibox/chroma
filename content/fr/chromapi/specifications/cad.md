---
title: "Fichiers CAO"
description: "Le modèle 3D, le rendu du PCB et les maillages de simulation."
summary: "Où trouver la conception mécanique de Chromapi : le document Onshape public, les fichiers matériels KiCad et les modèles de simulation."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 60
toc: true
icon: "cube3D"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Où trouver la conception mécanique de Chromapi : le document Onshape public, les fichiers matériels KiCad et les modèles de simulation."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/specifications/cad/"
   noindex: false
   robots: "index, follow"
---

## Conception mécanique de Chromapi

<p align="center">
  <img src="/chroma/images/chromapi/chromapi.png" alt="Chromapi Assembly" class="w-full h-auto" />
</p>

L'assemblage complet de Chromapi est disponible via ce document Onshape :

👉 [Chromapi - Modèle 3D](https://cad.onshape.com/documents/3b2f6609101a115f427bb3a2/w/dda5699ddfe216cfbe74c22b/e/50bb405a7750d04ab1c412db?renderMode=0&uiState=6a7266a5caff22fc791d5f8b)

## Modèles de simulation

<p align="center">
  <img src="/chroma/images/chromapi/chromapi_mjcf.png" alt="Chromapi MuJoCo" class="w-full h-auto" />
</p>

Les modèles utilisés pour la simulation (URDF et MuJoCo/MJCF) sont dans le repository `chromapi`:

* Fichier URDF : [`src/chromapi/model/urdf`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/model/urdf)
* Fichier MJCF :[`src/chromapi/model/mjcf`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/model/mjcf)

## Carte mère (PCB)

<p align="center">
  <img src="/chroma/images/chromapi/chromapi_motherboard.png" alt="Chromapi Motherboard" class="w-full h-auto" />
</p>

Le fichier 3D du PCB se trouve dans le repository `chromapi_motherboard` :

👉 [`chromapi_motherboard/hardware/pcb_render`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/pcb_render)
