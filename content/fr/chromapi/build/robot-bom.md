---
title: "Liste de matériel du robot"
slug: "liste-materiel-robot"
aliases: ["/chromapi/bom/robot_bom/"]
description: "Ce qu'il faut acheter, au-delà du PCB, pour en construire un."
summary: "Liste des pièces à acheter pour construire Chromapi au-delà du PCB : batterie, calcul, caméra, servomoteurs, prix, références et fournisseurs."
date: 2026-08-29
lastmod: 2026-11-16
draft: false
weight: 10
toc: true
icon: "shopping-cart"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Liste des pièces à acheter pour construire Chromapi au-delà du PCB : batterie, calcul, caméra, servomoteurs, prix, références et fournisseurs."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Cette page présente les différentes pièces à acheter pour construire Chromapi soi-même. Pour le détail des composants montés sur la carte mère voir la [Liste de matériel du PCB]({{< relref "chromapi/build/pcb-bom/" >}}).

{{< callout context="note" title="Notes" >}}

* Les prix sont basés sur des achats en France, donc les prix et les frais de livraison peuvent varier en fonction du pays d'achat et des disponibilités. Les informations tarifaires concernant les autres pays pourront être ajoutées au fur et à mesure.
* Certaines pièces ne peuvent être vendues que par lot, ce qui explique certains prix totaux.
* Contrairement aux autres composants de la liste, le PCB est une pièce que vous devez faire fabriquer. Le design open source est disponible sur GitHub et peut être commandé et assemblé chez n'importe quel fabricant de PCB. Son prix est d'environ 60€.
* La v1 de Chromapi n'utilise pas les microinterrupteurs, donc vous pouvez vous en affranchir !
{{< /callout >}}

