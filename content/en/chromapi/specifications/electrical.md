---
title: "Electrical characteristics"
description: "From an 18650 pack to a working motherboard."
summary: "Power source, charging, protection, and regulation on Chromapi's motherboard: 2S 18650 pack, USB-C charging, and the 5V/3.3V rails."
date: 2026-08-29
lastmod: 2026-09-25
draft: false
weight: 20
toc: true
icon: "battery"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Power source, charging, protection, and regulation on Chromapi's motherboard: 2S 18650 pack, USB-C charging, and the 5V/3.3V rails."
   canonical: "https://mowibox.github.io/chroma/en/chromapi/specifications/electrical/"
   noindex: false
   robots: "index, follow"
---

## Battery

Chromapi is powered by two 18650 Li-ion cells, housed in a holder inside its body.

| Property | Value |
| :--- | :--- |
| Cells | 2 Molicel INR18650-P28A |
| Configuration | 2S (series) |
| Nominal voltage | 7.2V |
| Voltage range | 6.0V - 8.4V |
| Capacity | 2800 mAh |
| Energy | ≈ 20 Wh |
| Max. discharge current (per cell) | 35 A |

{{< callout context="danger" title="Warning" icon="outline/alert-square-rounded" >}}
Li-ion cells can be dangerous in case of short circuit, impact or deep discharge. Use brand-name cells, and never leave the robot charging unattended.
{{< /callout >}}

## Charging and protection

Chromapi has a USB-C charging port, directly on the motherboard. The board also includes a protection circuit against over-discharge, over-current and short circuits (BMS), to preserve the batteries and limit risks.

| Property | Value |
| :--- | :--- |
| Battery life | h |
| Charging time | h |

## Power monitoring

The robot's power consumption is continuously measured by an INA226, placed right after the power switch.

| Property | Value |
| :--- | :--- |
| Component | INA226 |
| Measured quantities | Voltage, current and power |
| Shunt resistor | 2 mΩ |
| Max. measurable current | 8 A |
| Interface | I2C at 400 kHz (address `0x40`) |
| Reading rate | 10 Hz |

The current voltage running through Chromapi is constantly displayed by a status LED on the motherboard.

## Regulation and distribution

| Rail | Regulator | Type | Loads |
| :--- | :--- | :--- | :--- |
| V_SYS (6.0 - 8.4V) | — | Battery voltage, after protection and monitoring | Servomotors |
| +5V | TPS51388 | Switching regulator (Buck), 600 kHz | Raspberry Pi, fan, RGB LED ring |
| +3.3V | LD39050 | Linear regulator (LDO), powered by the +5V rail | STM32 MCU, IMU, power monitor, audio amplifier and microphone |

## Power architecture

```mermaid
%%{init: {'themeVariables': {'edgeLabelBackground':'transparent'}}}%%
flowchart TD
    CHG[["USB-C charge<br/>CN3302"]] -.->|"charge → B+ ≈ 7.2–8.4V"| CELLS[("Battery<br/>18650 x2")]
    CELLS -->|"B+/BM/B-"| HY["HY2120<br/>BMS protection"]
    HY -->|"B+"| SW[["Power switch"]]

    SW -->|"V_BATT ≈ 7.2–8.4V"| SHUNT[["INA226 shunt sense<br/>2mΩ"]]
    SHUNT -->|"V_SYS ≈ 7.2–8.4V"| REG5{{"Voltage regulation<br/>TPS51388 · Fsw=600kHz"}}
    SHUNT -->|"V_SYS"| SERVOS(["Servomotors x12<br/>Feetech STS3215-C001"])

    REG5 -->|"+5V"| RPI["Raspberry Pi"]
    REG5 -->|"+5V"| FANPWR(["Fan<br/>Noctua NF-A4x10"])
    REG5 -->|"+5V"| LEDPWR(["RGB LEDs<br/>WS2812B"])
    REG5 -->|"+5V"| REG33{{"Voltage regulation<br/>LD39050 LDO"}}

    REG33 -->|"+3.3V"| MCU["MCU<br/>STM32G431KBT6"]
    REG33 -->|"+3.3V"| IMU["IMU<br/>BMI088"]
    REG33 -->|"+3.3V"| INA["Power monitor<br/>INA226"]
    REG33 -->|"+3.3V"| AUDIO["Speaker + Microphone<br/>MAX98357A / ICS-43434"]

    classDef power fill:#dd2757,color:#ffffff,stroke:none
    classDef voltreg fill:#ea684c,color:#ffffff,stroke:none
    classDef ic fill:#25b3ae,color:#ffffff,stroke:none
    classDef actuator fill:#c027e7,color:#ffffff,stroke:none
    classDef sensor fill:#5c5aed,color:#ffffff,stroke:none

    class CHG,CELLS,HY,SW power
    class REG5,REG33 voltreg
    class MCU,RPI,AUDIO ic
    class SERVOS,FANPWR,LEDPWR actuator
    class SHUNT,IMU,INA sensor
```

## Resources

* Schematics (PDF): [`hardware/schematic_pdf`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/schematic_pdf)
* Manufacturing files (Gerbers, BOM, CPL): [`hardware/production`](https://github.com/Mowibox/chromapi_motherboard/tree/main/hardware/production)
* Motherboard components: [PCB Bill of Materials]({{< relref "chromapi/bom/pcb_bom/" >}})
