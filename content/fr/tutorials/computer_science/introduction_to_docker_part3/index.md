---
title: "Introduction à Docker – Partie 3"
summary: Création d'un Dockerfile
weight: 5005
icon: "docker"
---

<p align="center">
    <img src="/chroma/images/docker1.png" alt="Docker" class="w-full h-auto" />
</p>

Cette série de tutoriels vous illustrera comment utiliser Docker avec un ordinateur sous Linux. Cette partie est dédiée à la création d'un Dockerfile.

## Le Dockerfile

Dans le [tutoriel précédent]({{< relref "tutorials/computer_science/introduction_to_docker_part2">}}), nous avions constaté qu'à chaque nouvelle création de conteneur, on perdait toutes les modifications que l'on aurait pu faire dans un conteneur issu de la même image, puisque l'image de base restait inchangée.

Pour faire des changements permantents à une image, l'idée est de créer une image customisée sur la base de l'image existante. C'est précisément le rôle du Dockerfile.

Le Dockerfile est un fichier texte contenant une série d'instructions permettant de construire une nouvelle image Docker. Grâce à lui, tous les conteneurs lancés à partir de l'image customisée inclueront déjà les modifications spécifiées dans le Dockerfile. Regardons plus en détail comment le rédiger.

## Préparation des fichiers

L'exemple qui va suivre montre comment réaliser un Dockerfile pour une version antérieure d'Ubuntu, par exemple la version 20.04.

Vous pouvez vérifer la version de votre machine avec la commande `cat /etc/os-release`.

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~$ cat /etc/os-release
PRETTY_NAME="Ubuntu 24.04.2 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.2 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
```

On voit ici que la version d'Ubuntu est 24.04. Regardons comment faire pour créer une image basée sur la version 20.04.

Choissisez un emplacment et créez-y un dossier au nom de votre choix (manuellement ou via un terminal avec la commande `mkdir <folder_name>`). Dans cet exemple, je vais sobrement le nommer "docker_folder/".

Dans ce dossier :

* À la racine, créez un fichier nommé `Dockerfile`.
* Créez un dossier et ajoutez-y à l'intérieur un fichier de votre choix, ça peut être un fichier texte, markdown, etc. Pour ma part je vais créer le dossier "my_folder/" et y intégrer le fichier Python `my_python_file.py` :

``` py {title="my_python_file.py", lineNos=true}
# Un affichage simple
print("Hello, World!")

# Une addition simple (j'espère)
a = 1
b = 2
c = a + b
print(f"{a} + {b} = {c}")
```

L'arborescense de votre dossier devrait donc ressembler à celle-ci :

```plaintext
docker_folder/
├── Dockerfile
└── my_folder/
    └── my_python_file.py
```

## Contenu du Dockerfile

Ouvrez le fichier `Dockerfile` dans un éditeur de texte ou un IDE comme [Visual Studio Code](https://code.visualstudio.com/download).

Voilà le contenu que devez mettre au sein du fichier :

```Dockerfile {title="Dockerfile", lineNos=true}
FROM ubuntu:20.04

# Mise à jour de Linux et installation d'outils de dev
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git python3-pip nano

