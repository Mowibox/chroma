---
title: "First start"
description: "Flash the firmware, set up and calibrate the servos, check the robot's health."
summary: "Flash the firmware, set up and calibrate the servos, check the robot's health."
date: 2026-11-12
lastmod: 2026-11-13
draft: false
weight: 30
toc: true
icon: "player-play"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "First start of Chromapi: flash the motherboard firmware, set up and calibrate the servos, then check the robot's health before making it move."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Once the OS is [installed]({{< relref "chromapi/getting-started/installation/" >}}), the next step is to open the web app to prepare and calibrate Chromapi for assembly.

Steps 1 to 3 below are done **before assembling the robot**, with at least the Raspberry Pi, the motherboard and the batteries. Steps 4 to 6 require the fully assembled robot.

## 1. Opening the web app

From a phone or a computer (on the same network as the one set in Raspberry Pi Imager), open:

```txt
https://chromapi.local:5000
```

or `https://<robot-name>.local:5000`.

{{< callout context="note" title="Security warning" icon="outline/info-circle" >}}
On the first connection, the browser will flag a certificate it does not know. This is expected, as each robot generates its own. To access the web interface, select "Advanced" then "Continue to site".
{{< /callout >}}

On your first visit, the app will ask you to choose a code of at least 6 characters. It will be asked on every new device that wants to drive the robot.

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_first_start1.png" alt="Choosing the access code" width="480" />
</p>

## 2. Updating the firmware

When you receive your board, it does not yet contain the program that drives Chromapi's motors. The firmware can be installed on the motherboard from the web app.

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_first_start2.png" alt="Settings › Maintenance › Update the firmware" width="380" />
</p>

In **Settings › Maintenance**, click **Update the firmware**. The app installs the latest firmware on the motherboard.

{{< callout context="caution" title="Caution" icon="outline/alert-triangle" >}}
Do not cut the robot's power while the update is running!
{{< /callout >}}

The installed versions are shown in the **About** section.

## 3. Setting up the servos

Each servo has an ID that tells it apart when movements are requested. Out of the box, all twelve servos share the same ID (ID = 1), so each one must be given its own, **one servo at a time**.

To do so, click **Set up new servos**. The tool guides you leg by leg and tells you at each step which servo to plug in and on which connector.

Once this step is done, you can turn off your robot and start assembling it by following the [Assembly & wiring]({{< relref "chromapi/build/assembly/" >}}) page.

## 4. Calibrating the servos

Once Chromapi is assembled, calibration tools are available to correct small defects due to assembly, part manufacturing, etc. In particular (and I have no doubt about your assembly skills!), servos are never screwed in at exactly the same angle: a few degrees of difference from one motor to the next is enough for the robot not to stand straight. Calibration measures these offsets and compensates for them, so that all legs start from the same reference.

Run the **Calibrate the servos** tool. It takes a few minutes. During calibration, Chromapi looks for the center of each joint by sweeping its legs to their mechanical end stops.

{{< callout context="note" title="During calibration" icon="outline/info-circle" >}}
Hold the robot by its chassis or raise it so that no leg can touch anything.
{{< /callout >}}

## 5. Calibrating the inertial measurement unit (IMU)

An IMU is a sensor that measures Chromapi's orientation relative to the horizontal. As with the servos, assembly is never perfect: the motherboard, which carries the sensor, may be slightly tilted inside the robot. Calibration measures this offset so that Chromapi knows when it is truly level.

Run the **Calibrate the IMU** tool so that Chromapi measures and corrects the tilt of its board relative to the horizontal.

{{< callout context="note" title="During calibration" icon="outline/info-circle" >}}

* Place Chromapi on a **flat floor**.
* Keep Chromapi still during the 5 seconds of calibration.

{{< /callout >}}

## 6. Checking

To make sure Chromapi works properly, open **Settings › Diagnostics**. This section summarizes the state of the motherboard, the battery, the servos and the Raspberry Pi. All good? Chromapi is ready to move! Learn how to [drive the robot with the web app]({{< relref "chromapi/getting-started/web-app/" >}}). If problems remain, check the [troubleshooting page]({{< relref "chromapi/help/troubleshooting/" >}}).

## Command line

For developers, each step on this page can be done without the web interface, directly with the `chromapi` command over SSH:

| Step | Command |
| :--- | :--- |
| Update the firmware | `chromapi flash` |
| Set up the servos | `chromapi motors setup` |
| Calibrate the servos | `chromapi calibrate servos --all` |
| Calibrate the IMU | `chromapi calibrate imu` |
| Check the robot's health | `chromapi health` |
| SDK and firmware versions | `chromapi version` |

{{< callout context="danger" title="Warning!" icon="outline/alert-triangle" >}}
The app holds the motherboard's serial port. Before using these commands, stop it via **Settings › Power › Developer mode**. To restart it, run `sudo systemctl start chromapi@$USER`, or reboot the robot.
{{< /callout >}}

The `chromapi health` command lists what is wrong and what to do. If you are stuck, `chromapi report` (or **Settings › Maintenance › Support report**) writes a report on your robot's state that you can share on [Discord](https://discord.gg/SUQTs6QV3M).
