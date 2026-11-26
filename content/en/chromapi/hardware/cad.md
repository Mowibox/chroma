---
title: "CAD files"
aliases: ["/chromapi/specifications/cad/"]
description: "The 3D model, the PCB render, and the simulation meshes."
summary: "Where to find Chromapi's mechanical design: the public Onshape document, simulation models, and the motherboard's 3D render."
date: 2026-08-29
lastmod: 2026-11-08
draft: false
weight: 50
toc: true
icon: "cube3D"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Where to find Chromapi's mechanical design: the public Onshape document, simulation models, and the motherboard's 3D render."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

## Mechanical design

{{< chromapi3d cad >}}

The full Chromapi assembly is available through this Onshape document:

👉 [Chromapi - 3D model](https://cad.onshape.com/documents/3b2f6609101a115f427bb3a2/w/dda5699ddfe216cfbe74c22b/e/50bb405a7750d04ab1c412db?renderMode=0&uiState=6a7266a5caff22fc791d5f8b)

The models used for simulation (URDF and MuJoCo/MJCF) are in the `chromapi` repository:

* URDF file: [`src/chromapi/model/urdf`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/model/urdf)
* MJCF file: [`src/chromapi/model/mjcf`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/model/mjcf)

## Motherboard (PCB)

{{< chromapi3d pcb >}}

The PCB's 3D file is in the `chromapi_motherboard` repository:

👉 [`chromapi_motherboard/hardware/pcb_render`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/pcb_render)
