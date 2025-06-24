---
title: "Initiation à la conception de circuits imprimés – Partie 2"
summary: Avec le logiciel KiCad - Routage
weight: 6003
icon: "chip"
---

<p align="center">
    <img src="/chroma/images/pcb.png" alt="PCB image" class="w-full h-auto" />
</p>

## Prérequis

* Avoir complété [l'initiation à la conception de circuits imprimés – Partie 1]({{< relref "tutorials/electronics/introduction_to_pcb_design_part1/">}})

## Objectif

<p align="center">
    <img src="/chroma/images/schematic1.png" alt="PCB example" class="w-full h-auto" />
</p>

Le but de cette initiation de réaliser un petit circuit imprimé avec des composants simples (LED, buzzers, résistances…) qui pourrait par la suite être branché et utilisé avec une carte électronique.

Dans la section précédente, nous avions déjà réalisé le circuit électronique via l'éditeur de schématique. Dans cette partie, nous allons préparer le circuit pour sa fabrication en organisant les composants et leurs connexions sur la carte.

## Routage

<p align="center">
    <img src="/chroma/images/routing1.jpg" alt="PCB editor" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing2.jpg" alt="PCB editor page" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Ouvrir l'éditeur de PCB KiCad.**
{{< /callout >}}

### Importation des composants

<p align="center">
    <img src="/chroma/images/routing3.jpg" alt="Import component symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing4.jpg" alt="Page with components" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Importer les composants depuis votre schéma vers l’éditeur de PCB.**
{{< /callout >}}

### Contours du PCB

<p align="center">
    <img src="/chroma/images/routing5.jpg" alt="Edges tools" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing6.jpg" alt="PCB edges" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Sélectionner la couche "Edge.Cuts" et tracer le contour de votre PCB avec les outils "Ligne" et "Arc de cercle".**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Prévoyez environ un carré de 30 mm x 30 mm pour pouvoir placer tous les composants à l’intérieur. Vous pouvez aussi tenter de le faire plus petit, entièrement rond... En d'autres termes, personne ne vous oblige à faire comme sur l'image !
{{< /callout >}}

### Plan de masse

La masse est le signal le plus important du PCB, puisqu’elle se trouvera quasiment partout. Nous allons donc générer des zones entières constituées de ce signal, appelées plans de masse. Faire un plan de masse sur les deux faces du PCB permet, entre autres, de :

* Réduire l’impédance des fils au minimum.
* Connecter automatiquement à la masse les composants qui en ont besoin.
* C’est plus écologique !

<p align="center">
    <img src="/chroma/images/routing7.jpg" alt="Draw filled zones" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing8.jpg" alt="Ground plane" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Sélectionner la couche "F.Cu" et cliquer sur "Tracer Zones Remplies". Sélectionner "GND" puis valider, et encadrer le contour du PCB avec. Faire de même avec la couche "B.Cu".**
{{< /callout >}}

### Placement des composants

<p align="center">
    <img src="/chroma/images/routing9.jpg" alt="Component placemen" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Placer les composants comme bon vous semble dans les contours de votre carte, puis regénérer le plan de masse (raccourci-touche "B").**
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing10.jpg" alt="3D View" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Vous pouvez commencer à avoir un aperçu 3D de votre carte en allant sur le menu "Affichage" puis "Visu 3D". Qu’elle est belle !
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing11_fr.png" alt="Grid" class="w-full h-auto" />
</p>

{{< callout context="tip" title="Le saviez-vous ?" icon="outline/message-dots" >}}
Vous pouvez ajuster l’écart entre les points de la grille en faisant un clic droit dans la zone de travail, puis en sélectionnant "Grille". Vous pourrez ainsi placer les composants de manière plus précise.
{{< /callout >}}

### Classes d'équipotentielles

Avant de commencer le routage de la carte, il faut définir ce que l'on appelle des classes d'équipotentielles :

> _En électricité, l'équipotentielle est l'ensemble des conducteurs électriques soumis à la même tension électrique, et ne possédant donc pas de différence de potentiel électrique. Une liaison équipotentielle a pour but d'uniformiser le potentiel électrique sur un certain espace. [(Wikipedia)](https://fr.wikipedia.org/wiki/%C3%89quipotentielle#%C3%89lectricit%C3%A9)_

<p align="center">
    <img src="/chroma/images/routing12.jpg" alt="Net classes symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing13_fr.png" alt="Net classes window" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Aller dans les "Options CI" puis dans la section "Classes d'Equipots" et modifier les paramètres suivants de la classe "Default" :**

* **Isolation : 0.3mm**
* **Largeur de Piste : 0.3mm**
* **Diamètre de Via : 0.8mm**
* **Trou de Via : 0.4mm.**

{{< /callout >}}

Ainsi, toutes les pistes des signaux avec la catégorie "Default" auront ces paramètres. Pratique !

Très souvent, les pistes qui vont faire passer l'alimentation du circuit peuvent faire passer des courants plus importants. Cela conduit à une puissance dissipée non négligeable. Pour y remédier, nous allons créer une équipotentielle dédiée aux signaux d'alimentation comme le +5V ou le GND. La largeur de ces pistes sera plus grande pour réduire l'impédance de ligne.

<p align="center">
    <img src="/chroma/images/routing14.jpg" alt="Plus symbol" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Avec le premier bouton « + », créer une deuxième classe « Power » et lui attribuer les paramètres :**

* **Isolation : 0.3mm**
* **Largeur de Piste : 0.5mm**
* **Diamètre de Via : 1.2mm**
* **Trou de Via : 0.6mm**
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing14.jpg" alt="Plus symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing15_fr.png" alt="Net classes assignment" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Avec le deuxième bouton "+", créer tous les signaux du circuit (+5V, GND, LED1,…) et leur attribuer la bonne classe (Power pour +5V et GND, Default pour les autres).**
{{< /callout >}}

### Là où l'initiation "routage" prend tout son sens

<p align="center">
    <img src="/chroma/images/routing16.jpg" alt="Track symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing17.jpg" alt="Routing" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Relier toutes les pistes comme indiquées par le chevelu (X).**
{{< /callout >}}

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Il faut éviter au maximum les angles droits avec les pistes ! Ils créent du rayonnement électromagnétique (IEM) qui altèreront les performances de votre PCB.
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Bon courage ! Si vous avez des difficultés à tous relier, il faudra peut-être revoir la position de certains composants, mais sachez que vous pouvez aussi router sur la face arrière "B.Cu". N'hésitez pas à sortir des sentiers battus en testant des choses !
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing18.jpg" alt="Track symbol" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Une autre alternative serait d’alterner entre les deux couches en passant par un "trou". C’est le rôle d’un via. Lorsque vous tracez une piste, appuyez sur "V" et un via apparaîtra.
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing19.jpg" alt="Text symbol" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Vous pouvez écrire du texte sur une des faces de votre PCB (Ctrl + Shift + T) et regénérer votre plan de masse pour avoir votre texte en relief. Et tiens, en parlant de plan de masse, n’oubliez pas de le regénérer une fois que tout est fini !
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/routing20.png" alt="Whole design" class="w-full h-auto" />
</p>

### Analyse de la qualité du routage

De la même manière qu'avec [l'ERC]({{< relref "tutorials/electronics/introduction_to_pcb_design_part1/#analyse-de-la-qualité-du-schéma">}}) dans le schématique, il faut vérifier que le routage ne contient aucune erreur : cela se fait avec le Contrôle des Règles de Conception (dit Design Rules Checker en anglais - DRC).

<p align="center">
    <img src="/chroma/images/routing21.jpg" alt="DRC symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/routing22_fr.png" alt="DRC window" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Exécuter le DRC (Design Rules Checker) et corriger les erreurs éventuelles.**
{{< /callout >}}

**Et voilà un PCB terminé !**

<p align="center">
    <img src="/chroma/images/schematic1.png" alt="PCB finished" class="w-full h-auto" />
</p>

## Pour aller plus loin

---

## Crédits

* **Auteur :** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Dernière mise à jour :** Juin 2025
* **Contribueurs :** Loubna LATRECHE
