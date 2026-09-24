---
title: "Sensors & peripherals"
description: "IMU, camera, LEDs, fan: everything that senses or shows."
summary: "Chromapi's IMU, foot contact switches, wide-angle camera, RGB LED ring, and cooling fan, with their interfaces."
date: 2026-08-29
lastmod: 2026-09-25
draft: false
weight: 40
toc: true
icon: "device-imac-cog"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Chromapi's IMU, foot contact switches, wide-angle camera, RGB LED ring, and cooling fan, with their interfaces."
   canonical: "https://mowibox.github.io/chroma/en/chromapi/specifications/sensors/"
   noindex: false
   robots: "index, follow"
---

This page lists all the sensors and peripherals embedded in Chromapi.

## Overview

| Peripheral | Component | Interface | Handled by |
| :--- | :--- | :--- | :--- |
| Inertial measurement unit (IMU) | BMI088 | SPI at 5 MHz | Motherboard |
| Power monitoring | INA226 | I2C at 400 kHz | Motherboard |
| LED ring | WS2812B | PWM + DMA at 800 kHz | Motherboard |
| Wide-angle camera | IMX219-D160 | CSI-2 | Raspberry Pi |
| Speaker | MAX98357A | I2S | Raspberry Pi |
| Microphone | ICS-43434 | I2S | Raspberry Pi |
| Fan | Noctua NF-A4x10 PWM | PWM + tachometer | Raspberry Pi |

## Inertial measurement unit (IMU)

| Property | Value |
| :--- | :--- |
| Model | Bosch BMI088 (3-axis accelerometer + gyroscope) |
| Interface | SPI at 5 MHz |
| Accelerometer range | ±3 g |
| Gyroscope range | ±1000 °/s |
| Sampling rate | 400 Hz |
| Fusion filter | Mahony filter at 100 Hz |
| Output | Acceleration, angular velocity and orientation (quaternion) |

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
At startup, the Mahony filter calibrates the accelerometer and gyroscope biases over 500 samples: the robot must therefore stay still during initialization.
{{< /callout >}}

## Camera

| Property | Value |
| :--- | :--- |
| Model | Waveshare IMX219-D160 |
| Sensor | Sony IMX219 (8 MP) |
| Field of view | 160° (wide-angle, fisheye lens) |
| Interface | CSI-2 |

## Audio

| Function | Component | Details |
| :--- | :--- | :--- |
| Amplifier | MAX98357A | I2S class-D amplifier |
| Speaker | Xevtrak 4R3W | 4Ω, 3W |
| Microphone | ICS-43434 | I2S digital MEMS microphone |

## RGB LED ring

| Property | Value |
| :--- | :--- |
| Model | WS2812B COB Pixel Ring |
| Number of LEDs | 18 |
| Diameter | 27 mm |
| Driven by | STM32, PWM + DMA at 800 kHz |

## Cooling

| Property | Value |
| :--- | :--- |
| Model | Noctua NF-A4x10 PWM (40 × 40 × 10 mm) |
| Power supply | +5V |
| Control | PWM with tachometer feedback |

## Foot contact switches

The motherboard provides four inputs for microswitches placed at the tip of the legs, to detect ground contact.

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Foot contact switches are not used in Chromapi v1.
{{< /callout >}}

## Communication architecture

```mermaid
%%{init: {'themeVariables': {'edgeLabelBackground':'transparent'}}}%%
flowchart LR
    RPI["Raspberry Pi"]
    MCU["STM32G431KBT6<br/>SYSCLK · 160 MHz"]
    SERVOS(["Servomotors x12<br/>STS3215-C001"])
    IMU["IMU<br/>BMI088"]
    PWR["Power monitor<br/>INA226"]
    LED(["RGB LEDs<br/>WS2812B"])
    CAM["Wide-angle camera<br/>IMX219-D160"]
    AUDIO["Speaker + Microphone<br/>MAX98357A / ICS-43434"]
    FAN(["Fan<br/>Noctua NF-A4x10"])

    RPI <-->|"Custom bridge protocol<br/>UART1 · 1 Mbps · 100 Hz control loop"| MCU
    MCU <-->|"Half-duplex serial<br/>USART2 · 1 Mbps · 200 Hz"| SERVOS
    MCU <-->|"SPI1 · 5 MHz · 400 Hz"| IMU
    MCU <-->|"I2C1 · 400 kHz · 10 Hz"| PWR
    MCU -->|"PWM+DMA · 800 kHz"| LED

    RPI -->|"CSI-2"| CAM
    RPI <-->|"I2S"| AUDIO
    RPI <-->|"PWM + tachometer"| FAN

    classDef ic fill:#25b3ae,color:#ffffff,stroke:none
    classDef actuator fill:#c027e7,color:#ffffff,stroke:none
    classDef sensor fill:#5c5aed,color:#ffffff,stroke:none

    class RPI,MCU,AUDIO ic
    class SERVOS,LED,FAN actuator
    class IMU,PWR,CAM sensor
```

## Resources

* Firmware drivers: [`bmi088.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/bmi088.c), [`mahony.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/mahony.c), [`ina226.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/ina226.c) and [`ws2812b.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/ws2812b.c)
* Python interfaces: [`src/chromapi/hardware`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/hardware) and [`src/chromapi/media`](https://github.com/Mowibox/chromapi/tree/main/src/chromapi/media)
