---
title: "Mouvements"
slug: "mouvements"
description: "Jouer, créer et partager des mouvements."
summary: "Jouer, créer et partager des mouvements."
date: 2026-11-12
lastmod: 2026-11-15
draft: false
weight: 40
toc: true
icon: "device-gamepad-3"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Les mouvements de Chromapi : apprenez à jouer des mouvements existants sur le robot quadrupède, à créer les vôtres et à les partager."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Un mouvement est un comportement qui met à jour les consignes des articulations à chaque tick de la boucle de contrôle (100 Hz). La marche en est un, et les différents gestes inclus dans l'application web aussi. Cette page vous montre comment jouer les mouvements enregistrés, en créer et les partager.

## Jouer un mouvement enregistré

Le SDK est livré avec une bibliothèque de mouvements :

```python
import time

from chromapi.chromapi import Chromapi
from chromapi.locomotion.balance import BalanceMove
from chromapi.locomotion.recorded_move import RecordedMoves

with Chromapi(backend="mujoco", launch_viewer=True) as robot:
    robot.wake_up(wait=True)

    moves = RecordedMoves()
    print(moves.list_moves())

    balance = BalanceMove(dt=1.0 / robot.loop_hz)
    move = moves.get("happy", balance)
    robot.play_move(move)
    while not move.done:
        time.sleep(0.05)

    robot.stop_move()
    robot.rest(wait=True)
```

* `RecordedMoves()` charge les mouvements livrés avec le SDK.
* `BalanceMove` garde le robot en équilibre pendant le mouvement. Un seul appel suffit pour tous les mouvements du programme.
* `play_move()` permet de jouer un mouvement. Ici, on joue le mouvement "happy". `move.done` passe à `True` à la fin.

<p align="center">
    <img src="/chroma/gifs/chromapi_sdk_happy.gif" alt="Chromapi joue le mouvement happy dans MuJoCo" />
    <br>
    <em>Le mouvement « happy » joué dans la simulation MuJoCo</em>
</p>

### Les mouvements livrés

Actuellement, il existe deux types de mouvements :

| Type | Ce qui bouge | Mouvements de la bibliothèque |
| :--- | :--- | :--- |
| Mouvements du corps | Le châssis, les quatre pieds au sol | `angry`, `confused`, `dizzy`, `excited`, `happy`, `joy`, `no`, `purring`, `sad`, `scared`, `surprised`, `tired`, `yes` |
| Mouvements de patte | Une patte avant, le poids reporté sur les trois autres | `greeting`, `kick` |

Un mouvement de patte se joue à gauche (`tl`) ou à droite (`tr`) :

```python
move = moves.get("greeting", balance, leg="tr")
```

## Créer un mouvement enregistré

Un mouvement enregistré est un fichier JSON : une suite d'instants et, pour chacun, la pose à atteindre.

Un mouvement du corps :

```json
{"description": "Quand le jouer.",
 "time": [0.0, 0.02, 0.04],
 "set_target_data": [{"body": [0, 0, 0, 0, 0, 0]},
                     {"body": [0, 0, 0.001, 0, 0, 0]},
                     {"body": [0, 0, 0, 0, 0, 0]}]}
```

Un mouvement de patte :

```json
{"description": "Quand le jouer.",
 "default_leg": "tl",
 "time": [0.0, 0.02, 0.04],
 "set_target_data": [{"leg": [0, 0, 0]},
                     {"leg": [0, 0.01, 0]},
                     {"leg": [0, 0, 0]}]}
```

| Champ | Contenu |
| :--- | :--- |
| `description` | Quand jouer ce mouvement |
| `time` | Les instants en secondes, échantillonnés à 50 Hz. Le lecteur interpole entre deux instants |
| `body` | La pose du châssis par rapport à la pose de départ : x, y, z en mètres, puis roulis, tangage, lacet en radians |
| `leg` | Les écarts en radians des trois articulations de la patte (coxa, fémur, tibia) |
| `default_leg` | La patte jouée par défaut : `tl` ou `tr` |
| `mood` | Facultatif : l'humeur (animation de l'anneau et son) jouée avec le mouvement |

