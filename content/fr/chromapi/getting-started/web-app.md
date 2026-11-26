---
title: "Application web"
slug: "application-web"
description: "Piloter Chromapi depuis un téléphone ou un PC, avec ou sans manette."
summary: "Piloter Chromapi depuis un téléphone ou un PC, avec ou sans manette."
date: 2026-11-12
lastmod: 2026-11-21
draft: false
weight: 40
toc: true
icon: "device-mobile"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Pilotez Chromapi avec l'application web : contrôlez le robot quadrupède depuis un téléphone ou un PC, avec ou sans manette, depuis le navigateur."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp1.png" alt="Application web de Chromapi" class="w-full h-auto" />
</p>

L'application web permet de contrôler Chromapi : elle tourne en continu sur le robot et s'ouvre dans le navigateur d'un téléphone ou d'un ordinateur, sans rien installer.

## Se connecter

Sur le même réseau que le robot, ouvrez `https://chromapi.local:5000`, ou `https://<nom-du-robot>.local:5000` s'il y a plusieurs robots.

* **Code d'accès** : le premier visiteur le choisit (6 caractères au minimum), les appareils suivants doivent le saisir. Il se change dans **Settings › Access**, ce qui déconnecte les autres appareils.
* **Code oublié** : en SSH sur le robot, lancez `chromapi access reset`. Le prochain visiteur en choisira un nouveau.
* **Un seul pilote à la fois** : si quelqu'un pilote déjà, les autres appareils voient la caméra et l'état du robot sans pouvoir le commander.

## Piloter Chromapi avec l'application

Appuyez sur **Wake up** pour que Chromapi se lève, appuyez à nouveau pour le recoucher. Une fois debout, voici à quoi sert chaque élément de l'interface :

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp2.png" alt="Interface de l'application web Chromapi" class="w-full h-auto" />
</p>

