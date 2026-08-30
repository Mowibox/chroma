---
title: "Chromapi"
description: "An open-source, 4-legged robot, built from scratch."
summary: "Chromapi is an open-source, 4-legged robot: custom PCB, STM32 firmware, 3D-printed structure, locomotion, and — eventually — vision and reinforcement learning."
date: 2026-08-29
lastmod: 2026-08-30
draft: false
toc: true
icon: "robot"
weight: 20

seo:
   title: ""
   description: "Chromapi is an open-source, 4-legged robot: custom PCB, STM32 firmware, 3D-printed structure, locomotion, and eventually vision and RL."
   canonical: "https://mowibox.github.io/chroma/en/chromapi/"
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img src="/chroma/images/chromapi/chromapi_logo.png" alt="Chromapi logo" width="300" class="chromapi-logo" />
</p>

**Chromapi** is a 4-legged robot I'm designing, building, and documenting from scratch, going from the electronic design to the software development, through 3D modeling and artificial intelligence. I think of it as a research platform to explore core robotics concepts, like locomotion, reinforcement learning, and human-robot interaction.

<p align="center">
    <img src="/chroma/gifs/chromapi.gif" alt="Chromapi Dance" />
</p>

Everything shown here is meant to be **open source**: the idea is to share what I learn and build as Chromapi's development progresses, so anyone can draw inspiration from it, experiment with it, or take it further. The only limit is your imagination (and maybe the hardware)!

## Where to start?

| I want to... | Go to |
| :--- | :--- |
| Know what's inside (MCU, servos, sensors, power) | [Specifications]({{< relref "chromapi/specifications/" >}}) |
| Source the parts to build one | [Bill of Materials]({{< relref "chromapi/bom/" >}}) |
| Flash the firmware, send commands, understand the protocol | [Documentation]({{< relref "chromapi/documentation/" >}}) |
| Understand *why* Chromapi is built this way | [Design notes]({{< relref "chromapi/design/" >}}) |

## The repositories behind the project

<div class="space-y-6" style="text-align: left;">
  <article class="cardbox rounded-lg overflow-hidden">
    <a href="https://github.com/Mowibox/chromapi" class="block" target="_blank" rel="noopener">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-2" style="display:flex; align-items:center;">
          <h2 class="text-xl font-semibold m-0 p-0">chromapi</h2>
        </div>
        <p class="text-gray-400 text-sm">Main source code of the quadruped robot: control, locomotion, and software tools.</p>
      </div>
    </a>
  </article>
  <article class="cardbox rounded-lg overflow-hidden">
    <a href="https://github.com/Mowibox/chromapi_motherboard" class="block" target="_blank" rel="noopener">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-2" style="display:flex; align-items:center;">
          <h2 class="text-xl font-semibold m-0 p-0">chromapi_motherboard</h2>
        </div>
        <p class="text-gray-400 text-sm">Electronic design and firmware of Chromapi's motherboard.</p>
      </div>
    </a>
  </article>
</div>

## Roadmap

The roadmap shows the current progress of Chromapi's design stages, as well as the future steps ahead.

<div class="chromapi-roadmap">
<div class="timeline">
  <div class="container left">
    <div class="content">
      <h2>⚡ Electronics</h2>
      <p>PCB design, electronic schematics, and component integration.</p>
      <p class="status status-done">🟢 Done</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>💻 Firmware</h2>
      <p>Embedded firmware in C, communication with the Raspberry Pi, and actuator control.</p>
      <p class="status status-done">🟢 Done</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>📐 3D modeling &amp; CAD</h2>
      <p>3D models of the robot, part design, and manufacturing files.</p>
      <p class="status status-done">🟠 V1 done, V2 in progress</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>🦿 Locomotion</h2>
      <p>Motion control, trajectory generation, and balance.</p>
      <p class="status status-progress">🟠 In progress</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>🧠 Reinforcement learning</h2>
      <p>Experimentation environment for training policies.</p>
      <p class="status status-planned">🔵 Planned</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>👁️ Vision</h2>
      <p>Environment perception via camera, computer vision, and deep learning.</p>
      <p class="status status-planned">🔵 Planned</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>🎙️ Audio processing</h2>
      <p>Audio signal perception and processing.</p>
      <p class="status status-planned">🔵 Planned</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>🤖 All-in-one</h2>
      <p>Building a model to interact with humans and their environment.</p>
      <p class="status status-planned">🔵 Planned</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>🏖️ Vacation</h2>
      <p>I wish...</p>
      <p class="status status-none">🔴 Not planned</p>
    </div>
  </div>
</div>
</div>

<style>
.chromapi-roadmap {
  margin: 2rem 0;
}
.chromapi-roadmap .timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}
.chromapi-roadmap .timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: var(--bs-border-color);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -2px;
}
.chromapi-roadmap .container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  max-width: none;
  margin: 0;
}
.chromapi-roadmap .container::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  right: -11px;
  background-color: var(--bs-primary);
  border: 4px solid var(--bs-body-bg);
  top: 18px;
  border-radius: 50%;
  z-index: 1;
}
.chromapi-roadmap .left {
  left: 0;
}
.chromapi-roadmap .right {
  left: 50%;
}
.chromapi-roadmap .right::after {
  left: -11px;
}
.chromapi-roadmap .left::before {
  content: ' ';
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid var(--bs-tertiary-bg);
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent var(--bs-tertiary-bg);
}
.chromapi-roadmap .right::before {
  content: ' ';
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid var(--bs-tertiary-bg);
  border-width: 10px 10px 10px 0;
  border-color: transparent var(--bs-tertiary-bg) transparent transparent;
}
.chromapi-roadmap .content {
  padding: 0.9rem 1.25rem;
  background-color: var(--bs-tertiary-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 0.5rem;
  position: relative;
  text-align: left;
}
.chromapi-roadmap .content h2 {
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}
.chromapi-roadmap .content p {
  margin-bottom: 0.4rem;
}
.chromapi-roadmap .content p:last-child {
  margin-bottom: 0;
}
.chromapi-roadmap .status {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.85;
}
@media screen and (max-width: 767px) {
  .chromapi-roadmap .timeline::after {
    left: 20px;
  }
  .chromapi-roadmap .container {
    width: 100%;
    padding-left: 50px;
    padding-right: 15px;
  }
  .chromapi-roadmap .container::after {
    left: 9px;
  }
  .chromapi-roadmap .right::after {
    left: 9px;
  }
  .chromapi-roadmap .left::before,
  .chromapi-roadmap .right::before {
    left: 8px;
    right: auto;
    border-width: 10px 10px 10px 0;
    border-color: transparent var(--bs-tertiary-bg) transparent transparent;
  }
  .chromapi-roadmap .right {
    left: 0%;
  }
}
</style>

## Join the community!

Questions, feedback, and contributions are always welcome! Feel free to open an
[issue](https://github.com/Mowibox/chromapi/issues) on either repository, or come discuss it
directly on the Chroma [Discord](https://discord.gg/SUQTs6QV3M).

<p align="center">
    <img src="/chroma/images/chroma_discord.png" alt="Chroma Discord" />
</p>
