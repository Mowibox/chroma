---
title: "Safety guidelines"
description: "What to know before powering the robot: battery, moving legs, handling."
summary: "What to know before powering the robot: battery, moving legs, handling."
date: 2026-11-12
lastmod: 2026-11-13
draft: false
weight: 10
toc: true
icon: "alert-triangle"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Chromapi safety guidelines: what to know before powering the quadruped robot, about the battery, the moving legs and how to handle it."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Chromapi is a small robot, but it contains two lithium-ion batteries and fairly strong servos. Take a few minutes to read this page to ensure safe use.

## Power precautions

Chromapi is powered by two 18650 lithium-ion cells in series (see the [electrical specifications]({{< relref "chromapi/hardware/electrical/" >}})).

* **Respect the battery polarity (+/-)** when placing them in their holder, and never use a cell that looks damaged. Make sure both cells are identical (same reference, same age).
* **Charge the robot under supervision**, through the motherboard's USB-C port, on a heat-resistant surface. A full charge takes about 3 h.
* **Do not leave the robot discharged for weeks**: it is better to charge it before storing it.

The motherboard was designed to protect the batteries against over-discharge, overcurrent and short circuits. Chromapi also tells you about its battery state: it looks tired when the battery is low (below 30%) and alerts you when the battery is critical (below 10%). When the battery is empty, Chromapi lies down and turns itself off.

| <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_tired.gif" alt="Chromapi tired, low battery" width="240" /> | <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_alert.gif" alt="Chromapi alerting, critical battery" width="240" /> |
| :---: | :---: |
| Low battery (< 30%): Chromapi is tired | Critical battery (< 10%): Chromapi alerts you |

## Chromapi's movements

* **Keep your fingers away from the joints** when the robot is awake: the servos do not stop if they meet a finger on their way.
* Make the robot walk **on the floor**, preferably on a flat, clear surface.
* Do not leave Chromapi unattended with young children or pets.
* To carry Chromapi, **hold it by its sides**, never by a leg.

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_safety1.png" alt="Chromapi held by its sides" width="480" />
</p>

## Turning the robot off properly

Chromapi runs on a Raspberry Pi: a tiny computer whose storage is an SD card. As with most computers, cutting the power while it is running can damage the SD card. To turn Chromapi off properly:

1. Turn it off from the [web app]({{< relref "chromapi/getting-started/web-app/" >}}) (via **Settings › Power › Power off**), or by holding the controller's "START" button for 3 seconds. The robot lies down before turning off.
2. Flip the power switch on the back of the robot.

{{< callout context="danger" title="Warning" icon="outline/alert-square-rounded" >}}
Never cut the power during an update or a calibration! Always wait for the operation to finish before doing anything.
{{< /callout >}}
