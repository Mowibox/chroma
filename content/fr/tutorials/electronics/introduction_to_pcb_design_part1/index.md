---
title: "Initiation à la conception de circuits imprimés – Partie 1"
summary: Avec le logiciel KiCad - Schématique
weight: 6002
icon: "chip"
---

<p align="center">
    <img src="/chroma/images/pcb.png" alt="PCB image" class="w-full h-auto" />
</p>

Les circuits imprimés, ou dits PCB (de l'anglais Printed Circuit Board), sont au cœur de l'électronique moderne. C'est un ensemble de couches de cuivre séparées par un matériau isolant, vous les verrez souvent de couleur verte. Ils servent de support pour connecter et maintenir des composants, dans l'optique de construire une carte électronique.

Dans cette initiation, vous apprendrez à utiliser le logiciel KiCad pour concevoir un circuit imprimé simple, depuis le schéma électronique jusqu’au design du circuit pour sa fabrication.

_Pour toute remarque ou question, n'hésitez pas à m'envoyer un mail ([ousmane.thiongane@outlook.com](mailto:ousmane.thiongane@outlook.com))._

## Prérequis

* Un ordinateur avec le logiciel [KiCad](https://www.kicad.org/)
* C'est tout !

## Objectif

Le but de cette initiation de réaliser un petit circuit imprimé avec des composants simples (LED, buzzers, résistances…) qui pourrait par la suite être branché et utilisé avec une carte à microcontrôleur :

<p align="center">
    <img src="/chroma/images/schematic1.png" alt="PCB example" class="w-full h-auto" />
</p>

Cette réalisation se fait en deux parties :

* **Schématique :** C’est là qu'on réalise le schéma du montage, de la même manière que les montages qui sont proposés dans [l'initiation à la programmation embarquée.]({{< relref "tutorials/electronics/introduction_to_embedded_prog">}}) On peut retrouver ce genre de schémas dans des cours d'électronique.
* **Routage :** C’est là qu’on choisit la position des différents composants, que l’on connecte entre eux en les routant.

## Schématique

<p align="center">
    <img src="/chroma/images/schematic2_fr.png" alt="Schematic editor" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/schematic3.jpg" alt="Schematic editor page" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Créez un nouveau projet KiCad, puis ouvrez l'éditeur de schématique pour obtenir la page blanche ci-dessus.**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Vous pouvez modifier le cartouche en bas à droite de votre schématique en double-cliquant dessus. On y ajoute en général la date, la version, le titre, son nom en commentaire…
{{< /callout >}}

### Placement des composants

Pour notre carte, nous allons avoir besoin de placer les composants nécessaires sur la page. En voici la liste :

* 3 LEDs (LED)
* Un connecteur mâle à 7 broches (Conn_01x07_Pin)
* 4 résistances (R)
* 1 bouton poussoir (SW_Push)

<p align="center">
    <img src="/chroma/images/schematic4.jpg" alt="Components" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/schematic5.jpg" alt="Adding component" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Ajouter tous les composants nécessaires sur le schématique comme ci-dessus avec l'outil d'ajout de composants.**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Le raccourci-touche "A" permet aussi d’ajouter les composants ! Pour les prochaines missions, les raccourcis-touches vous seront donnés entre parenthèses s'ils existent.
{{< /callout >}}

### Connexion des composants

Nous allons maintenant connecter les composants entre eux avec des fils, mais aussi avec ce qu'on appelle des labels.

Un label local & global permettent de relier des composants sans avoir à les relier explicitement par un fil. C’est très pratique pour améliorer la lisibilité d’un schéma avec beaucoup de composants. Voici par exemple un schéma sans label :

<p align="center">
    <img src="/chroma/images/schematic6.jpg" alt="Without label" class="w-full h-auto" />
</p>

Et le même schéma avec un label (les deux schémas sont équivalents !) :

<p align="center">
    <img src="/chroma/images/schematic7.jpg" alt="With label" class="w-full h-auto" />
</p>

* **Label local :** Label fonctionnel pour une seule page du projet (Ce qu'on va utiliser dans cette initiation, puisque nous n'utilisons qu'une seule page).

<p align="center">
    <img src="/chroma/images/schematic8.jpg" alt="Local label" class="w-full h-auto" />
</p>

* **Label global :** Label fonctionnel pour toutes les pages d’un même projet.

<p align="center">
    <img src="/chroma/images/schematic9.jpg" alt="Global label" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/schematic10.jpg" alt="Wired circuit" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Relier les composants entre eux avec des fils (W) et des labels (L) et mettre l’alimentation "+5V" et la masse "GND" (A).**
{{< /callout >}}

{{< callout context="tip" title="Le saviez-vous ?" icon="outline/message-dots" >}}
Pour éviter les erreurs plus tard lors de la vérification du schéma, il faut placer un drapeau de puissance (PWR_FLAG) en parallèle au +5V et à la masse, comme sur l'image ci-dessous. Ce drapeau permet de signaler à KiCad d’où parviendra l’alimentation.
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/schematic11.jpg" alt="Power flags" class="w-full h-auto" />
</p>

### Numérotation des composants

Nous allons maintenant attribuer des numéros uniques à chacun des composants pour pouvoir les différencier.

<p align="center">
    <img src="/chroma/images/schematic12.jpg" alt="Annotate component symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/schematic13_fr.png" alt="Annotate component window" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Passer par l’outil de numérotation des composants pour vérifier la numérotation.**
{{< /callout >}}

### Analyse de la qualité du schéma

Votre schéma est maintenant terminé, mais il faut vérifier qu'il n'y a pas d'erreurs sur ce dernier. C'est le rôle du Contrôle des Règles Électriques (dit ERC en anglais pour Electrical Rules Checker).

<p align="center">
    <img src="/chroma/images/schematic20.jpg" alt="ERC stmbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/schematic14_fr.png" alt="ERC with errors" class="w-full h-auto" />
</p>

Dans l'exemple ci-dessus, il y'a eu un oubli de connexion entre la LED D1 et la masse. On rajoute alors le fil nécessaire et après relancement du l'ERC, les erreurs disparaissent :

<p align="center">
    <img src="/chroma/images/schematic15_fr.png" alt="ERC without errors" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Exécuter l’ERC et corriger le schéma jusqu’à ce qu’il n’y ait plus d’erreurs (si existantes).**
{{< /callout >}}

### Assignation des empreintes

Il faut maintenant donner à chacun des composants une empreinte qui va représenter sa forme et ses dimensions sur la carte électronique. Pour ce faire, on utilise l’outil d’affectation d’empreintes.

<p align="center">
    <img src="/chroma/images/schematic16.jpg" alt="Assign footprints symbol" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/schematic17.jpg" alt="Assign footprints window" class="w-full h-auto" />
</p>

L’outil est divisé en trois colonnes :

1. Les librairies d’empreinte disponibles
2. Les symboles de votre schéma et leur empreinte associée (pas d’empreintes pour le moment)
3. La liste des empreintes de tous les composants de KiCad

Pour éviter d'avoir un chercher une empreinte parmi toutes celles de KiCad, vous avez la possibilité d'appliquer 3 filtres de recherche :

<p align="center">
    <img src="/chroma/images/schematic18.jpg" alt="Footprint filters" class="w-full h-auto" />
</p>

1. Filtrage des empreintes définies pour le symbole sélectionné
2. Filtrage par nombre de broches du symbole sélectionné
3. Filtrage par librairies sélectionnées dans la colonne de gauche

_Dans cet exemple, vous pouvez activer les 3 filtres en même temps en cochant les cases associées._

<p align="center">
    <img src="/chroma/images/schematic19.jpg" alt="Footprint assignation" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Affecter les empreintes indiquées ci-dessus à chacun des composants.**
{{< /callout >}}

Une fois tout cela de fait et plus aucune erreur sur l’ERC, nous allons pouvoir passer à la conception du PCB dans la partie suivante.

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Dernière mise à jour :** Juin 2025
* **Relecteur :** Loubna LATRECHE
