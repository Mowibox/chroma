---
title: "Fichiers CAO"
slug: "cao"
aliases: ["/chromapi/specifications/cad/"]
description: "Le modèle 3D, le rendu du PCB et les maillages de simulation."
summary: "Où trouver la conception mécanique de Chromapi : le document Onshape public, les fichiers matériels KiCad et les modèles de simulation."
date: 2026-08-29
lastmod: 2026-11-08
draft: false
weight: 50
toc: true
icon: "cube3D"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Où trouver la conception mécanique de Chromapi : le document Onshape public, les fichiers matériels KiCad et les modèles de simulation."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

## Conception mécanique de Chromapi

{{< chromapi3d cad >}}

L'assemblage complet de Chromapi est disponible via ce document Onshape :

👉 [Chromapi - Modèle 3D](https://cad.onshape.com/documents/3b2f6609101a115f427bb3a2/w/dda5699ddfe216cfbe74c22b/e/50bb405a7750d04ab1c412db?renderMode=0&uiState=6a7266a5caff22fc791d5f8b)

Les modèles utilisés pour la simulation (URDF et MuJoCo/MJCF) sont dans le repository `chromapi`:

* Fichier URDF : [`src/chromapi/model/urdf`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/model/urdf)
* Fichier MJCF :[`src/chromapi/model/mjcf`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/model/mjcf)

## Carte mère (PCB)

{{< chromapi3d pcb >}}

Le fichier 3D du PCB se trouve dans le repository `chromapi_motherboard` :

👉 [`chromapi_motherboard/hardware/pcb_render`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/pcb_render)
