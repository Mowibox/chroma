---
title: "Consignes de sécurité"
slug: "securite"
description: "À savoir avant d'allumer le robot : batterie, pattes en mouvement, manipulation."
summary: "À savoir avant d'allumer le robot : batterie, pattes en mouvement, manipulation."
date: 2026-11-12
lastmod: 2026-11-13
draft: false
weight: 10
toc: true
icon: "alert-triangle"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Consignes de sécurité de Chromapi : ce qu'il faut savoir avant d'allumer le robot, sur la batterie, les pattes en mouvement et la manipulation."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Chromapi est un petit robot, mais il contient deux batteries lithium-ion et des servomoteurs assez costauds. Prenez quelques minutes pour lire cette page afin d'en garantir une utilisation sûre.

## Précautions d'alimentation

Chromapi est alimenté par deux cellules 18650 lithium-ion en série (voir les [caractéristiques électriques]({{< relref "chromapi/hardware/electrical/" >}})).

* **Respectez la polarité des batteries (+/-)** lorsque vous les placez dans leur support, et n'utilisez jamais une cellule qui semble abîmée. Veillez à ce que les deux cellules soient identiques (même référence, même âge).
* **Chargez le robot sous surveillance**, par le port USB-C de la carte mère, sur une surface qui ne craint pas la chaleur. Une charge complète prend environ 3 h.
* **Ne laissez pas le robot déchargé pendant des semaines**, il est préférable de le recharger avant de le ranger.

La carte mère a été conçue pour protéger les batteries contre la décharge excessive, les surintensités et les courts-circuits. De son côté, Chromapi vous prévient de son état de batterie : il prend un air fatigué quand la batterie est faible (sous 30%) et vous alerte quand la batterie est critique (sous 10%). Lorsque la batterie est vide, Chromapi se couche puis s'éteint de lui-même.

| <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_tired.gif" alt="Chromapi fatigué, batterie faible" width="240" /> | <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_alert.gif" alt="Chromapi en alerte, batterie critique" width="240" /> |
| :---: | :---: |
| Batterie faible (< 30%) : Chromapi est fatigué | Batterie critique (< 10%) : Chromapi vous alerte |

## Mouvements de Chromapi

* **Gardez les doigts loin des articulations** quand le robot est réveillé : les servomoteurs ne s'arrêtent pas s'ils rencontrent un doigt sur leur trajectoire.
* Faites marcher le robot **au sol**, de préférence sur une surface plane et dégagée.
* Ne laissez pas Chromapi sans surveillance avec de jeunes enfants ou des animaux.
* Pour porter Chromapi, il est conseillé de le **prendre par les flancs**, jamais par une patte.

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_safety1.png" alt="Chromapi tenu par les flancs" width="480" />
</p>

## Éteindre proprement le robot

Chromapi fonctionne grâce un Raspberry Pi : un ordinateur miniature dont le stockage mémoire est possible grâce à une carte SD. Tout comme la plupart des ordinateurs, couper l'alimentation pendant qu'il fonctionne peut endommager la carte SD. Pour éteindre Chromapi de manière propre :

1. Éteignez-le depuis l'[application web]({{< relref "chromapi/getting-started/web-app/" >}}) (via **Settings › Power › Power off**), ou en maintenant le bouton "START" de la manette pendant 3 secondes. Le robot se couche avant de s'éteindre.
2. Basculez l'interrupteur d'alimentation situé au dos du robot.

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Ne coupez jamais l'alimentation pendant une mise à jour ou une calibration ! Attendez toujours la fin de l'opération avant d'agir.
{{< /callout >}}
