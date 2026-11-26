---
title: "Simulation"
slug: "simulation"
description: "Faire tourner Chromapi dans MuJoCo, sans le robot."
summary: "Faire tourner Chromapi dans MuJoCo, sans le robot."
date: 2026-11-12
lastmod: 2026-11-22
draft: false
weight: 20
toc: true
icon: "computer"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Faites tourner Chromapi dans le simulateur MuJoCo, sans le robot : testez votre code Python et vos mouvements avant de passer au vrai quadrupède."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img src="/chroma/gifs/chromapi_sim_dance.gif" alt="Chromapi danse dans le simulateur MuJoCo" />
</p>

Vous n'avez pas encore le robot ou vous voulez expérimenter des mouvements sur Chromapi sans prendre le risque de le casser ? Sachez qu'il existe une version simulée de Chromapi sur [MuJoCo](https://mujoco.org/) : le même code pilote le robot simulé et le robot réel.

## Prérequis

* Le SDK de Chromapi doit être installé avec l'option `sim` : voir la page [Installation du SDK]({{< relref "chromapi/developing/sdk-installation/" >}}).

## Lancement des exemples

Le dossier [`examples/`](https://github.com/Mowibox/chromapi/tree/main/examples) contient quelques programmes qui permettent de tester Chromapi. Ils ne sont pas inclus dans le paquet pip : téléchargez-les depuis le dépôt, ou installez le SDK [depuis les sources]({{< relref "chromapi/developing/sdk-installation/#depuis-les-sources" >}}). Chacun tourne dans MuJoCo avec le paramètre `--sim` :

```bash
python examples/walk.py --sim              # un aller-retour : avant, côté, quart de tour
python examples/walk.py --sim --follow     # la caméra suit le robot
python examples/dance.py --sim             # danse sur place
python examples/gamepad.py --sim           # pilotage avec une manette appairée au PC
```

Sans `--sim`, ces programmes fonctionnent également sur le robot réel.

## Application web en simulation

L'[application web]({{< relref "chromapi/getting-started/web-app/" >}}) fonctionne aussi avec le robot simulé, via la commande :

```bash
chromapi run --sim
```

L'application web sera alors accessible à l'adresse : [`https://localhost:5000`](https://localhost:5000). Son certificat est auto-signé : à la première visite, le navigateur affiche une alerte de sécurité qu'il faut accepter pour continuer.

## Dans votre code

Lorsque vous écrivez un programme pour Chromapi, le choix entre simulation et robot réel se fait en modifiant le paramètre nommé `backend` :

```python
from chromapi.chromapi import Chromapi

with Chromapi(backend="mujoco", launch_viewer=True) as robot:
    robot.wake_up(wait=True)
    robot.walk_distance(0.3)  # [m]
    robot.rest()
```

Avec ce code, une fenêtre MuJoCo s'ouvre, le robot se lève, avance de 30 cm puis se recouche. Remplacez `"mujoco"` par `"hardware"` pour lancer exactement le même code sur le vrai robot.

Voici les principaux paramètres dans une instance de Chromapi :

| Paramètre | Effet |
| :--- | :--- |
| `backend="mujoco"` | Permet de piloter le robot en simulation |
| `backend="hardware"` | Permet de piloter le robot réel. Il s'agit de la valeur par défaut |
| `backend="sim-server"` | Se connecte à une simulation lancée en parallèle avec `chromapi sim` (voir la [section ci-dessous](#garder-la-simulation-ouverte)) |
| `launch_viewer=True` | Ouvre une fenêtre MuJoCo. Sans lui, la simulation tourne sans affichage |
| `follow_robot=True` | Avec `launch_viewer=True`, la caméra suit le robot (« Échap » permet de la libérer) |
| `mjcf_path=...` | Avec `backend="mujoco"`, charge une autre scène que celle par défaut |

## Garder la simulation ouverte

Avec `backend="mujoco"`, la simulation vit dans votre programme : chaque lancement rouvre la fenêtre et relève le robot. Quand vous mettez au point un script et le relancez souvent, lancez plutôt la simulation à part, dans un premier terminal :

```bash
chromapi sim              # la fenêtre MuJoCo, robot couché
chromapi sim --follow     # la caméra suit le robot
chromapi sim --headless   # sans fenêtre (Ctrl+C pour l'arrêter)
```

Dans un second terminal, votre script s'y connecte avec `backend="sim-server"` :

```python
from chromapi.chromapi import Chromapi

with Chromapi(backend="sim-server") as robot:
    robot.wake_up(wait=True)
    robot.walk_distance(0.3)  # [m]
    robot.rest(wait=True)
```

* Votre script garde tout le SDK. La simulation ne fait que la physique et l'affichage, comme la carte mère sur le robot réel.
* Quand le script s'arrête, la simulation continue et le robot reste où il est : le lancement suivant repart de là. Pour repartir de zéro, relancez `chromapi sim`.
* Un seul script pilote la simulation à la fois, comme sur le robot. Un second s'arrête automatiquement (`A script is already driving the simulation`).
* Si `chromapi sim` n'est pas lancé, le script ne se lance pas (`No simulation on localhost:7447`).
* Fermer la fenêtre, ou arrêter `chromapi sim`, arrête aussi le script en cours.

La simulation n'accepte que les programmes de votre ordinateur.

## Différences avec le robot réel

| Sur le robot | En simulation |
| :--- | :--- |
| Anneau de 18 LEDs | L'anneau affiche la couleur moyenne des 18 LEDs |
| Haut-parleur du robot | Le son entre et sort par l'ordinateur |
| Charge de la batterie | Non simulée : `battery_percent` vaut `None` |
| Température des servomoteurs | Non simulée |
| Caméra et microphone | Non simulés |

La marche est en boucle ouverte : le robot ne mesure pas la distance qu'il parcourt réellement. Ainsi les distances parcourues diffèrent un peu entre la simulation et le sol réel, qui glisse plus ou moins.
