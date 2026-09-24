---
title: "General specifications"
description: "Two boards, one bridge protocol."
summary: "The overall compute and control architecture of Chromapi: STM32 motherboard, Raspberry Pi, and how they split responsibilities."
date: 2026-08-29
lastmod: 2026-09-25
draft: false
weight: 10
toc: true
icon: "chromapi"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "The overall compute and control architecture of Chromapi: STM32 motherboard, Raspberry Pi, and how they split responsibilities."
   canonical: "https://mowibox.github.io/chroma/en/chromapi/specifications/general/"
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img src="/chroma/gifs/chromapi_play.gif" alt="Chromapi Pool Play" />
</p>

## Key features

* 12-DoF quadruped robot: 4 legs with 3 DoF each
* 12 Feetech STS3215 serial servomotors on a single 1 Mbps bus
* Custom motherboard dedicated to real-time tasks: motor control, IMU and power management
* Onboard Raspberry Pi 4 for high-level control, vision and audio
* 2S 18650 battery, rechargeable over USB-C directly on the robot
* IMU, wide-angle camera and microphone for perception
* Speaker and 18-LED RGB ring for expressiveness
* Fully 3D-printable structure (PLA & TPU), weighing about 1.5 kg
* 100% open source: hardware, firmware and software

## Dimensions and weight

| Property | Value |
| :--- | :--- |
| Standing dimensions (L × W × H) | ≈ 40 × 35 × 15 cm |
| Total weight | ≈ 1.5 kg |
| Coxa segment length | 69 mm |
| Femur segment length | 68 mm |
| Tibia segment length | 112 mm |

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
These values are computed from the simulation model (URDF/MJCF) and from the CAD. They may differ slightly on the real robot depending on print settings and wiring.
{{< /callout >}}

## Compute

Chromapi splits control between two boards, linked by a custom UART bridge protocol at 1Mbps:

| Board | Role |
| :--- | :--- |
| STM32G431KBT6 (Arm Cortex-M4, custom motherboard) | Real-time tasks: servomotor control, IMU fusion, power monitoring, LED ring |
| Raspberry Pi 4 Model B | High-level control, locomotion, Python SDK, audio and vision |

## Software

| Components | Repository |
| :--- | :--- |
| Control framework, kinematics, locomotion and simulation models | [`chromapi`](https://github.com/Mowibox/chromapi) |
| Motherboard firmware and PCB design | [`chromapi_motherboard`](https://github.com/Mowibox/chromapi_motherboard) |
