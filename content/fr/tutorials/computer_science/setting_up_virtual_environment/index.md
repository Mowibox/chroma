---
title: "Création d'un environnement virtuel"
summary: Avec Python
weight: 1005
icon: "laptop"
---

<p align="center">
    <img src="/chroma/images/venv.png" alt="Virtual environment" class="w-full h-auto" />
</p>

Ce tutoriel vous apprendra en quelques lignes comment créer et utiliser un environnement virtuel avec Python.

## Prérequis :

* Avoir [Python](https://www.python.org/downloads/) sur sa machine.
* Avoir un éditeur de texte pour Python ([Visual Studio Code](https://code.visualstudio.com/), [Pycharm](https://www.jetbrains.com/fr-fr/pycharm/download/), etc.) :

## Pourquoi configurer un environnement virtuel ?

Comme vous le savez peut-être déjà, la méthode la plus courante pour installer des modules sous Python est d'utiliser l'outil `pip`. Par défaut, les paquets Python installés avec `pip` le sont au niveau de système. Cette méthode permet à l'utilisateur d'avoir accès aux paquets installés depuis n'importe que projet Python sur sa machine. Cependant, cette approche présente quelques défauts. En effet, seule une version d'un paquet peut être installée à la fois, donc tous les projets Python doivent partager cette même version.

De ce fait, il est impossible pour un projet de profiter des nouvelles mises à jour d'un module, si un autre projet dépend d'une version plus ancienne. Pour résoudre ce problème, on crée un dossier dédié à chaque projet, dans lequel on installe localement les modules avec les versions adaptées. Cela permet d'utiliser différentes versions de Python et de ses modules pour un projet sans créer de conflits de dépendances avec les projets précédents.

C'est ce qu'on appelle **un environnement virtuel.**

## Procédure d'installation

* Vérifiez que vous avez bien `pip` installé sur votre machine :

```bash {frame="none"}
sudo apt-get install python3-pip
```

* Installez le module `virtualenvwrapper` :

```bash {frame="none"}
sudo pip3 install virtualenvwrapper
```

* Une fois le module installé, il faut rajouter des lignes de configuration à votre fichier `~/.bashrc` (fichier de configuration du terminal exécuté à chaque démarrage de session). Pour ce faire, ouvrez `~/.bashrc` avec un éditeur de texte, par exemple avec Visual Studio Code:

```bash {frame="none"}
sudo code ~/.bashrc
```

* Après l'avoir ouvert, ajoutez-y les lignes suivantes :

```bashrc {frame="none"}
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Devel
source /usr/local/bin/virtualenvwrapper.sh
```

Sauvegardez et fermez le fichier. Vous avez maintenant ce qu'il faut pour commencer à créer des environnements virtuels.

## Création et utilisation des environnements virtuels

La commande pour créer un environnement virtuel est la suivante :

```bash {frame="one"}
mkvirtualenv venv_name
```

où `venv_name` correspond au nom que vous voulez donner à votre environnement virtuel. Si tout s'est bien déroulé, vous devriez voir le nom de votre
environnement au début de chaque ligne de commande de votre terminal.

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~$ mkvirtualenv my_venv
created virtual environment CPython3.12.3.final.0-64 in 170ms
  creator CPython3Posix(dest=/home/mowibox/.virtualenvs/my_venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, via=copy, app_data_dir=/home/mowibox/.local/share/virtualenv)
    added seed packages: pip==25.0.1
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
virtualenvwrapper.user_scripts creating /home/mowibox/.virtualenvs/my_venv/bin/predeactivate
virtualenvwrapper.user_scripts creating /home/mowibox/.virtualenvs/my_venv/bin/postdeactivate
virtualenvwrapper.user_scripts creating /home/mowibox/.virtualenvs/my_venv/bin/preactivate
virtualenvwrapper.user_scripts creating /home/mowibox/.virtualenvs/my_venv/bin/postactivate
virtualenvwrapper.user_scripts creating /home/mowibox/.virtualenvs/my_venv/bin/get_env_details
(my_venv) mowibox@chroma:~$
```

À partir de là, toutes les commandes exécutées (notamment `pip install`) se feront à l'intérieur de l'environnement sans affecter le reste de système.

Une fois votre travail terminé, vous pouvez quitter l'environnement en utilisant la commande :

```bash {frame="none"}
deactivate
```

Si vous avez une version de Python installée sur votre machine que vous souhaitez utiliser spécifiquement, utilisez le flag `-p` pour spécifier sa version :

```bash {frame="none"}
mkvirtualenv -p python3.x venv_name
```

avec `x`, le numéro de la version désirée.

Pour accéder à un environnement virtuel déjà créé, entrez la commande :

```bash {frame="none"}
workon venv_name
```

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Vous pouvez voir la liste de vos environnements virtuels en écrivant `workon`, puis en appuyant deux fois sur la touche de tabulation :
{{< /callout >}}

```bash {title="Terminal"}
mowibox@chroma:~$ workon
my_venv     my_other_venv    my_other_other_venv
```

Enfin, pour supprimer un environnement virtuel inactif, utilisez la commande :

```bash {frame="none"}
workon rmvirtualenv venv_name
```

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Dernière mise à jour :** Juin 2025
* **Relecteur :** Loubna LATRECHE