Le premier et le dernier échantillon doivent valoir zéro : le robot revient où il était.

### Les limites

Un fichier qui dépasse ces limites est refusé au chargement, avec un avertissement dans le journal :

| Limite | Valeur |
| :--- | :--- |
| Taille du fichier | 256 ko |
| Durée | 60 s |
| Déplacement du châssis | 3 cm sur chaque axe, à 0,3 m/s au plus |
| Inclinaison du châssis | 0,2 rad sur chaque axe, à 2 rad/s au plus |
| Écart d'une articulation de patte | 1,2 rad, à 6 rad/s au plus |

### Charger vos mouvements

Rangez vos fichiers dans un dossier, un fichier `<nom>.json` par mouvement :

```python
moves = RecordedMoves()                       # les mouvements livrés
moves.update(RecordedMoves("mes_mouvements")) # plus les vôtres
```

À nom égal, vos mouvements remplacent ceux du SDK.

## Partager des mouvements

Un dossier de mouvements peut être publié comme jeu de données sur [Hugging Face](https://huggingface.co/). Avec l'option `hub` du SDK, il se charge par son nom :

```python
moves = RecordedMoves("Mowibox/chromaposes")
```

Les fichiers sont téléchargés une fois, puis lus depuis le cache, même hors ligne.

Pour que l'application web propose ces mouvements, indiquez le jeu de données dans la configuration du robot :

```yaml
moves:
  dataset: "Mowibox/chromaposes"
```

<!-- TODO : préciser le fichier à modifier sur le robot, et comment publier son propre jeu de données -->

## Écrire un mouvement en Python

Pour un comportement qui réagit à l'état du robot, écrivez une classe `Move`. Sa méthode `step()` est appelée à chaque tick :

```python
import math
import time

from chromapi.chromapi import Chromapi, MotorCommand, Move, RobotState


class Breathe(Move):
    """Le corps monte et descend doucement."""

    def __init__(self, amplitude: float = 0.08, period: float = 2.0) -> None:
        self.amplitude = amplitude  # [rad]
        self.period = period  # [s]
        self.t = 0.0  # [s]
        self.start = {}

    def on_start(self) -> None:
        self.t = 0.0
        self.start = {}

    def step(self, state: RobotState, command: MotorCommand, dt: float) -> None:
        if not self.start:
            self.start = dict(command.target_angles)
        self.t += dt
        offset = self.amplitude * math.sin(2.0 * math.pi * self.t / self.period)
        for leg in ("tl", "tr", "bl", "br"):
            command.target_angles[f"{leg}_2"] = self.start[f"{leg}_2"] + offset


with Chromapi(backend="mujoco", launch_viewer=True) as robot:
    robot.wake_up(wait=True)

    robot.play_move(Breathe())
    time.sleep(6.0)
    robot.stop_move()

    robot.set_joint_targets(robot.stand_pose(), duration=0.5, wait=True)
    robot.rest(wait=True)
```

* `state` : le dernier état du robot (voir les [bases du SDK]({{< relref "chromapi/developing/sdk-basics/4-sensors/" >}})).
* `command.target_angles` : les consignes des articulations, en radians. À chaque tick, elles contiennent celles du tick précédent : modifiez seulement ce qui change.
* `dt` : le temps écoulé depuis le tick précédent, en secondes.
* `on_start()` et `on_stop()` sont appelées au début et à la fin du mouvement.

`step()` tourne dans la boucle de contrôle : elle doit rester rapide, sans attente ni accès au réseau.

`stop_move()` fige les articulations sur leur dernière consigne. Un seul mouvement est actif à la fois : en lancer un nouveau arrête le précédent.

L'exemple [`dance.py`](https://github.com/Mowibox/chromapi/blob/main/examples/dance.py) va plus loin : il incline le corps avec la cinématique inverse du corps entier.
