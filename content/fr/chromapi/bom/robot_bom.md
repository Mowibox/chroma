---
title: "Liste de matériel du robot"
description: "Ce qu'il faut acheter, au-delà du PCB, pour en construire un."
summary: "Liste des pièces à acheter pour construire Chromapi au-delà du PCB : batterie, calcul, caméra, servomoteurs, prix, références et fournisseurs."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
weight: 60
toc: true
icon: "shopping-cart"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Liste des pièces à acheter pour construire Chromapi au-delà du PCB : batterie, calcul, caméra, servomoteurs, prix, références et fournisseurs."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/bom/robot_bom/"
   noindex: false
   robots: "index, follow"
---

Cette page présente les différentes pièces à acheter pour contsruire Chromapi soi-même. Pour les composants montés sur la carte mère voir la [Liste de matériel du PCB]({{< relref "chromapi/bom/pcb_bom/" >}}).

{{< callout context="note" title="Notes" >}}

* Les prix sont basés sur des achats en France, les informations tarifaires concernant les autres pays pourront être ajoutées au fur et à mesure.
* Certaines pièces ne peuvent être vendus que par lot, ce qui explique certains prix totaux.
{{< /callout >}}

| Composant | Qté | Prix unitaire | Prix total | Référence | Fabricant | Fournisseur |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Batteries 18650 | 2 | 3,99 € | 7,98 € | INR18650-P28A | Molicel | [Nkon](https://www.nkon.nl/fr/molicel-inr18650-p28a-2800mah-35a.html) |
| Support pour Batteries 18650 | 1 | 2,14 € | 2,14 € | HP157-BATTERY-TRAY | Radiomaster | [Radiomaster](https://radiomasterrc.com/products/replacement-2x18650-battery-tray-for-tx8-tx12-tx16) |
| Interrupteur d'alimentation | 1 | 0,63 € | 6,30 € | B0CH3JCQM5 | Rebower | [Amazon](https://www.amazon.fr/dp/B0CH3JCQM5?psc=1&ref=ppx_yo2ov_dt_b_product_details) |
| Microinterrupteur | 4 | 0,26 € | 5,19 € | WK1-04A-13.5P | JZK | [Amazon](https://www.amazon.fr/gp/product/B0D6FNMY6R/ref=ox_sc_act_title_2?smid=A167QJB1GLPJYG&psc=1) |
| Raspberry Pi[^1] | 1 | 66,30€ | 66,30€ | Raspberry Pi 4 Modèle B | Raspberry Pi | [Kubii](https://www.kubii.com/fr/cartes-nano-ordinateurs/2771-raspberry-pi-4-modele-b-2gb-5056561800332.html) |
| Carte SD | 1 | 16,20 € | 16,20 € | Ultra microSDHC 32 Go | SanDisk | [Kubii](https://www.kubii.com/fr/support-de-stockage/2794-1488-carte-micro-sd-sandisk-classe-10-3272496311411.html#/capacite_de_stockage-32_gb) |
| Caméra[^2] | 1 | 19,49 € | 19,49 € | IMX219-D160 | Waveshare | [Amazon](https://www.amazon.fr/Waveshare-IMX219-D160-Compatible-Supporting-Resolution/dp/B07H2D4WYR/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1) |
| Servomoteur[^3] | 12 | 14,00 € | 168,00 € | STS3215-C001 | Feetech | — |
| Haut-parleur | 1 | 4,10 € | 8,19 € | 4R3W | Xevtrak | [Amazon](https://www.amazon.fr/Compatible-Performance-Haut-Parleur-Publicitaire-Haut-Parleurs/dp/B0GVJL8PCC/ref=sr_1_21?sr=8-21) |
| Ventilateur | 1 | 15,90 € | 15,90 € | Noctua NF-A4x10 PWM | Noctua | [Amazon](https://www.amazon.fr/gp/product/B07DXRNYNX/ref=ox_sc_act_title_3?smid=A38F5RZ72I2JQ&psc=1) |

[^1]: L'architecture logicielle a été conçue pour s'adapter aux Raspberry Pi 4, 5 et 2W. Il faut noter qu'actuellement, tous les tests ont été réalisés avec une Raspberry Pi 4 Model B 8Go RAM donc quelques adaptations sont à prévoir pour les autres modèles.
[^2]: Cette caméra est vendue sans support (Raspberry Pi Camera Module v2) : vous pouvez acheter une caméra équipée d'un module équivalent et vous remplacer l'IMX219-D160 par celle-ci, ou ne pas acheter l'IMX219-D160 et directement utiliser la caméra de votre choix avec son support.
[^3]: Veillez à bien choisir la version 7,4V. Si vous souhaitez des servomoteurs plus puissants, l'architecture de Chromapi est assez permissive pour utiliser la version 12V, sous réserve d'une alimentation adaptée.
