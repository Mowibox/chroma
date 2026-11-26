---
title: "Mise à jour"
slug: "mise-a-jour"
description: "Mise à jour du SDK et du firmware de la carte mère."
summary: "Mise à jour du SDK et du firmware de la carte mère."
date: 2026-11-12
lastmod: 2026-11-15
draft: false
weight: 20
toc: true
icon: "refresh"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Mettre à jour Chromapi : comment mettre à jour le SDK Python du robot, puis le firmware de la carte mère, pour garder le robot à jour."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Chromapi a deux logiciels à tenir à jour : le **SDK**, sur le Raspberry Pi, et le **firmware**, sur la carte mère. Le firmware est livré avec le SDK : on met donc à jour le SDK d'abord, puis le firmware.

## Connaître les versions installées

Dans l'application web, **Settings › About** affiche les versions du SDK et du firmware. En SSH :

```bash
chromapi version
```

## Mettre à jour le SDK

<!-- TODO : confirmer la procédure et l'emplacement du dépôt sur Chromapi OS -->

Connectez-vous au robot en SSH, puis récupérez la dernière version :

```bash
cd ~/chromapi
git pull
./deploy/setup_rpi.sh
sudo reboot
```

Le script `setup_rpi.sh` met à jour les dépendances et les services. Il peut être relancé sans risque.

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Vos calibrations sont conservées : elles sont enregistrées à part, dans `~/.config/chromapi/calibration.yaml`.
{{< /callout >}}

## Mettre à jour le firmware

Quand le SDK contient un firmware plus récent que celui de la carte mère, l'application web le signale.

1. Couchez le robot : les servomoteurs se relâchent pendant l'opération.
2. Dans **Settings › Maintenance**, lancez **Update the firmware**.
3. Laissez la carte mère allumée jusqu'à la fin.

En ligne de commande, après être passé en **Developer mode** :

```bash
chromapi flash
```

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Ne coupez jamais l'alimentation pendant la mise à jour du firmware. Si elle est interrompue, relancez-la.
{{< /callout >}}

## Vérifier

```bash
chromapi version
chromapi health
```

`chromapi version` doit afficher la même version du protocole pour le SDK et le firmware. Si elles diffèrent, l'un des deux n'est pas à jour.

## Repartir d'une image neuve

Pour repartir de zéro, [flashez à nouveau]({{< relref "chromapi/getting-started/installation/" >}}) la carte SD avec la dernière image de Chromapi OS. Les calibrations sont alors à refaire : voir le [premier démarrage]({{< relref "chromapi/getting-started/first-start/" >}}).
