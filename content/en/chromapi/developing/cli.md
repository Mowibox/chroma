---
title: "Command line"
description: "The chromapi command and its tools."
summary: "The chromapi command and its tools."
date: 2026-11-12
lastmod: 2026-11-22
draft: false
weight: 50
toc: true
icon: "terminal"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Reference for the chromapi command line: discover the chromapi command and the tools it provides to work with your quadruped robot from a terminal."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

The `chromapi` command gathers all of the robot's tools. It is used over SSH on the robot, or on your computer for simulation.

```bash
chromapi --help              # list of commands
chromapi <command> --help    # options of a command
```

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
The `python -m chromapi` command works too!
{{< /callout >}}

{{< callout context="danger" title="Warning!" icon="outline/alert-triangle" >}}
On the real robot, the web app holds the motherboard's serial port. Before using a command that talks to the motherboard, stop it via **Settings › Power › Developer mode**. To restart it, run `sudo systemctl start chromapi@$USER`, or reboot the robot.
{{< /callout >}}

Commands that talk to the motherboard (`version`, `health`, `flash`, `calibrate`) accept `--port` if it is not on the default serial port, `/dev/ttyAMA0`.

## Overview

| Command | Purpose |
| :--- | :--- |
| `chromapi run` | Start Chromapi and its web app |
| `chromapi sim` | Run the simulation on its own, for scripts using `backend="sim-server"` |
| `chromapi version` | Show the SDK, firmware and protocol versions |
| `chromapi health` | Check the robot's health |
| `chromapi report` | Write a support report |
| `chromapi flash` | Update the motherboard firmware |
| `chromapi motors setup` | Set up the servos |
| `chromapi calibrate servos` | Calibrate the servo centers |
| `chromapi calibrate imu` | Calibrate the IMU |
| `chromapi gamepad pair` | Pair a Bluetooth controller |
| `chromapi access reset` | Forget the web app's access code |

## chromapi run

Starts the robot and its [web app]({{< relref "chromapi/getting-started/web-app/" >}}). On the robot, the `chromapi@<user>` service runs `chromapi run` automatically on power-up.

```bash
chromapi run          # on the robot
chromapi run --sim    # on a PC, in simulation
```

| Option | Effect |
| :--- | :--- |
| `--sim` | Simulated robot in MuJoCo |
| `--port` | App port (5000 by default) |
| `--host` | Listen address (`0.0.0.0` by default) |
| `--no-camera` | Do not open the camera |
| `--camera-index` | Index of the camera to open |
| `--record-dir` | Folder for recorded videos (`~/chromapi_recordings` by default) |
| `--http` | Serve the page over HTTP instead of HTTPS. The phone's microphone no longer works, and traffic is readable on the network |

## chromapi sim

Runs the [simulation]({{< relref "chromapi/developing/simulation/#keeping-the-simulation-open" >}}) on its own, on your computer. Your scripts connect to it with `backend="sim-server"`, and can stop and restart without closing it.

```bash
chromapi sim
```

| Option | Effect |
| :--- | :--- |
| `--follow` | The camera follows the robot |
| `--headless` | No window (Ctrl+C to stop the simulator) |

## chromapi version

Shows the SDK and firmware versions, and the [protocol]({{< relref "chromapi/hardware/protocol/" >}}) version each one speaks. If they differ, the command says so: one of them needs to be [updated]({{< relref "chromapi/help/update/" >}}). The command returns code 1 if the versions are incompatible or if the motherboard does not respond.

## chromapi health

Checks the robot without moving anything: serial port, sound card, fan, calibrations, motherboard, firmware, battery, IMU and servos. Each line is `OK`, `WARN` or `FAIL`, with what to do.

The command returns code 1 if a check fails. See [troubleshooting]({{< relref "chromapi/help/troubleshooting/" >}}).

## chromapi report

Writes a support report to `~/chromapi_report_<date>.txt`: versions, robot state, calibration, services and recent logs. It contains no password or network configuration, and local network addresses are masked. Attach it to your message on [Discord](https://discord.gg/SUQTs6QV3M) to get help.

| Option | Effect |
| :--- | :--- |
| `--output` | Report file path (`~/chromapi_report_<date>.txt` by default) |

## chromapi flash

Installs on the motherboard the firmware shipped with the SDK, or a `.hex` file of your choice.

```bash
chromapi flash
chromapi flash path/to/firmware.hex
```

The servos go limp during the operation: make the robot lie down first. `--yes` skips the confirmation.

## chromapi motors setup

Assigns an ID to each servo and configures its settings automatically.

```bash
chromapi motors setup          # new servos: only one plugged in at a time
chromapi motors setup --all    # assembled robot: rewrites the settings of all 12, without changing IDs
chromapi motors setup --id 5   # the new servo (ID 1) becomes number 5, no questions asked
```

## chromapi calibrate

```bash
chromapi calibrate servos --all            # all joints
chromapi calibrate servos --joint tl_2     # a single one
chromapi calibrate imu
```

`calibrate servos` looks for the center of each joint by moving it to its mechanical end stops.

{{< callout context="danger" title="Warning!" icon="outline/alert-triangle" >}}
Before running `calibrate servos`, lift the robot and place it in a clear space: no leg must be able to touch anything.
{{< /callout >}}

`calibrate imu` measures the board's tilt relative to the floor to apply a correction: place the robot on a flat floor and do not touch it.

| Option | Command | Effect |
| :--- | :--- | :--- |
| `--dry-run` | Both | Measure and display, without saving anything |
| `--joint` | `servos` | Joint to calibrate, repeatable |
| `--yes` | `servos` | Skip all confirmations |
| `--verbose` | `servos` | Show the details of each step |
| `--step`, `--margin` | `servos` | End-stop search settings, if a joint stops too early or not at all |
| `--duration` | `imu` | Measurement duration (5 s by default) |

Calibrations are saved in `~/.config/chromapi/calibration.yaml`.

## chromapi gamepad pair

Pairs the first Bluetooth controller found in pairing mode. Put the controller in pairing mode before running the command. `--scan` sets the search duration (20 s by default).

## chromapi access reset

Forgets the web app's access code: the next visitor will be able to choose a new one.
