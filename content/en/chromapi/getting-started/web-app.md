---
title: "Web app"
description: "Drive Chromapi from a phone or a PC, with or without a gamepad."
summary: "Drive Chromapi from a phone or a PC, with or without a gamepad."
date: 2026-11-12
lastmod: 2026-11-21
draft: false
weight: 40
toc: true
icon: "device-mobile"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Drive Chromapi with the web app: control the quadruped robot from a phone or a PC, with or without a gamepad, straight from your browser."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp1.png" alt="Chromapi web app" class="w-full h-auto" />
</p>

The web app lets you control Chromapi: it runs continuously on the robot and opens in the browser of a phone or computer, with nothing to install.

## Connecting

On the same network as the robot, open `https://chromapi.local:5000`, or `https://<robot-name>.local:5000` if there are several robots.

* **Access code**: the first visitor chooses it (at least 6 characters), following devices must enter it. It can be changed in **Settings › Access**, which disconnects the other devices.
* **Forgotten code**: over SSH on the robot, run `chromapi access reset`. The next visitor will choose a new one.
* **One driver at a time**: if someone is already driving, other devices see the camera and the robot's state without being able to control it.

## Driving Chromapi with the app

Press **Wake up** to make Chromapi stand up, press again to make it lie down. Once it is standing, here is what each element of the interface does:

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp2.png" alt="Chromapi web app interface" class="w-full h-auto" />
</p>