# Nettoyage des fichiers temporaires
RUN rm -rf /var/lib/apt/lists/*

# Copie du dossier vers le conteneur
COPY my_folder/ my_image_folder

# Création d'un dossier de travail
RUN mkdir -p /workspace
```

Regardons en détail les lignes du fichier pour bien comprendre ce qui s'y passe :

```Dockerfile {lineNos=true, lineNoStart=1}
FROM ubuntu:20.04
```

* La commande `FROM` permet de spécifier à partir de quelle image de base notre image va être créée, ici, ce sera Ubuntu 20:04.

```Dockerfile {lineNos=true, lineNoStart=4}
RUN apt-get update && apt-get upgrade -y
```

* `RUN` permet de lancer une commande, ici, on met à jour et installe les paquets disponibles d'Ubuntu.

{{< callout context="note" title="Pourquoi utilise-t-on le flag '-y' ?" icon="outline/info-circle" >}}
Le flag `-y` permet de répondre automatiquement "yes" à toutes les confirmations demandées par la commande. Cela permet d'automatiser le processus sans intervention de votre part.
{{< /callout >}}

```Dockerfile {lineNos=true, lineNoStart=5}
RUN apt-get install -y git python3-pip nano
```

* Ici, on installe des outils qui peuvent s'avérer utiles pour le développement:
  * `git` : Pour pouvoir utiliser GitHub/GitLab.
  * `python3-pip` : Pour installer des paquets Python.
  * `nano` pour l'édition de texte dans le terminal.

```Dockerfile {lineNos=true, lineNoStart=8}
RUN rm -rf /var/lib/apt/lists/*
```

* Cette ligne permet de supprimer les fichiers temporaires d'APT, afin de réduire la taille de l'image finale Docker.

```Dockerfile {lineNos=true, lineNoStart=11}
COPY my_folder/ my_image_folder
```

* La commande `COPY` vous permet de copier le contenu du dossier "my_folder/" de la machine hôte vers le conteneur, sous le nom "my_image_folder/".

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Si le dossier que vous avez créé précédemment ne s'appelle pas "my_folder", n'oubliez pas de modifier la commande dans le Dockerfile pour la faire correspondre au vôtre !
{{< /callout >}}

```Dockerfile {lineNos=true, lineNoStart=14}
RUN mkdir -p /workspace
```

* Cette ligne de commande va créer un dossier nommé "/workspace" à la racine de votre conteneur.

### Construction de l'image

Maintenant que le `Dockerfile` est prêt, nous allons pouvoir procéder à la construction de l'image Docker.

Ouvrez un terminal à l'emplacement de votre `Dockerfile`, (par exemple dans le dossier "docker_folder/") et exécutez la commande :

```bash {frame="none"}
docker build -t <image_name> .
```

en remplaçant `<image_name>` par le nom que vous voulez donner à votre image. Le deuxième argument correspond au chemin pour accéder au Dockerfile, comme nous sommes déjà à l'emplacement du fichier, il suffit de mettre un `.` pour dire à Docker d'utiliser le répertoire actuel comme répertoire de construction.

Vous verrez ainsi toutes les couches de votre Dockerfile s'exécuter les unes après les autres :

```bash {title="Terminal"}
mowibox@chroma:~$ docker build -t my_custom_ubuntu .
[+] Building 8.1s (5/10)
 => [internal] load build definition from Dockerfile
 => transferring dockerfile: 355B
 => [internal] load metadata for docker.io/library/ubuntu:20.04
 => [internal] load .dockerignore
 => transferring context: 2B
 => [1/6] FROM docker.io/library/ubuntu:20.04@sha256:8feb4d8ca5354def3d8fce243717141ce31e2c428701f6682b
 => resolve docker.io/library/ubuntu:20.04
 => sha256:8feb4d8ca5354def3d8fce243717141ce31e2c428701f6682bd2bfae15388214 6.69kB / 6.69kB
 => sha256:c664f8f86ed5a386b0d9818f81714e21a8b9c73f568c4bea56aa179d54a 424B / 424B
 => sha256:b7ba04fd9aa0c77fc0cc7bf993fd6946545983d9096126e5a4f45d713 2.30kB / 2.30kB
 => sha256:13b7e930469f6d3575a320709035c6ac6fcf5485a76abcf03d1b92a64c09c2476 27.51MB / 27.51MB
 => extracting sha256:13b7e930469f6d3575a320709035c6ac6fcf5485a76abcf03d1b92a64c09c2476
 => [internal] load build context
 => transferring context: 77B
 => [2/6] RUN apt-get update && apt-get upgrade -y
 => # Fetched 35.7 MB in 2s (15.0 MB/s)
 => # Reading package lists...
 => # Building dependency tree...
```

La construction de l'image peut prendre un moment. Une fois terminée, vous pourrez voir votre nouvelle image dans la liste des images (`docker images`).

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~$ docker images
REPOSITORY         TAG      IMAGE ID       CREATED          SIZE
my_custom_ubuntu   latest   a67e56745215   43 seconds ago   980MB
```

### Exécution du conteneur

Comme dans le tutoriel précédent, vous pouvez démarrer un conteneur de votre image :

```bash {frame="none"}
docker run -it <image_name>
```

Exemple :

```bash {title="root@3d18c90647a5:/"}
mowibox@chroma:~$ docker run -it my_custom_ubuntu
root@3d18c90647a5:/#
```

Vous pouvez vérifier que vous êtes bien dans un conteneur basé sur Ubuntu 20.04 avec la commande utilisée au début du tutoriel :

Exemple :

```bash {title="root@3d18c90647a5:/"}
root@3d18c90647a5:/# cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.6 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.6 LTS"
VERSION_ID="20.04"
```

Vous pouvez aussi regarder avec la commande `ls` si vos dossiers sont présents :

Exemple :

```bash {title="root@3d18c90647a5:/"}
root@3d18c90647a5:/# ls
bin   dev  home  lib32  libx32  media  my_image_folder  proc  ros_entrypoint.sh  sbin  sys  usr  workspace
boot  etc  lib   lib64  log     mnt    opt              root  run                srv   tmp  var
```

On constate notamment que les dossiers "my_image_folder/" et "workspace/" sont bien inclus dans le conteneur.

Si je navigue vers le dossier « my_image_folder/ », je retrouve mon fichier Python que je peux exécuter :

```bash {title="root@3d18c90647a5:/"}
root@3d18c90647a5:/# cd my_image_folder/
root@3d18c90647a5:/my_image_folder# ls
my_python_file.py

root@3d18c90647a5:/my_image_folder# python3 my_python_file.py
Hello, World!
1 + 2 = 3
```

Puisque `nano` a été installé au préalable sur l'image, je peux aussi éditer mon fichier et voir qu'il est identique à celui créé sur ma machine :

```bash {frame="none"}
nano my_python_file.py
```

<p align="center">
    <img src="/chroma/images/docker2_fr.png" alt="Displaying nano" class="w-full h-auto" />
</p>

Pour tester, je peux modifier le résultat de l'addition et relancer le code :

<p align="center">
    <img src="/chroma/images/docker3_fr.png" alt="Editing nano" class="w-full h-auto" />
</p>

```bash {title="root@3d18c90647a5:/"}
root@3d18c90647a5:/my_image_folder# python3 my_python_file.py
Hello, World!
5 + 5 = 10
```

Et voilà ! vous avez réalisé une image customisée fonctionnelle et prête à être utilisée. Si quelqu'un veut l'utiliser, il suffira simplement de transmettre le `Dockerfile` et de suivre les mêmes étapes de construction sur sa machine pour obtenir une image identique.

## Pour aller plus loin

Avec ce tutoriel, vous avez pu appréhender les bases de Docker : création d’images, exécution de conteneurs, et personnalisation via un Dockerfile. Mais Docker ne s'arrête pas là : il y'a encore plein d'autres fonctionnalités qui peuevent être explorées au besoin.

Vous pouvez, par exemple, partager des dossiers/fichiers directement entre la machine hôte et le conteneur en temps réel, plutôt que d'en faire une copie.

On constate également que dans un conteneur Docker, vous êtes définis par défaut en tant que  super-utilisateur (root), c'est pourquoi il n'y pas besoin d'ajouter `sudo` dans vos commandes (`apt install` au lieu de `sudo apt install`). Avoir les pleins pouvoirs peut poser des problèmes de sécurité, c'est pourquoi il est recommandé de définir des utilisateurs non privilégiés avec la commande `USER`.

```Dockerfile
RUN useradd -m username
USER username
```

Pour finir, voici une excellente vidéo (en anglais) d'[Articulated Robotics](https://www.youtube.com/@ArticulatedRobotics) pour apprendre à bien construire un Dockerfile : [YouTube](https://www.youtube.com/watch?v=RbP5cARP-SM&list=PLunhqkrRNRhaqt0UfFxxC_oj7jscss2qe&index=3&pp=iAQB)

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Dernière mise à jour :** Juin 2025
* **Relecteur :**
