---
title: "Installation du SDK"
slug: "installation-du-sdk"
description: "Installer le SDK Python de Chromapi sur son ordinateur."
summary: "Installer le SDK Python de Chromapi sur son ordinateur."
date: 2026-11-12
lastmod: 2026-11-22
draft: false
weight: 10
toc: true
icon: "python"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Installez le SDK Python de Chromapi sur votre ordinateur pour commencer à programmer le robot quadrupède, en simulation ou sur le vrai robot."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Si vous êtes un développeur, chercheur, qui cherche à créer des interactions ou expérimenter de nouveaux mouvements avec Chromapi, alors vous êtes au bon endroit ! Le SDK de Chromapi permet de programmer toutes sortes de comportements sur le robot en Python.

Par défaut, sur le robot, le SDK est déjà installé dans [Chromapi OS]({{< relref "chromapi/getting-started/installation/" >}}). Cette page vous donne les étapes pour pouvoir également l'installer sur votre ordinateur, pour travailler en [simulation]({{< relref "chromapi/developing/simulation/" >}}) ou explorer le code.

## Prérequis

* Python 3.12 ou plus récent.
* [pip](https://pip.pypa.io/) (fourni avec Python) ou [uv](https://docs.astral.sh/uv/).
* Quelques notions sur [l'utilisation d'un terminal]({{< relref "tutorials/computer-science/using-terminal" >}}) : un tutoriel est disponible sur le site si c'est votre première fois.

Pour développer dans de bonnes conditions, il est recommandé d'installer le SDK dans un [environnement virtuel]({{< relref "tutorials/computer-science/setting-up-virtual-environment" >}}). Cela évite les problèmes de dépendances entre vos différents projets.

## Installation du SDK

Deux méthodes sont possibles :

* **Depuis PyPI** : la méthode la plus simple, pour utiliser le SDK dans vos propres projets.
* **Depuis les sources** : pour contribuer au code ou lancer les exemples, qui ne sont pas inclus dans le paquet.

{{< tabs "install" >}}
{{< tab "PyPI" >}}
**Avec pip**

Créez et activez un environnement virtuel, puis installez le SDK :

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows : .venv\Scripts\activate
pip install "chromapi[all]"
```

**Avec uv**

`uv` est un gestionnaire de paquets Python qui crée et gère l'environnement virtuel à votre place. Pour l'installer (Linux et macOS) :

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Pour Windows, suivez la [documentation d'uv](https://docs.astral.sh/uv/getting-started/installation/). Créez ensuite un projet et ajoutez-y le SDK :

```bash
uv init mon-projet
cd mon-projet
uv add "chromapi[all]"
```

{{< /tab >}}
{{< tab "Depuis les sources" >}}
Il vous faut en plus [Git](https://git-scm.com/). Si cet outil est nouveau pour vous, la [partie 1 du tutoriel sur Git et GitHub]({{< relref "tutorials/computer-science/introduction-to-github-part1" >}}) vous l'explique le concept dans les grandes lignes.

Clonez le dépôt :

```bash
git clone https://github.com/Mowibox/chromapi
cd chromapi
```

**Avec pip**

Créez et activez un environnement virtuel, puis installez le SDK en mode édition (avec `-e` : vos modifications du code sont prises en compte sans avoir à réinstaller à chaque fois), Au sein du dossier `chromapi` :

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows : .venv\Scripts\activate
pip install -e ".[all]"
```

**Avec uv**

`uv` crée l'environnement virtuel et installe toutes les options en une commande. Dans le dossier `chromapi` :

```bash
uv sync --all-extras
```

{{< /tab >}}
{{< /tabs >}}

### Les options

Le SDK s'installe avec une ou plusieurs options, à choisir selon vos besoins :

| Option | Ce qu'elle ajoute |
| :--- | :--- |
| `sim` | MuJoCo, pour la [simulation]({{< relref "chromapi/developing/simulation/" >}}) |
| `audio` | La lecture des sons |
| `hub` | Le téléchargement de [mouvements]({{< relref "chromapi/developing/moves/" >}}) depuis Hugging Face |
| `rl` | L'exécution de politiques d'apprentissage par renforcement (prévu) |
| `all` | Toutes les options ci-dessus |

Par exemple, pour la simulation seule : `pip install "chromapi[sim]"` ou `uv add "chromapi[sim]"`. Plusieurs options se combinent avec une virgule : `"chromapi[sim,audio]"`.

## Vérifier l'installation

Enregistrez ce programme dans un fichier `mon_script.py`. Il fait se lever puis se recoucher le robot simulé :

```python
from chromapi.chromapi import Chromapi

with Chromapi(backend="mujoco", launch_viewer=True) as robot:
    robot.wake_up(wait=True)
    robot.rest(wait=True)
```

Puis lancez le script :

{{< tabs "run" >}}
{{< tab "pip" >}}
L'environnement virtuel activé :

```bash
python mon_script.py
```

{{< /tab >}}
{{< tab "uv" >}}

```bash
uv run python mon_script.py
```

{{< /tab >}}
{{< /tabs >}}

Si tout s'est bien passé, une fenêtre MuJoCo s'ouvre et Chromapi se lève.

<p align="center">
    <img src="/chroma/gifs/chromapi_sdk_wake_up.gif" alt="Chromapi se lève puis se recouche dans MuJoCo" />
</p>

Félicitations ! Vous êtes fin prêt à développer sur Chromapi ! Vous pouvez ensuite vous familiariser avec les [bases du SDK]({{< relref "chromapi/developing/sdk-basics/" >}}).

## Sur le robot

Si vous voulez tester des mouvements sur un robot réel, connectez-vous en SSH avec le compte `chromapi` et le mot de passe choisi à l'[installation]({{< relref "chromapi/getting-started/installation/" >}}).

```bash
ssh chromapi@chromapi.local
```

{{< callout context="danger" title="Attention !" icon="outline/alert-triangle" >}}
L'application web occupe le port série de la carte mère. Avant de lancer vos propres programmes sur le robot, arrêtez-la avec **Settings › Power › Developer mode**. Vous pourrez la relancer avec la commande `sudo systemctl start chromapi@$USER` ou au prochain allumage.
{{< /callout >}}
