---
title: "Dépannage et FAQ"
slug: "depannage"
description: "À chaque problème sa solution."
summary: "À chaque problème sa solution."
date: 2026-11-12
lastmod: 2026-11-15
draft: false
weight: 10
toc: true
icon: "first-aid-kit"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Dépannage et FAQ de Chromapi : les problèmes les plus courants rencontrés avec le robot quadrupède et la solution à chacun d'eux."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Avant tout, demandez au robot ce qui ne va pas : **Settings › Diagnostics** dans l'application web, ou `chromapi health` en SSH. Chaque problème y est nommé, avec ce qu'il faut faire.

Si cela ne suffit pas, **Settings › Maintenance › Support report** (ou `chromapi report`) écrit un rapport à joindre à votre message sur [Discord](https://discord.gg/SUQTs6QV3M). Il ne contient ni mot de passe ni configuration réseau.

## Connexion

### L'application web ne s'ouvre pas

* Au premier démarrage, le système met quelques minutes à se configurer. Patientez.
* Votre appareil doit être **sur le même réseau Wi-Fi** que le robot.
* L'adresse commence par `https://` et se termine par `:5000`.
* S'il y a plusieurs robots sur le réseau, utilisez le nom propre au vôtre : voir [Retrouver le robot sur le réseau]({{< relref "chromapi/getting-started/installation/#retrouver-le-robot-sur-le-réseau" >}}).
* L'application est peut-être en mode développeur : éteignez et rallumez le robot, ou lancez `sudo systemctl start chromapi@$USER` en SSH.

### Le robot ne rejoint pas le Wi-Fi

Vérifiez le nom et le mot de passe du réseau dans le fichier `network-config.yaml` de la carte SD : voir [Ajouter des réseaux Wi-Fi]({{< relref "chromapi/getting-started/installation/" >}}).

<!-- TODO : préciser les contraintes Wi-Fi connues (2,4 GHz / 5 GHz, réseaux d'entreprise) -->

### Le navigateur affiche un avertissement de sécurité

C'est normal : chaque robot fabrique son propre certificat, que le navigateur ne connaît pas. Choisissez « Avancé » puis « Continuer vers le site ».

### J'ai oublié le code d'accès

En SSH, lancez `chromapi access reset`. Le prochain visiteur choisira un nouveau code.

### Je vois la caméra mais je ne peux pas piloter

Un seul appareil pilote à la fois. Les autres voient la caméra et l'état du robot.

## Alimentation

### Le robot ne s'allume pas

* Vérifiez la polarité des deux batteries dans leur support.
* Rechargez le robot par le port USB-C de la carte mère : après une décharge profonde, la protection coupe les batteries.
* Vérifiez les câbles du support des batteries (J1) et de l'interrupteur (J2).

### Le robot se couche et s'éteint tout seul

La batterie est vide. Chromapi prend un air fatigué sous 30 %, alerte sous 10 %, puis se couche et s'éteint. Rechargez-le.

### Le robot refuse de marcher

Sous 10 % de batterie, Chromapi ne démarre plus de marche. Rechargez-le.

## Servomoteurs

### Un servomoteur ne répond pas

`chromapi health` nomme l'articulation et son identifiant.

* Vérifiez le câble du servomoteur et celui du servomoteur précédent dans la patte.
* Si la vérification signale un servomoteur sur un identifiant inattendu, il n'a pas reçu le sien : refaites **Set up new servos** pour ce servomoteur.
* Deux servomoteurs avec le même identifiant ne répondent ni l'un ni l'autre correctement : débranchez-en un et reconfigurez l'autre.

### Le robot est de travers ou une patte est décalée

Les servomoteurs ne sont pas calibrés, ou une patte a été démontée depuis. Relancez **Calibrate the servos**, robot soulevé.

### Le robot penche ou dérive en marchant

Relancez **Calibrate the IMU**, robot posé sur un sol plan, sans le toucher.

### Un servomoteur chauffe

Au-delà de 60 °C, le diagnostic le signale. Couchez le robot et laissez-le refroidir. Si le même servomoteur chauffe à chaque fois, vérifiez que la patte bouge librement et que rien ne force.

### Les LEDs des servomoteurs clignotent

La batterie est sous 10 % : la LED de statut de la carte mère et les LEDs des 12 servomoteurs clignotent ensemble. Rechargez le robot.

## Carte mère et firmware

### La carte mère ne répond pas

* Vérifiez que la carte mère est allumée et bien enfichée sur le Raspberry Pi.
* En ligne de commande, vérifiez que l'application web ne tient pas le port série : passez en **Developer mode**.

### Le firmware et le SDK ne se comprennent pas

Le diagnostic indique que le firmware est trop ancien ou que les versions du protocole diffèrent. [Mettez à jour]({{< relref "chromapi/help/update/" >}}) le firmware.

### La mise à jour du firmware a été interrompue

Relancez **Update the firmware**, et laissez la carte mère allumée jusqu'à la fin.

## Son et image

### Pas de son

* Vérifiez le câble du haut-parleur (J9).
* `chromapi health` vérifie que la carte son est reconnue.

### Pas d'image

Vérifiez la nappe de la caméra : elle doit être bien enfoncée et dans le bon sens, côté caméra comme côté Raspberry Pi.

## Manette

### La manette ne s'appaire pas

La manette doit être en mode appairage (sa lumière clignote rapidement) **avant** de lancer l'appairage. Si elle a déjà été appairée avec un autre appareil, éteignez le Bluetooth de celui-ci.

## Anneau de LEDs rouge

Si l'anneau s'allume en rouge, l'application web s'est arrêtée sur une erreur. Redémarrez le robot. Si cela se reproduit, envoyez un rapport de support sur Discord.

## FAQ

### Puis-je utiliser un autre Raspberry Pi ?

Le logiciel est prévu pour les Raspberry Pi 4, 5 et Zero 2 W, mais tous les essais ont été faits sur un Raspberry Pi 4 Model B. Prévoyez quelques adaptations pour les autres modèles.

### Combien de temps dure la batterie ?

Environ 2 heures selon l'usage, pour 3 heures de charge.

### Faut-il les microinterrupteurs des pieds ?

Non, la v1 de Chromapi ne les utilise pas.

### Puis-je programmer Chromapi sans le robot ?

Oui, en [simulation]({{< relref "chromapi/developing/simulation/" >}}).

### Où poser une question ?

Sur [Discord](https://discord.gg/SUQTs6QV3M), ou en ouvrant une [issue sur GitHub](https://github.com/Mowibox/chromapi/issues).
