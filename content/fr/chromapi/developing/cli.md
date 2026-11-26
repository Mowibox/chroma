---
title: "Ligne de commande"
slug: "ligne-de-commande"
description: "La commande chromapi et ses outils."
summary: "La commande chromapi et ses outils."
date: 2026-11-12
lastmod: 2026-11-22
draft: false
weight: 50
toc: true
icon: "terminal"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Référence de la ligne de commande chromapi : découvrez la commande chromapi et les outils qu'elle fournit pour piloter le robot depuis un terminal."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

La commande `chromapi` regroupe tous les outils du robot. Elle s'utilise en SSH sur le robot, ou sur votre ordinateur pour la simulation.

```bash
chromapi --help              # la liste des commandes
chromapi <commande> --help   # les options d'une commande
```

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
La commande `python -m chromapi` fonctionne aussi !
{{< /callout >}}

{{< callout context="danger" title="Attention !" icon="outline/alert-triangle" >}}
Sur le robot réel, l'application web occupe le port série de la carte mère. Avant d'utiliser une commande qui communique avec la carte mère, arrêtez-la via **Settings › Power › Developer mode**. Pour la relancer, exécutez la commande `sudo systemctl start chromapi@$USER`, ou redémarrez le robot.
{{< /callout >}}

Les commandes qui communiquent avec la carte mère (`version`, `health`, `flash`, `calibrate`) acceptent `--port` si celle-ci n'est pas sur le port série par défaut, `/dev/ttyAMA0`.

## Vue d'ensemble

| Commande | Rôle |
| :--- | :--- |
| `chromapi run` | Démarrer Chromapi et son application web |
| `chromapi sim` | Lancer la simulation à part, pour les scripts en `backend="sim-server"` |
| `chromapi version` | Voir les versions du SDK, du firmware et du protocole |
| `chromapi health` | Vérifier l'état du robot |
| `chromapi report` | Écrire un rapport de support |
| `chromapi flash` | Mettre à jour le firmware de la carte mère |
| `chromapi motors setup` | Configurer les servomoteurs |
| `chromapi calibrate servos` | Calibrer le centre des servomoteurs |
| `chromapi calibrate imu` | Calibrer la centrale inertielle |
| `chromapi gamepad pair` | Appairer une manette Bluetooth |
| `chromapi access reset` | Oublier le code d'accès de l'application web |

## chromapi run

Démarre le robot et son [application web]({{< relref "chromapi/getting-started/web-app/" >}}). Sur le robot, le service `chromapi@<utilisateur>` lance `chromapi run` automatiquement à l'allumage.

```bash
chromapi run          # sur le robot
chromapi run --sim    # sur un PC, en simulation
```

| Option | Effet |
| :--- | :--- |
| `--sim` | Robot simulé dans MuJoCo |
| `--port` | Port de l'application (5000 par défaut) |
| `--host` | Adresse d'écoute (`0.0.0.0` par défaut) |
| `--no-camera` | Ne pas ouvrir la caméra |
| `--camera-index` | Numéro de la caméra à ouvrir |
| `--record-dir` | Dossier des vidéos enregistrées (`~/chromapi_recordings` par défaut) |
| `--http` | Lance une page HTTP au lieu de HTTPS. Le microphone du téléphone ne fonctionne plus, et le trafic est lisible sur le réseau |

## chromapi sim

Lance la [simulation]({{< relref "chromapi/developing/simulation/#garder-la-simulation-ouverte" >}}) seule, sur votre ordinateur. Vos scripts s'y connectent avec `backend="sim-server"`, et peuvent s'arrêter et se relancer sans la fermer.

```bash
chromapi sim
```

| Option | Effet |
| :--- | :--- |
| `--follow` | La caméra suit le robot |
| `--headless` | Sans fenêtre (Ctrl+C pour stopper le simulateur) |

## chromapi version

Affiche les versions du SDK et du firmware, et la version du [protocole]({{< relref "chromapi/hardware/protocol/" >}}) que parle chacun. Si elles diffèrent, la commande le signale : il faut [mettre à jour]({{< relref "chromapi/help/update/" >}}) l'un des deux. La commande renvoie le code 1 si les versions sont incompatibles ou si la carte mère ne répond pas.

## chromapi health

Vérifie le robot sans rien faire bouger : port série, carte son, ventilateur, calibrations, carte mère, firmware, batterie, centrale inertielle et servomoteurs. Chaque ligne est `OK`, `WARN` ou `FAIL`, avec ce qu'il faut faire.

La commande renvoie le code 1 si une vérification échoue. Voir le [dépannage]({{< relref "chromapi/help/troubleshooting/" >}}).

## chromapi report

Écrit un rapport de support dans `~/chromapi_report_<date>.txt` : versions, état du robot, calibration, services et journaux récents. Il ne contient ni mot de passe ni configuration réseau, et les adresses du réseau local sont masquées. Joignez-le à votre message sur le [Discord](https://discord.gg/SUQTs6QV3M) pour obtenir de l'aide.

| Option | Effet |
| :--- | :--- |
| `--output` | Chemin du fichier de rapport (`~/chromapi_report_<date>.txt` par défaut) |

## chromapi flash

Installe sur la carte mère le firmware livré avec le SDK, ou un fichier `.hex` de votre choix.

```bash
chromapi flash
chromapi flash chemin/vers/firmware.hex
```

Les servomoteurs se relâchent pendant l'opération : couchez le robot avant. `--yes` ne demande pas de confirmation.

## chromapi motors setup

Attribue un identifiant à chaque servomoteur et configure automatiquement ses réglages.

```bash
chromapi motors setup          # servomoteurs neufs : un seul branché à la fois
chromapi motors setup --all    # robot monté : réécrit les réglages des 12, sans changer les identifiants
chromapi motors setup --id 5   # le servomoteur neuf (ID 1) devient le 5, sans question
```

## chromapi calibrate

```bash
chromapi calibrate servos --all            # toutes les articulations
chromapi calibrate servos --joint tl_2     # une seule
chromapi calibrate imu
```

`calibrate servos` cherche le centre de chaque articulation en allant jusqu'à ses butées mécaniques.

{{< callout context="danger" title="Attention !" icon="outline/alert-triangle" >}}
Avant de lancer `calibrate servos`, soulevez le robot et placez-le dans un espace dégagé : aucune patte ne doit pouvoir toucher quoi que ce soit.
{{< /callout >}}

`calibrate imu` mesure l'inclinaison de la carte avec le sol pour y appliquer une correction : posez le robot sur un sol plan et ne le touchez pas.

| Option | Commande | Effet |
| :--- | :--- | :--- |
| `--dry-run` | Les deux | Mesure et affiche, sans rien enregistrer |
| `--joint` | `servos` | Articulation à calibrer, répétable |
| `--yes` | `servos` | Ne demande aucune confirmation |
| `--verbose` | `servos` | Affiche le détail de chaque pas |
| `--step`, `--margin` | `servos` | Réglages de la recherche de butée, si une articulation s'arrête trop tôt ou pas du tout |
| `--duration` | `imu` | Durée de la mesure (5 s par défaut) |

Les calibrations sont enregistrées dans `~/.config/chromapi/calibration.yaml`.

## chromapi gamepad pair

Appaire la première manette Bluetooth trouvée en mode appairage. Mettez la manette en mode appairage avant de lancer la commande. `--scan` règle la durée de la recherche (20 s par défaut).

## chromapi access reset

Oublie le code d'accès de l'application web : le prochain visiteur pourra en choisir un nouveau.
