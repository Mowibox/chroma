---
title: "Premier démarrage"
slug: "premier-demarrage"
description: "Flasher le firmware, configurer et calibrer les servos, vérifier l'état du robot."
summary: "Flasher le firmware, configurer et calibrer les servos, vérifier l'état du robot."
date: 2026-11-12
lastmod: 2026-11-13
draft: false
weight: 30
toc: true
icon: "player-play"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Premier démarrage de Chromapi : flasher le firmware de la carte mère, configurer et calibrer les servos, puis vérifier l'état du robot."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Une fois l'OS [installé]({{< relref "chromapi/getting-started/installation/" >}}), la prochaine étape consiste à ouvrir l'application web afin de préparer et le calibrer Chromapi pour son montage.

Les étapes 1 à 3 ci-dessous se font **avant de monter le robot**, avec au minimum le Raspberry Pi, la carte mère et les batteries. Les étapes 4 à 6 demandent le robot entièrement monté.

## 1. Ouverture de l'application web

Depuis un téléphone ou un ordinateur (sur le même réseau que spécifié dans Raspberry Pi Imager), ouvrez :

```txt
https://chromapi.local:5000
```

ou `https://<nom-du-robot>.local:5000`.

{{< callout context="note" title="Avertissment de sécurité" icon="outline/info-circle" >}}
Lors de la première connexion, le navigateur signalera un certificat qu'il ne connaît pas. C'est un comportement normal car chaque robot fabrique le sien. Pour accéder à l'interface web, séléctionnez  "Avancé" puis "Continuer vers le site".
{{< /callout >}}

Lors de la première visite du site, l'application vous demandera de choisir un code d'au moins 6 caractères. Il sera demandé à chaque nouvel appareil qui voudra piloter le robot.

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_first_start1.png" alt="Choix du code d'accès" width="480" />
</p>

## 2. Mise à jour du firmware

Lorsque vous recevez votre carte électronique, celle-ci ne contient pas encore le programme permettant de piloter les moteurs de Chromapi. Pour intégrer le firmware à la carte mère, il est possible de passer par l'application web.

<p align="center">
    <img loading="lazy" decoding="async" src="/chroma/images/chromapi/chromapi_first_start2.png" alt="Settings › Maintenance › Update the firmware" width="380" />
</p>

Dans **Settings › Maintenance**, cliquez sur **Update the firmware**. L'application installe sur la carte mère le dernier firmware à jour.

{{< callout context="caution" title="Précaution" icon="outline/alert-triangle" >}}
Pendant toute la durée de la mise à jour, ne coupez pas l'alimentation du robot !
{{< /callout >}}

Les versions installées sont affichées dans la section **About**.

## 3. Configuration des servomoteurs

Les servomoteurs possèdent chacun un identifiant permettant de les distinguer lorsque des mouvements sont demandés. Par défaut, les douze servomoteurs ont tous le même identifiant (ID = 1). Il faut alors donner le sien à chacun, en reconfigurant leurs paramètres, un par un.

Douze servomoteurs neufs ont tous le même identifiant : il faut donner le sien à chacun, **un servomoteur à la fois**. L'outil **Set up new servos** vous guide patte par patte et vous indique à chaque étape quel servomoteur brancher et sur quel connecteur.

Une fois cette étape réalisée, vous pouvez éteindre votre robot et commencer à la monter en suivant les étapes de la page [Montage & câblage]({{< relref "chromapi/build/assembly/" >}}).

## 4. Calibration des servomoteurs

Une fois Chromapi monté, des outils de calibration sont disponibles afin de corriger les petits défauts liés au montage, à la fabrication des pièces, etc. En l'occurrence (bien que je ne doute pas de vos talents en montage !), les servomoteurs ne sont jamais exactement vissés au même angle : quelques degrés d'écart d'un moteur à l'autre suffisent pour que le robot ne se tienne pas droit. La calibration mesure ces écarts et les compense, afin que toutes les pattes partent de la même référence.

Lancez l'outil **Calibrate the servos**. L'opération dure quelques minutes. Durant la calibration, Chromapi va chercher le centre de chacune de ses articulation en balayant ses jambes jusqu'à ses butées mécaniques.

{{< callout context="note" title="Pendant la calibration" icon="outline/info-circle" >}}
Pensez à porter le robot par le chassis où à le placer en élévation de sorte à ce qu'a qu'aucune patte ne puisse toucher quoi que ce soit.
{{< /callout >}}

## 5. Calibration de la centrale inertielle (IMU)

Une centrale inertielle est un capteur qui permet de mesurer l'orientation de Chromapi par rapport à l'horizontale. Comme expliqué précédemment pour les servomoteurs, le montage n'est jamais parfait : la carte mère, sur laquelle se trouve le capteur, peut être légèrement inclinée dans le robot. La calibration mesure ce décalage afin que Chromapi sache quand il est réellement à plat.

Lancez l'outil **Calibrate the IMU**, pour que Chromapi mesure et corrige l'inclinaison de sa carte par rapport à l'horizontale.

{{< callout context="note" title="Pendant la calibration" icon="outline/info-circle" >}}

* Posez Chromapi sur un **sol bien plat**.
* Laissez Chromapi immobile pendant les 5 secondes de calibration.

{{< /callout >}}

## 6. Vérification

Pour s'assurer du bon fonctionnement de Chromapi, consultez la section **Settings › Diagnostics**. Cette section résume l'état de la carte mère, de la batterie, des servomoteurs et du Raspberry Pi. Tout est en ordre ? Chromapi est fin prêt à bouger ! Apprenez à le [piloter le robot avec l'application web]({{< relref "chromapi/getting-started/web-app/" >}}). S'il reste encore des problèmes, essayez de consulter la [page de dépannage]({{< relref "chromapi/help/troubleshooting/" >}}).

## Lignes de commande

Pour les développeurs, chacune des étapes mentionnées dans cette page est réalisable sans passer par l'interface web, en passant directement via la commande `chromapi`, en SSH :

| Étape | Commande |
| :--- | :--- |
| Mettre à jour le firmware | `chromapi flash` |
| Configurer les servomoteurs | `chromapi motors setup` |
| Calibrer les servomoteurs | `chromapi calibrate servos --all` |
| Calibrer la centrale inertielle | `chromapi calibrate imu` |
| Vérifier l'état du robot | `chromapi health` |
| Versions du SDK et du firmware | `chromapi version` |

{{< callout context="danger" title="Attention !" icon="outline/alert-triangle" >}}
L'application occupe le port série de la carte mère. Avant d'utiliser ces commandes, arrêtez-la via **Settings › Power › Developer mode**. Pour la relancer, exécutez la commande `sudo systemctl start chromapi@$USER`, ou redémarrez le robot.
{{< /callout >}}

La commande `chromapi health` liste ce qui ne va pas et ce qu'il faut faire. En cas de blocage, `chromapi report` (ou **Settings › Maintenance › Support report**) permet d'écrire un rapport sur l'état de votre robot qui peut être envoyé sur [Discord](https://discord.gg/SUQTs6QV3M).