| No. | Element | Effect |
| :---: | :--- | :--- |
| 1 | **Wake up** / **Lie down** | Wake Chromapi up or make it lie down |
| 2 | **Walk** joystick | Move in any direction (**Shift** in Lean mode: shifts the body) |
| 3 | **Turn** joystick | Turn in place (**Lean** in Lean mode: tilts the body) |
| 4 | **Speed** slider | Change the walking speed (from 25 to 200%, capped at 100% when the battery is low) |
| 5 | **Height** slider | Change the body height (from -40 to +20 mm) |
| 6 | Top bar | Battery (tap it to show the charge on the eye), Raspberry Pi temperature, motherboard link, number of viewers |
| 7 | Smiley button | Open the **Emotes** menu |
| 8 | ☰ button | Open the [menu](#menu-) |
| 9 | Microphone button | Hold to talk through Chromapi's speaker |
| 10 | Headphones button | Listen through Chromapi's microphone |
| 11 | Gear button | Open the [settings](#settings) |
| 12 | Camera button | Take a photo |
| 13 | Red button | Record a video |
| 14 | Lightning button | Switch Chromapi's eye to flashlight mode |
| 15 | Power button | [Power off, restart or switch to developer mode](#power) |

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
On a computer, Chromapi can also be driven with the keyboard:

| Key | Effect |
| :--- | :--- |
| <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> (<kbd>Z</kbd> <kbd>Q</kbd> <kbd>S</kbd> <kbd>D</kbd> on AZERTY) | Move, like the left joystick |
| Arrow keys | Turn or tilt the body, like the right joystick |
| <kbd>Enter</kbd> | **Wake up** / **Lie down** |
| <kbd>Esc</kbd> | Close the open menu or window |

{{< /callout >}}

## Menu ☰

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp3.png" alt="Web app menu" class="w-full h-auto" />
</p>

### Movement mode

* **Turn** mode: Chromapi's default movement mode. In this mode, the left joystick makes Chromapi walk and the right joystick makes it turn.
* **Lean** mode: in this mode, Chromapi stays in place. The left joystick shifts its body, while the right joystick tilts it.

{{< callout context="tip" title="Did you know?" icon="outline/message-dots" >}}
In **Lean** mode, Chromapi keeps its body as level as possible. If it is standing on a board, try tilting it gently to see the result!
{{< /callout >}}

### Detailed robot state

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp4.png" alt="Diagnostics panel shown on the video" width="800" />
</p>

The **Diagnostics on the video** option shows or hides an information panel over the camera feed:

| Line | Meaning |
| :--- | :--- |
| Link | State of the link with the motherboard |
| Battery | Battery charge, voltage, current and power |
| Servos | Number of servos responding |
| Hottest | Temperature of the hottest servo |
| Pi | Raspberry Pi temperature |
| Tilt | Body tilt |
| Feet | Feet on the ground (in simulation) |

All of this information is also available in the [settings](#settings).

### Robot gait

Chromapi has two gaits:

* **Trot** mode: Chromapi's default gait. Fast, two diagonal legs move together.
* **Crawl** mode: Chromapi takes a slower, more stable gait, with only one leg moving at a time.

| <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_trot.gif" alt="Chromapi trotting" width="240" /> | <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_crawl.gif" alt="Chromapi crawling" width="240" /> |
| :---: | :---: |
| Trot | Crawl |

### Chromapi's eye color

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_eye.gif" alt="Chromapi's eye colors" width="220" />
</p>

The slider lets you pick any color for Chromapi's eye.
The **Idle** button restores Chromapi's default purple color, and the **Rainbow** button gives it a rainbow color.

### Internal fan

The fan regulates Chromapi's internal temperature. Set to **Auto** by default, the robot adjusts the fan speed based on its temperature. Moving the slider sets the fan speed manually.

### Media gallery

The **Gallery** button gathers the photos and videos taken with the camera. They are stored on the robot, where you can view, download and delete them.

## Settings

| Section | Content |
| :--- | :--- |
| **Maintenance** | The [first start]({{< relref "chromapi/getting-started/first-start/" >}}) tools: firmware update, servo and IMU calibration, new servo setup, downloadable support report. The app tells you when a new firmware is available. |
| **Controller** | Connected controller, [pairing](#pairing), tilting the robot with the controller |
| **Access** | Change the robot's access code (disconnects the other devices) |
| **Diagnostics** | Details of the robot's state, like the [panel on the video](#detailed-robot-state) |
| **About** | Robot name, SDK and firmware versions. **Identify** helps you recognize one robot among several with a sound. |

## Power

The power button offers three options. In every case, Chromapi lies down first.

* **Power off**: Chromapi shuts down properly. You can then flip its switch to cut the power.
* **Restart**: Chromapi restarts. The page reconnects after about a minute.
* **Developer mode**: an option for developers. The app stops, freeing the serial port so you can work on Chromapi over SSH. The web interface comes back with `sudo systemctl start chromapi@$USER` or the next time the robot is turned on.

## Driving Chromapi with a controller

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_gamepad.gif" alt="Chromapi driven with a controller" width="600" />
</p>

Chromapi can also be controlled with a Bluetooth controller.

### Pairing

1. In **Settings › Controller**, choose **Pair a controller**.
2. Hold the controller's pairing button until its light blinks quickly, then press **Start**.

Once paired, the controller reconnects automatically on power-up.

In **Lean** mode, the **Lean with the controller's tilt** option (in **Settings › Controller**) lets you tilt the robot by tilting the controller.

When the controller's battery drops below 20%, it vibrates and the app shows a message.

### Buttons

| Button | Effect |
| :--- | :--- |
| Left stick | Walk (**Turn** mode) or shift the body (**Lean** mode) |
| Right stick | Turn (**Turn** mode) or tilt the body (**Lean** mode) |
| Cross | Wake the robot up or make it lie down |
| Square | Wave, alternating left and right |
| Triangle | Paw swipe, alternating left and right |
| Circle | Play a mood |
| L2 / R2 | Choose a mood (the controller's light bar takes its color) |
| L1 | Turn the flashlight on or off |
| L3 | Change gait: Trot or Crawl |
| R3 | Change movement mode: Turn or Lean |
| Share | Show the battery charge on the eye and on the controller's light bar |
| D-pad up / down | Raise or lower the body |
| D-pad left / right | Increase or decrease the speed (in 25% steps) |
| Hold START for 3 s | Turn the robot off |
