---
title: "Actuators specifications"
description: "12 servomotors on a shared RS485 bus."
summary: "Chromapi's 12 Feetech STS3215-C001 servomotors, the RS485 bus wiring between them, and the servo polling rate."
date: 2026-08-29
lastmod: 2026-09-25
draft: false
weight: 30
toc: true
icon: "circuit-motor"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Chromapi's 12 Feetech STS3215-C001 servomotors, the RS485 bus wiring between them, and the servo polling rate."
   canonical: "https://mowibox.github.io/chroma/en/chromapi/specifications/actuators/"
   noindex: false
   robots: "index, follow"
---

## Servomotors

| Property | Value |
| :--- | :--- |
| Model | Feetech STS3215-C001 (7.4V version) |
| Quantity | 12 |
| Supply voltage | ≈ 6.0-8.4V |
| Gear ratio | 1:345 |
| Stall torque | 19.5 kg.cm at 7.4V |
| No-load speed | 0.22 s/60° at 7.4V |
| Weight | 55 g |
| Position sensor | 12-bit magnetic encoder (4096 steps/rev, ≈ 0.088°/step) |
| Available feedback | Position, speed, load, voltage, temperature |

{{< callout context="tip" title="Tip" icon="outline/bulb" >}}
Chromapi's architecture is permissive enough to use the 12V version of the STS3215 if you need more torque, provided the power supply is adapted accordingly.
{{< /callout >}}

## Leg layout

Each of Chromapi's legs has three joints, named according to the convention below:

| Joint | Name | Axis | Range of motion |
| :--- | :--- | :--- | :--- |
| Hip | coxa (`*_1`) | Yaw | ±70° |
| Hip | femur (`*_2`) | Pitch | ±90° |
| Knee | tibia (`*_3`) | Pitch | ±90° |

Servomotor IDs on the bus are assigned leg by leg:

| Leg | Coxa | Femur | Tibia |
| :--- | :---: | :---: | :---: |
| `tl` (front left) | 1 | 2 | 3 |
| `bl` (back left) | 4 | 5 | 6 |
| `br` (back right) | 7 | 8 | 9 |
| `tr` (front right) | 10 | 11 | 12 |

## Communication bus

| Property | Value |
| :--- | :--- |
| Bus type | Half-duplex serial (Feetech protocol) |
| Baud rate | 1 Mbps |
| Reading rate | 200 Hz (synchronized read of the 12 servomotors) |

The STM32 polls the 12 servomotors with a single synchronized read frame, then sends their state back to the Raspberry Pi. Commands sent by the Raspberry Pi are re-encoded into Feetech frames and relayed on the bus: see the [communication protocol]({{< relref "chromapi/documentation/protocol/" >}}) for more details on how communication works.

## Resources

* Firmware driver: [`sts3215_hal.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/sts3215_hal.c), [`sts3215_protocol.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/sts3215_protocol.c) and [`sts3215_regs.h`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Inc/sts3215_regs.h)