| N° | Élément | Effet |
| :---: | :--- | :--- |
| 1 | **Wake up** / **Lie down** | Réveiller ou coucher Chromapi |
| 2 | Joystick **Walk** | Se déplacer dans toutes les directions (**Shift** en mode Lean : décale le corps) |
| 3 | Joystick **Turn** | Tourner sur place (**Lean** en mode Lean : incline le corps) |
| 4 | Curseur **Speed** | Changer la vitesse de marche (de 25 à 200 %, limitée à 100 % quand la batterie est faible) |
| 5 | Curseur **Height** | Changer la hauteur du corps (de -40 à +20 mm) |
| 6 | Bandeau du haut | Batterie (appuyez dessus pour afficher la charge sur l'œil), température du Raspberry Pi, liaison avec la carte mère, nombre de spectateurs |
| 7 | Bouton smiley | Ouvrir le menu des **Emotes** |
| 8 | Bouton ☰ | Ouvrir le [menu](#menu-) |
| 9 | Bouton microphone | Maintenir pour parler à travers le haut-parleur de Chromapi |
| 10 | Bouton casque | Écouter à travers le microphone de Chromapi |
| 11 | Bouton engrenage | Ouvrir les [paramètres](#paramètres) |
| 12 | Bouton appareil photo | Prendre une photo |
| 13 | Bouton rouge | Enregistrer une vidéo |
| 14 | Bouton éclair | Passer l'œil de Chromapi en mode lampe torche |
| 15 | Bouton d'alimentation | [Éteindre, redémarrer ou passer en mode développeur](#alimentation) |

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Sur ordinateur, Chromapi se pilote aussi au clavier :

| Touche | Effet |
| :--- | :--- |
| <kbd>Z</kbd> <kbd>Q</kbd> <kbd>S</kbd> <kbd>D</kbd> (<kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> en QWERTY) | Se déplacer, comme le joystick gauche |
| Flèches | Tourner ou incliner le corps, comme le joystick droit |
| <kbd>Entrée</kbd> | **Wake up** / **Lie down** |
| <kbd>Échap</kbd> | Fermer le menu ou la fenêtre ouverte |

{{< /callout >}}

## Menu ☰

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp3.png" alt="Menu de l'application web" class="w-full h-auto" />
</p>

### Mode de déplacement

* Mode **Turn** : C'est le mode de déplacement par défaut de Chromapi. Dans ce mode, le joystick gauche fait marcher Chromapi et le joystick droit le fait tourner.
* Mode **Lean** : Dans ce mode, Chromapi reste sur place. Le joystick gauche décale son corps, tandis que le joystick droit l'incline.

{{< callout context="tip" title="Le saviez-vous ?" icon="outline/message-dots" >}}
En mode **Lean**, Chromapi garde son corps le plus à l'horizontale possible. S'il est sur une planche, essayez de l'incliner doucement pour voir le résultat !
{{< /callout >}}

### État détaillé du robot

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_webapp4.png" alt="Panneau Diagnostics affiché sur la vidéo" width="800" />
</p>

L'option **Diagnostics on the video** permet d'afficher ou non un panneau d'informations par-dessus le flux caméra :

| Ligne | Signification |
| :--- | :--- |
| Link | État de la liaison avec la carte mère |
| Battery | Charge de la batterie, tension, courant et puissance |
| Servos | Nombre de servomoteurs qui répondent |
| Hottest | Température du servomoteur le plus chaud |
| Pi | Température du Raspberry Pi |
| Tilt | Inclinaison du corps |
| Feet | Pattes au sol (en simulation) |

Toutes ces informations sont également accessibles dans les [paramètres](#paramètres).

### Allure du robot

Chromapi possède deux types d'allure :

* Mode **Trot** : allure par défaut de Chromapi. Rapide, deux pattes en diagonale bougent ensemble.
* Mode **Crawl** : Chromapi prend une allure plus lente et plus stable, une seule patte bouge à la fois.

| <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_trot.gif" alt="Chromapi en Trot" width="240" /> | <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_crawl.gif" alt="Chromapi en Crawl" width="240" /> |
| :---: | :---: |
| Trot | Crawl |

### Couleur de l'œil de Chromapi

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_eye.gif" alt="Couleurs de l'œil de Chromapi" width="220" />
</p>

Le curseur vous permet de choisir la couleur de votre choix pour l'œil de Chromapi.
Le bouton **Idle** rend à Chromapi sa couleur violette par défaut, et le bouton **Rainbow** lui donne une couleur arc-en-ciel.

### Ventilateur interne

Le ventilateur permet de réguler la température interne de Chromapi. Par défaut sur **Auto**, le robot règle lui-même la vitesse du ventilateur selon sa température. Modifier la valeur du curseur fixe la vitesse du ventilateur manuellement.

### Galerie multimédia

Le bouton **Gallery** rassemble les photos et vidéos prises avec la caméra. Elles sont stockées sur le robot, d'où vous pouvez les consulter, les télécharger et les supprimer.

## Paramètres

| Section | Contenu |
| :--- | :--- |
| **Maintenance** | Les outils du [premier démarrage]({{< relref "chromapi/getting-started/first-start/" >}}) : mise à jour du firmware, calibration des servomoteurs et de l'IMU, configuration de nouveaux servomoteurs, rapport de support à télécharger. L'application signale quand un nouveau firmware est disponible. |
| **Controller** | Manette connectée, [appairage](#appairage), contrôle de l'inclinaison du robot avec la manette |
| **Access** | Modifier le code d'accès au robot (déconnecte les autres appareils) |
| **Diagnostics** | Le détail de l'état du robot, comme le [panneau sur la vidéo](#état-détaillé-du-robot) |
| **About** | Nom du robot, versions du SDK et du firmware. **Identify** permet de reconnaître un robot parmi plusieurs avec un cri. |

## Alimentation

Le bouton d'alimentation propose trois options. Dans tous les cas, Chromapi se couche d'abord.

* **Power off** : Chromapi s'éteint proprement. Vous pouvez ensuite basculer son interrupteur pour couper son alimentation.
* **Restart** : Chromapi redémarre. La page se reconnecte au bout d'une minute environ.
* **Developer mode** : Option pour les développeurs. L'application s'arrête, pour libérer le port série et travailler sur Chromapi en SSH. L'interface web revient avec la commande `sudo systemctl start chromapi@$USER` ou au prochain allumage du robot.

## Piloter Chromapi avec une manette

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/gifs/chromapi_gamepad.gif" alt="Chromapi piloté à la manette" width="600" />
</p>

Il est également possible de contrôler Chromapi avec une manette Bluetooth.

### Appairage

1. Dans **Settings › Controller**, choisissez **Pair a controller**.
2. Maintenez le bouton d'appairage de la manette jusqu'à ce que sa lumière clignote rapidement, puis appuyez sur **Start**.

Une fois appairée, la manette se reconnecte toute seule à l'allumage.

En mode **Lean**, l'option **Lean with the controller's tilt** (dans **Settings › Controller**) vous permet d'incliner le robot en inclinant la manette.

Quand la batterie de la manette passe sous 20 %, elle vibre et l'application affiche un message.

### Boutons

| Bouton | Effet |
| :--- | :--- |
| Stick gauche | Marcher (mode **Turn**) ou décaler le corps (mode **Lean**) |
| Stick droit | Tourner (mode **Turn**) ou incliner le corps (mode **Lean**) |
| Croix | Réveiller ou coucher le robot |
| Carré | Saluer, alternativement gauche et droite |
| Triangle | Coup de patte, alternativement gauche et droite |
| Rond | Jouer une humeur |
| L2 / R2 | Choisir une humeur (la barre lumineuse de la manette prend sa couleur) |
| L1 | Allumer ou éteindre la lampe torche |
| L3 | Changer d'allure : Trot ou Crawl |
| R3 | Changer de mode de déplacement : Turn ou Lean |
| Share | Afficher la charge de la batterie sur l'œil et sur la barre lumineuse de la manette |
| Croix directionnelle haut / bas | Monter ou baisser le corps |
| Croix directionnelle gauche / droite | Monter ou baisser la vitesse (par pas de 25 %) |
| START maintenu 3 s | Éteindre le robot |
