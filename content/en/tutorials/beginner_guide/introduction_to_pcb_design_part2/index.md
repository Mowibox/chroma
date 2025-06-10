---
title: "Introduction to printed circuit board design – Part 2"
summary: With KiCad software - Routing
weight: 3
icon: "chip"
---

<p align="center">
    <img src="/chroma/images/pcb.png" alt="PCB image" class="w-full h-auto" />
</p>

## Prerequisites

* Completed [Introduction to printed circuit board design – Part 1]()

## Goal

<p align="center">
    <img src="/chroma/images/schematic1.png" alt="PCB example" class="w-full h-auto" />
</p>

The goal of this tutorial is to build a small PCB with simple components (LEDs, buzzers, resistors, etc.) that can later be connected to and used with an electronic board.

In the previous section, we created the electrical circuit in the schematic editor. In this part, we’ll prepare the board for fabrication by arranging components and their connections on the PCB.

## Routing

<p align="center">
    <img src="/chroma/images/routing1.jpg" alt="PCB editor" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing2.jpg" alt="PCB editor page" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Open the KiCad "PCB Editor".**
{{< /callout >}}

### Importing Components

<p align="center">
    <img src="/chroma/images/routing3.jpg" alt="Import component symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing4.jpg" alt="Page with components" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Import the components from your schematic into the PCB editor.**
{{< /callout >}}

### PCB Outline

<p align="center">
    <img src="/chroma/images/routing5.jpg" alt="Edges tools" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing6.jpg" alt="PCB edges" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Select the "Edge.Cuts" layer and draw your PCB outline using the "Line" and "Arc" tools.**
{{< /callout >}}

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Allow about a 30mm x 30mm square to fit all components inside. You can also make it smaller or fully round… No one says you must follow the example exactly!
{{< /callout >}}

### Ground Plane

The ground net is the most important signal on the PCB, as it spans nearly the entire board. We’ll create filled zones of this net, called ground planes. Adding ground planes on both sides of the PCB helps to:

* Minimize trace impedance
* Automatically connect grounded components
* Be more eco-friendly!

<p align="center">
    <img src="/chroma/images/routing7.jpg" alt="Draw filled zones" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing8.jpg" alt="Ground plane" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Select the "F.Cu" layer and click "Add filled zone". Choose "GND", confirm, and outline the PCB. Repeat on the "B.Cu" layer.**
{{< /callout >}}

### Component Placement

<p align="center">
    <img src="/chroma/images/routing9.jpg" alt="Component placement" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Place the components anywhere inside your board outline, then regenerate the ground plane (shortcut "B").**
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing10.jpg" alt="3D View" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
You can preview your board in 3D via the "View" menu → "3D Viewer". So pretty!
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing11_en.png" alt="Grid" class="w-full h-auto" />
</p>

{{< callout context="tip" title="Did you know?" icon="outline/message-dots" >}}
Right-click on the workspace and select "Grid" to adjust the grid spacing for finer placement.
{{< /callout >}}

### Net Classes

Before routing, we must define net classes:

> _In electrical engineering, an equipotential set is a group of conductors at the same voltage, thus having no potential difference. An equipotential bonding aims to equalize voltage across a space._ [(Wikipedia - french)](https://fr.wikipedia.org/wiki/%C3%89quipotentielle#%C3%89lectricit%C3%A9)

<p align="center">
    <img src="/chroma/images/routing12.jpg" alt="Net classes symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing13_en.png" alt="Net classes window" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Go to "Board Setup" → "Net Classes" and update the "Default" class to:**

* **Clearance: 0.3 mm**
* **Track Width: 0.3 mm**
* **Via Size: 0.8 mm**
* **Via Hole: 0.4 mm**
{{< /callout >}}

Very often, the tracks carrying the circuit's power supply can carry higher currents. This leads to significant power dissipation. To fix this, we're going to create a net class dedicated to power supply signals (+5V or GND). These tracks will be wider to reduce track impedance.

<p align="center">
    <img src="/chroma/images/routing14.jpg" alt="Plus symbol" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Click the "+" button to create a "Power" class with:**

* **Clearance: 0.3 mm**
* **Track Width: 0.5 mm**
* **Via Size: 1.2 mm**
* **Via Hole: 0.6 mm**
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing14.jpg" alt="Plus symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing15_en.png" alt="Net classes assignment" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Using the second "+" button, add all nets (+5V, GND, LED1, etc.) and assign them to "Power" (for +5V and GND) or "Default" (others).**
{{< /callout >}}

### Where the “routing" introduction comes into its own

<p align="center">
    <img src="/chroma/images/routing16.jpg" alt="Track symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing17.jpg" alt="Routing" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Route all tracks as shown by the ratsnest (X).**
{{< /callout >}}

{{< callout context="danger" title="Warning" icon="outline/alert-square-rounded" >}}
Avoid 90° trace angles—they cause electromagnetic interference (EMI) and can degrade PCB performance.
{{< /callout >}}

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
If routing is difficult, try repositioning components or using the bottom layer "B.Cu". Feel free to experiment!
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing18.jpg" alt="Track symbol" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}

Another alternative would be to alternate between the two layers by passing through a “hole”. This is the role of a via. Press "V" while routing a track to drop a via and switch layers.
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing19.jpg" alt="Text symbol" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Add text to your board (Ctrl + Shift + T) and regenerate the ground plane for embossed lettering. Don’t forget to refill your zones when done!
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing20.png" alt="Whole design" class="w-full h-auto" />
</p>

### Design Rules Check

Just like the [ERC]() for schematics, we need to verify your routing with the Design Rules Checker (DRC).

<p align="center">
    <img src="/chroma/images/routing21.jpg" alt="DRC symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing22_en.png" alt="DRC window" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Run the DRC and fix errors if any.**
{{< /callout >}}

**And there you have it—your finished PCB!**

<p align="center">
    <img src="/chroma/images/schematic1.png" alt="PCB finished" class="w-full h-auto" />
</p>

## Going further
