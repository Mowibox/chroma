---
title: "Robot Bill of Materials"
description: "What to buy, beyond the PCB, to build one."
summary: "The parts to buy for building Chromapi: battery, compute, camera, servomotors, prices, references, and suppliers."
date: 2026-08-29
lastmod: 2026-08-30
draft: false
weight: 10
toc: true
icon: "shopping-cart"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "The parts to buy for building Chromapi: battery, compute, camera, servomotors, prices, references, and suppliers."
   canonical: "https://mowibox.github.io/chroma/en/chromapi/bom/robot_bom/"
   noindex: false
   robots: "index, follow"
---

This page lists the parts to buy to build a Chromapi yourself. For the components mounted on
the motherboard, see the [PCB Bill of Materials]({{< relref "chromapi/bom/pcb_bom/" >}}).

{{< callout context="note" title="Notes" >}}

* Prices are based on purchases in France; pricing info for other countries will be added
  over time.
* Some parts can only be bought in bulk packs, which explains some of the total prices.
{{< /callout >}}

| Component | Qty | Unit price | Total price | Reference | Manufacturer | Supplier |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 18650 batteries | 2 | €3.99 | €7.98 | INR18650-P28A | Molicel | [Nkon](https://www.nkon.nl/fr/molicel-inr18650-p28a-2800mah-35a.html) |
| 18650 battery holder | 1 | €2.14 | €2.14 | HP157-BATTERY-TRAY | Radiomaster | [Radiomaster](https://radiomasterrc.com/products/replacement-2x18650-battery-tray-for-tx8-tx12-tx16) |
| Power switch | 1 | €0.63 | €6.30 | B0CH3JCQM5 | Rebower | [Amazon](https://www.amazon.fr/dp/B0CH3JCQM5?psc=1&ref=ppx_yo2ov_dt_b_product_details) |
| Microswitch | 4 | €0.26 | €5.19 | WK1-04A-13.5P | JZK | [Amazon](https://www.amazon.fr/gp/product/B0D6FNMY6R/ref=ox_sc_act_title_2?smid=A167QJB1GLPJYG&psc=1) |
| Raspberry Pi[^1] | 1 | €66.30 | €66.30 | Raspberry Pi 4 Model B | Raspberry Pi | [Kubii](https://www.kubii.com/fr/cartes-nano-ordinateurs/2771-raspberry-pi-4-modele-b-2gb-5056561800332.html) |
| SD card | 1 | €16.20 | €16.20 | Ultra microSDHC 32 GB | SanDisk | [Kubii](https://www.kubii.com/fr/support-de-stockage/2794-1488-carte-micro-sd-sandisk-classe-10-3272496311411.html#/capacite_de_stockage-32_gb) |
| Camera[^2] | 1 | €19.49 | €19.49 | IMX219-D160 | Waveshare | [Amazon](https://www.amazon.fr/Waveshare-IMX219-D160-Compatible-Supporting-Resolution/dp/B07H2D4WYR/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1) |
| Servomotor[^3] | 12 | €14.00 | €168.00 | STS3215-C001 | Feetech | — |
| Speaker | 1 | €4.10 | €8.19 | 4R3W | Xevtrak | [Amazon](https://www.amazon.fr/Compatible-Performance-Haut-Parleur-Publicitaire-Haut-Parleurs/dp/B0GVJL8PCC/ref=sr_1_21?sr=8-21) |
| Fan | 1 | €15.90 | €15.90 | Noctua NF-A4x10 PWM | Noctua | [Amazon](https://www.amazon.fr/gp/product/B07DXRNYNX/ref=ox_sc_act_title_3?smid=A38F5RZ72I2JQ&psc=1) |

[^1]: The software architecture is designed to run on the Raspberry Pi 4, 5, and 2W. Note that all testing so far has been done on a Raspberry Pi 4 Model B with 8GB of RAM, so some adjustments may be needed for the other models.
[^2]: This camera is sold without a mount (it's a Raspberry Pi Camera Module v2 sensor): you can either buy a camera with an equivalent module and swap in the IMX219-D160, or skip the IMX219-D160 and directly use the camera of your choice with its own mount.
[^3]: Make sure to pick the 7.4V version. If you want more powerful servomotors, Chromapi's architecture is permissive enough to use the 12V version, provided the power supply is adapted accordingly.
