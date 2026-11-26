---
title: "Simulation"
description: "Run Chromapi in MuJoCo, without the robot."
summary: "Run Chromapi in MuJoCo, without the robot."
date: 2026-11-12
lastmod: 2026-11-22
draft: false
weight: 20
toc: true
icon: "computer"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Run Chromapi in the MuJoCo simulator, without the robot: test your Python code and your moves on a simulated quadruped before using the real one."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img src="/chroma/gifs/chromapi_sim_dance.gif" alt="Chromapi dancing in the MuJoCo simulator" />
</p>

Don't have the robot yet, or want to experiment with movements on Chromapi without risking breaking it? There is a simulated version of Chromapi in [MuJoCo](https://mujoco.org/): the same code drives the simulated robot and the real one.

## Prerequisites

* Chromapi's SDK must be installed with the `sim` extra: see the [SDK installation]({{< relref "chromapi/developing/sdk-installation/" >}}) page.

## Running the examples

The [`examples/`](https://github.com/Mowibox/chromapi/tree/main/examples) folder contains a few programs to try Chromapi out. They are not included in the pip package: download them from the repository, or install the SDK [from source]({{< relref "chromapi/developing/sdk-installation/#installing-the-sdk" >}}). Each one runs in MuJoCo with the `--sim` flag:

```bash
python examples/walk.py --sim              # a round trip: forward, sideways, quarter turn
python examples/walk.py --sim --follow     # the camera follows the robot
python examples/dance.py --sim             # dance in place
python examples/gamepad.py --sim           # drive with a controller paired to the PC
```

Without `--sim`, these programs also run on the real robot.

## Web app in simulation

The [web app]({{< relref "chromapi/getting-started/web-app/" >}}) also works with the simulated robot, with the command:

```bash
chromapi run --sim
```

The web app is then available at [`https://localhost:5000`](https://localhost:5000). Its certificate is self-signed: on the first visit, the browser shows a security warning that you must accept to continue.

## In your code

When you write a program for Chromapi, you choose between simulation and the real robot with the `backend` parameter:

```python
from chromapi.chromapi import Chromapi

with Chromapi(backend="mujoco", launch_viewer=True) as robot:
    robot.wake_up(wait=True)
    robot.walk_distance(0.3)  # [m]
    robot.rest()
```

With this code, a MuJoCo window opens, the robot stands up, walks forward 30 cm then lies down. Replace `"mujoco"` with `"hardware"` to run exactly the same code on the real robot.

Here are the main parameters of a Chromapi instance:

| Parameter | Effect |
| :--- | :--- |
| `backend="mujoco"` | Drive the robot in simulation |
| `backend="hardware"` | Drive the real robot. This is the default value |
| `backend="sim-server"` | Connect to a simulation running separately with `chromapi sim` (see the [section below](#keeping-the-simulation-open)) |
| `launch_viewer=True` | Open a MuJoCo window. Without it, the simulation runs with no display |
| `follow_robot=True` | With `launch_viewer=True`, the camera follows the robot ("Esc" releases it) |
| `mjcf_path=...` | With `backend="mujoco"`, load a scene other than the default one |

## Keeping the simulation open

With `backend="mujoco"`, the simulation lives inside your program: every run reopens the window and makes the robot stand up again. When you are tuning a script and rerunning it often, run the simulation separately instead, in a first terminal:

```bash
chromapi sim              # the MuJoCo window, robot lying down
chromapi sim --follow     # the camera follows the robot
chromapi sim --headless   # no window (Ctrl+C to stop it)
```

In a second terminal, your script connects to it with `backend="sim-server"`:

```python
from chromapi.chromapi import Chromapi

with Chromapi(backend="sim-server") as robot:
    robot.wake_up(wait=True)
    robot.walk_distance(0.3)  # [m]
    robot.rest(wait=True)
```

* Your script keeps the whole SDK. The simulation only handles physics and display, like the motherboard on the real robot.
* When the script stops, the simulation keeps running and the robot stays where it is: the next run starts from there. To start from scratch, restart `chromapi sim`.
* Only one script drives the simulation at a time, as on the robot. A second one stops automatically (`A script is already driving the simulation`).
* If `chromapi sim` is not running, the script does not start (`No simulation on localhost:7447`).
* Closing the window, or stopping `chromapi sim`, also stops the running script.

The simulation only accepts programs from your own computer.

## Differences with the real robot

| On the robot | In simulation |
| :--- | :--- |
| Ring of 18 LEDs | The ring shows the average color of the 18 LEDs |
| Robot speaker | Sound goes in and out through the computer |
| Battery charge | Not simulated: `battery_percent` is `None` |
| Servo temperature | Not simulated |
| Camera and microphone | Not simulated |

Walking is open-loop: the robot does not measure the distance it actually travels. Distances therefore differ a little between simulation and a real floor, which is more or less slippery.