| Composant | Qté | Prix unitaire | Prix total | Référence | Fabricant | Fournisseur |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Batteries 18650 | 2 | 3,99 € | 7,98 € | INR18650-P28A | Molicel | [Nkon](https://www.nkon.nl/fr/molicel-inr18650-p28a-2800mah-35a.html) |
| Support pour Batteries 18650 | 1 | 2,14 € | 2,14 € | HP157-BATTERY-TRAY | Radiomaster | [Radiomaster](https://radiomasterrc.com/products/replacement-2x18650-battery-tray-for-tx8-tx12-tx16) |
| Interrupteur d'alimentation | 1 | 0,63 € | 6,30 € | B0CH3JCQM5 | Rebower | [Amazon](https://www.amazon.fr/dp/B0CH3JCQM5?psc=1&ref=ppx_yo2ov_dt_b_product_details) |
| Raspberry Pi[^1] | 1 | 66,30€ | 66,30€ | Raspberry Pi 4 Modèle B | Raspberry Pi | [Kubii](https://www.kubii.com/fr/cartes-nano-ordinateurs/2771-raspberry-pi-4-modele-b-2gb-5056561800332.html) |
| Carte SD | 1 | 16,20 € | 16,20 € | Ultra microSDHC 32 Go | SanDisk | [Kubii](https://www.kubii.com/fr/support-de-stockage/2794-1488-carte-micro-sd-sandisk-classe-10-3272496311411.html#/capacite_de_stockage-32_gb) |
| Servomoteur[^3] | 12 | 19,67 € | 235,98 € | STS3215-C001 | Feetech | [AliExpress](https://fr.aliexpress.com/item/1005008958679306.html) |
| Caméra[^2] | 1 | 19,49 € | 19,49 € | IMX219-D160 | Waveshare | [Amazon](https://www.amazon.fr/Waveshare-IMX219-D160-Compatible-Supporting-Resolution/dp/B07H2D4WYR/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1) |
| Microinterrupteur | 4 | 0,26 € | 5,19 € | WK1-04A-13.5P | JZK | [Amazon](https://www.amazon.fr/gp/product/B0D6FNMY6R/ref=ox_sc_act_title_2?smid=A167QJB1GLPJYG&psc=1) |
| Ventilateur | 1 | 15,90 € | 15,90 € | Noctua NF-A4x10 PWM | Noctua | [Amazon](https://www.amazon.fr/gp/product/B07DXRNYNX/ref=ox_sc_act_title_3?smid=A38F5RZ72I2JQ&psc=1) |
| Haut-parleur | 1 | 4,10 € | 8,19 € | 4R3W | Xevtrak | [Amazon](https://www.amazon.fr/Compatible-Performance-Haut-Parleur-Publicitaire-Haut-Parleurs/dp/B0GVJL8PCC/ref=sr_1_21?sr=8-21) |
| Anneau LED[^4] | 1 | 4,09 € | 4,09 € | WS2812B COB Pixel Ring | Shenzhen Xinxuan Technology Co., Ltd. | [AliExpress](https://fr.aliexpress.com/item/1005010649384045.html) |
| Vis M2×6[^5] | 4 | — | 4,44 € | M2×6 CHC inox A2 (DIN 912 / ISO 4762), lot de 10 | Vis Express | [Vis-Express](https://www.vis-express.fr/vis-metaux-chc-btr-filetage-total-inox-a2-din-912-iso-4762/36711-vis-metaux-inox-a2-chc-btr-cle-de-15-hc15-filetage-total-m2x6.html) |
| Vis M2.5×12[^5] | 2 | — | 10,14 € | M2.5×12 CHC inox A2 (DIN 912 / ISO 4762), lot de 10 | Vis Express | [Vis-Express](https://www.vis-express.fr/vis-metaux-chc-btr-filetage-total-inox-a2-din-912-iso-4762/36723-vis-metaux-inox-a2-chc-btr-cle-de-2-hc2-m25x12-filetage-total.html) |
| Vis M2.5×35[^5] | 4 | — | 10,14 € | M2.5×35 tête cylindrique fendue, acier (DIN 84), lot de 10 | Vis Express | [Vis-Express](https://www.vis-express.fr/vis-metaux-tete-cylindrique-tc-fendue-din-84/374580-vis-metaux-tete-cylindrique-tc-fendue-m25x35-acier-brut.html) |
| Vis M3×8[^5] | 7 | — | 4,44 € | M3×8 CHC inox A2 (DIN 912 / ISO 4762), lot de 10 | Vis Express | [Vis-Express](https://www.vis-express.fr/vis-metaux-inox-a2-chc-btr-cle-de-8-hc8-filetage-total-din-912-din-912-iso-4762/36728-vis-metaux-inox-a2-chc-btr-cle-de-25-hc25-m3x8-filetage-total.html) |
| Vis M3×5[^5] | 2 | — | 4,44 € | M3×5 tête fraisée six pans creux inox A2 (ISO 10642), lot de 10 | Vis Express | [Vis-Express](https://www.vis-express.fr/vis-metaux-inox-a2-fhc-tete-fraisee-empreinte-hexagonale-creuse-hexagonal-creux-filetage-total-din-7991/36658-vis-metaux-inox-a2-fhc-tete-fraisee-empreinte-hexagonale-creuse-cle-de-2-hc2-m3x5-filetage-total.html) |
| Écrou M2.5[^5] | 6 | — | 4,44 € | Écrou hexagonal M2.5 inox A2 (DIN 934), lot de 10 | Vis Express | [Vis-Express](https://www.vis-express.fr/ecrou-hexagonale-inox-a2-wax-lubrifie-din-934-din-934-vs0100/36812-ecrou-hexagonal-hu-m25-inox-a2-wax-lubrifie.html) |
| Insert fileté M2 | 4 | — | 5,88 € | Insert fileté M2, lot de 50 | Bolatus | [Amazon](https://www.amazon.fr/Bolatus-M2-filetage-plastique-dimprimante/dp/B0F2TGV78Y/ref=sr_1_10?sr=8-10) |
| Insert fileté M3 | 7 | — | 6,88 € | Insert fileté M3, lot de 50 | Bolatus | [Amazon](https://www.amazon.fr/Bolatus-M2-filetage-plastique-dimprimante/dp/B0F2TFB847/ref=sr_1_10?sr=8-10) |
| Filament PLA (couleur n°1) | 989,61 g | 11,99 € | 11,99 € | PolyTerra PLA 1,75 mm, bobine de 1 kg, n'importe quelle couleur | Polymaker | [3DJake](https://www.3djake.fr/polymaker/polyterra-pla-charcoal-black) |
| Filament PLA (couleur n°2) | 4 g | 11,99 € | 11,99 € | PolyTerra PLA 1,75 mm, bobine de 1 kg, d'une couleur différente de la première | Polymaker | [3DJake](https://www.3djake.fr/polymaker/polyterra-pla-cotton-white) |
| Filament TPU | 14,44 g | 13,49 € | 13,49 € | TPU 95A noir 1,75 mm, bobine de 1 kg | Geeetech | [3DJake](https://www.3djake.fr/geeetech/tpu-black-1) |

{{< chromapi3d explode >}}

[^1]: L'architecture logicielle a été conçue pour s'adapter aux Raspberry Pi 4, 5 et 2W. Il faut noter qu'actuellement, tous les tests ont été réalisés avec une Raspberry Pi 4 Model B 8Go RAM donc quelques adaptations sont à prévoir pour les autres modèles.
[^2]: Cette caméra est vendue sans support (Raspberry Pi Camera Module v2) : vous pouvez acheter une caméra équipée d'un module équivalent et remplacer l'IMX219-D160 par celle-ci, ou ne pas acheter l'IMX219-D160 et directement utiliser la caméra de votre choix avec son support.
[^3]: Veillez à bien choisir la version 7,4V. Les moteurs sont vendus par lot de 6 : il faut donc commander cette référence deux fois pour obtenir les 12 servomoteurs nécessaires.
[^4]: Veillez à bien choisir la version à 18 LED avec le diamètre de 27mm.
[^5]: Prenez des lots de 10 : ils reviennent moins cher que les mêmes vis à l'unité. Les prix sont dégressifs, vérifiez-les sur la fiche au moment de commander.
