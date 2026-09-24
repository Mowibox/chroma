---
title: "Robot Bill of Materials"
description: "What to buy, beyond the PCB, to build one."
summary: "The parts to buy for building Chromapi: battery, compute, camera, servomotors, prices, references, and suppliers."
date: 2026-08-29
lastmod: 2026-09-25
draft: false
weight: 60
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

This page lists the parts to buy to build Chromapi yourself. For details on the components mounted on the motherboard, see the [PCB Bill of Materials]({{< relref "chromapi/bom/pcb_bom/" >}}).

{{< callout context="note" title="Notes" >}}

* Prices are based on purchases in France, so prices and shipping costs may vary depending on the country of purchase and availability. Pricing information for other countries may be added over time.
* Some parts can only be sold in bulk packs, which explains some of the total prices.
* Unlike the other components in the list, the PCB is a part you have to get manufactured. The open-source design is available on GitHub and can be ordered and assembled from any PCB manufacturer. It costs around €60.
* Chromapi v1 does not use the microswitches, so you can skip them!
{{< /callout >}}

| Component | Qty | Unit price | Total price | Reference | Manufacturer | Supplier |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 18650 batteries | 2 | €3.99 | €7.98 | INR18650-P28A | Molicel | [Nkon](https://www.nkon.nl/fr/molicel-inr18650-p28a-2800mah-35a.html) |
| 18650 battery holder | 1 | €2.14 | €2.14 | HP157-BATTERY-TRAY | Radiomaster | [Radiomaster](https://radiomasterrc.com/products/replacement-2x18650-battery-tray-for-tx8-tx12-tx16) |
| Power switch | 1 | €0.63 | €6.30 | B0CH3JCQM5 | Rebower | [Amazon](https://www.amazon.fr/dp/B0CH3JCQM5?psc=1&ref=ppx_yo2ov_dt_b_product_details) |
| Raspberry Pi[^1] | 1 | €66.30 | €66.30 | Raspberry Pi 4 Model B | Raspberry Pi | [Kubii](https://www.kubii.com/fr/cartes-nano-ordinateurs/2771-raspberry-pi-4-modele-b-2gb-5056561800332.html) |
| SD card | 1 | €16.20 | €16.20 | Ultra microSDHC 32 GB | SanDisk | [Kubii](https://www.kubii.com/fr/support-de-stockage/2794-1488-carte-micro-sd-sandisk-classe-10-3272496311411.html#/capacite_de_stockage-32_gb) |
| Servomotor[^3] | 12 | €19.67 | €235.98 | STS3215-C001 | Feetech | [AliExpress](https://fr.aliexpress.com/item/1005008958679306.html) |
| Camera[^2] | 1 | €19.49 | €19.49 | IMX219-D160 | Waveshare | [Amazon](https://www.amazon.fr/Waveshare-IMX219-D160-Compatible-Supporting-Resolution/dp/B07H2D4WYR/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1) |
| Microswitch | 4 | €0.26 | €5.19 | WK1-04A-13.5P | JZK | [Amazon](https://www.amazon.fr/gp/product/B0D6FNMY6R/ref=ox_sc_act_title_2?smid=A167QJB1GLPJYG&psc=1) |
| Fan | 1 | €15.90 | €15.90 | Noctua NF-A4x10 PWM | Noctua | [Amazon](https://www.amazon.fr/gp/product/B07DXRNYNX/ref=ox_sc_act_title_3?smid=A38F5RZ72I2JQ&psc=1) |
| Speaker | 1 | €4.10 | €8.19 | 4R3W | Xevtrak | [Amazon](https://www.amazon.fr/Compatible-Performance-Haut-Parleur-Publicitaire-Haut-Parleurs/dp/B0GVJL8PCC/ref=sr_1_21?sr=8-21) |
| LED ring[^4] | 1 | €4.09 | €4.09 | WS2812B COB Pixel Ring | Shenzhen Xinxuan Technology Co., Ltd. | [AliExpress](https://fr.aliexpress.com/item/1005010649384045.html) |
| M2 screws | 4 | — | — | — | — | — |
| Short M2.5 screws | 2 | — | — | — | — | — |
| Long M2.5 screws | 4 | — | — | — | — | — |
| M3 screws | 7 | — | — | — | — | — |
| Short M3 screws | 2 | — | — | — | — | — |
| M2.5 nuts | 6 | — | — | — | — | — |
| M2 threaded insert | 4 | — | €5.88 | M2 threaded insert (pack of 50) | Bolatus | [Amazon](https://www.amazon.fr/Bolatus-M2-filetage-plastique-dimprimante/dp/B0F2TGV78Y/ref=sr_1_10?sr=8-10) |
| M3 threaded insert | 7 | — | €6.88 | M3 threaded insert (pack of 50) | Bolatus | [Amazon](https://www.amazon.fr/Bolatus-M2-filetage-plastique-dimprimante/dp/B0F2TFB847/ref=sr_1_10?sr=8-10) |
| PLA filament (standard) | 542.84 g | — | — | — | — | — |
| TPU filament | 14.44 g | — | — | — | — | — |

[^1]: The software architecture is designed to run on the Raspberry Pi 4, 5 and 2W. Note that all testing so far has been done on a Raspberry Pi 4 Model B with 8GB of RAM, so some adjustments are to be expected for the other models.
[^2]: This camera is sold without a mount (Raspberry Pi Camera Module v2): you can either buy a camera fitted with an equivalent module and replace the IMX219-D160 with it, or skip the IMX219-D160 and directly use the camera of your choice with its mount.
[^3]: Make sure to pick the 7.4V version. If you want more powerful servomotors, Chromapi's architecture is permissive enough to use the 12V version, provided the power supply is adapted accordingly. The motors are sold in packs of 6: you therefore need to order this reference twice to get the 12 required servomotors.
[^4]: Make sure to pick the 18-LED version with a 27mm diameter.
