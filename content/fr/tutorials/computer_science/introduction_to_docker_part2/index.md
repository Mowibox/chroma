---
title: "Introduction à Docker – Partie 2"
summary: Images & conteneurs
weight: 1007
icon: "docker"
---

<p align="center">
    <img src="/chroma/images/docker1.png" alt="Docker" class="w-full h-auto" />
</p>

Cette série de tutoriels vous illustrera comment utiliser Docker avec un ordinateur sous Linux. Cette partie est consacrée aux images et aux conteneurs Docker. Les commandes utilisées au sein de cette partie sont celles spécifiées dans la [documentation officielle de Docker.](https://docs.docker.com/reference/cli/docker/)

## Les images, les conteneurs, késako ?

### Image

Si vous êtes familier avec l'informatique, vous avez probablement déjà entendu parler des images disques : ce sont des fichiers qui contiennent une copie fidèle de la structure et des données d'un disque. Par exemple, c'est ce type d'image qui est utilisé pour installer un système d'exploitation sur une machine (les fichiers `.iso`). Flasher une image sur un disque revient à y recréer une copie fidèle de ses données.

Les images Docker reprennent ce même principe.
Une image Docker est un fichier contenant tous les fichiers, bibliothèques, dépendances, etc., d'un environnement à un instant donné. Comme pour une image disque, on peut la "flasher"  – dans Docker on appelle ça la "lancer" – pour obtenir un système fonctionnel basé sur cette image.

### Conteneur

Quand on lance une image, on crée un conteneur. Un peu comme un disque sur lequel on aurait flashé une image : on peut accéder au conteneur et y lancer des programmes, créer des fichiers, etc. Les modifications apportées au conteneur ne modifieront pas l'image d'origine. Les conteneurs peuvent être démarrés ou stoppés à souhait, à la manière d'un ordinateur qu'on allume ou éteint.

Relancer une image revient donc à créer un nouveau conteneur identique au précédent, mais sans les éventuelles modifications.

## Manipulation sur les images

### Liste et ajout d'images

Vous pouvez voir la liste des images au sein de votre Docker avec la ligne de commande suivante :

```bash {frame="none"}
docker images
```

Par exemple, si vous avez exécuté la commande `docker run hello-world` du tutoriel précédent, vous pourrez voir l'image "hello-world" dans la liste :

```bash {title="Terminal"}
mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED        SIZE
hello-world   latest   74cc54e27dc4   4 months ago   10.1kB
```

 Il est également possible de remplir cette liste en ajoutant de nouvelles images sur notre Docker. Par exemple, essayez d'ajouter l'image de ROS 2 Humble, avec la commande ci-dessous :

```bash {frame="none"}
docker pull ros:humble
```

Vous pouvez vérifier que l'image a bien été ajoutée avec `docker images` :

```bash {title="Terminal"}
mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED        SIZE
hello-world   latest   74cc54e27dc4   4 months ago   10.1kB
ros           humble   168e1f658ab5   3 years ago    753MB
```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Comme vous avez peut-être pu le constater avec l'image "hello-world" lors du [tutoriel précédent]({{< relref "tutorials/computer_science/introduction_to_docker_part1">}}) si l'on essaie de lancer le conteneur d'une image sans l'avoir ajoutée, Docker l'ajoutera automatiquement.
{{< /callout >}}

### Suppression d'images

Pour supprimer une image, par exemple "hello-world", vous pouvez utiliser la commande ci-dessous :

```bash {frame="none"}
docker rmi hello-world
```

```bash {title="Terminal"}
mowibox@chroma:~$ docker rmi hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 55ccfd696889 is using its referenced image 74cc54e27dc4
```

La suppression n'a pas fonctionné ! Et je parie que de votre côté non plus. Pourquoi ? Parce que nous avons lancé un conteneur qui est encore présent (qu'il soit actif ou à l'arrêt), donc Docker ne nous laisse pas supprimer l'image si facilement. Pour tout de même forcer la suppression, utilisez le flag `-f`

```bash {frame="none"}
docker rmi -f hello-world
```

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~$ docker rmi -f hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:940c619fbd418f9b2b1b63e25d8861f9cc1b46e3fc8b018ccfe8b78f19b8cc4f
Deleted: sha256:74cc54e27dc41bb10dc4b2226072d469509f2f22f1a3ce74f4a59661a1d44602

mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED       SIZE
ros           humble   168e1f658ab5   3 years ago   753MB
```

Ainsi, l'image est bien supprimée de la liste.

## Manipulation sur les conteneurs

### Création de conteneur

Maintenant, essayez de démarrer un conteneur de l'image de ROS 2 Humble avec la commande `run`:

```bash {frame="none"}
docker run ros:humble
```

Paradoxalement, si tout s'est bien passé, rien ne s'est passé... Par défaut, Docker va lancer la commande pour ouvrir un conteneur et le quitter dès qu'il a terminé. Pour le déploiement d'applications, par exemple en robotique, c'est le comportement recherché : On lance le protocole, il s'exécute jusqu'à sa fin puis s'arrête.

Mais comme on en est plutôt à la partie développement, nous aimerions pouvoir utiliser un terminal au sein du conteneur, sans qu'il se ferme sytématiquement. Pour ce faire on utilise les flags `-it` (`i` pour interactive et `t` pour tty) :

```bash {frame="none"}
docker run -it ros:humble
```

Exemple :

```bash {title="root@2f7a757d7c23:/"}
mowibox@chroma:~$ docker run -it ros:humble
root@2f7a757d7c23:/#
```

Tout comme dans un terminal, vous pouvez regarder les fichiers/dossiers du répertoire actuel (`ls`), en créer de nouveaux (`touch`/`mkdir`), les supprimer (`rm`), etc.

### Liste et suppression de conteneurs

Comme avec les images, il est possible de regarder la liste des conteneurs actifs. Sans fermer votre conteneur, ouvrez un second terminal et lancez-y la commande :

```bash {frame="none"}
docker ps
```

Exemple :

```bash {title="Terminal n°2"}
mowibox@chroma:~$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS     NAMES
2f7a757d7c23   ros:humble   "/ros_entrypoint.sh …"   3 minutes ago   Up 3 minutes             suspicious_black
```

Au sein du conteneur, vous pouvez utiliser les commandes ROS 2 sans avoir à passer par toute l'installation classique, Génial non ?

Exemple de commande dans le conteneur :

```bash {title="root@2f7a757d7c23:/"}
root@2f7a757d7c23:/# ros2 topic list
/parameter_events
/rosout
```

et en dehors du conteneur (_En supposant que l'utilisateur n'a pas de distribution ROS installée nativement sur sa machine_) :

```bash {title="Terminal n°2"}
mowibox@chroma:~$ ros2 topic list
bash: ros2: command not found
```

Pour quitter le conteneur, deux méthodes s'offrent à vous :

* Dans le conteneur : Utilisez le raccourci "CTRL + D" ou la commande `exit`.
* Avec le second terminal : Utilisez la commande `docker stop <name>`, `<name>` étant le nom du conteneur généré dans la liste des conteneurs. Dans mon cas, le conteneur se nomme "suspicious_black" donc je vais utiliser la commande :

```bash {frame="none"}
docker stop suspicious_black  # Adaptez la commande au nom de votre conteneur
```

Si vous exécutez `docker ps`, vous apercevrez que votre conteneur n'est plus actif. La commande `docker ps -a` vous donne accès à la liste de tous les conteneurs, même s'ils ont été arrêtés.

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED         STATUS         PORTS     NAMES

mowibox@chroma:~$ docker ps -a
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS         PORTS                NAMES
2f7a757d7c23   ros:humble   "/ros_entrypoint.sh …"   11 minutes ago   Exited (137)   About a minute ago   suspicious_black
```

Pour redémarrer un conteneur, utilisez la commande :

```bash {frame="none"}
docker start -i suspicious_black # Adaptez la commande au nom de votre conteneur
```

Pour supprimer un conteneur inactif, ces deux commandes vous seront utiles :

* Pour supprimer un conteneur spécifique :

```bash {frame="none"}
docker rm <name>
```

* Pour supprimer l'intégralité des conteneurs inactifs (listés sous `docker ps`) :

```bash {frame="none"}
docker container prune
```

### Ouvrir un conteneur avec plusieurs terminaux

Dans certaines situations, vous pouvez avoir besoin d'ouvrir deux terminaux au sein d'un même conteneur. Pour ce faire, le premier terminal permet d'ouvrir un conteneur avec la commande apprise précédemment :

```bash {frame="none"}
docker run -it ros:humble
```

On peut ainsi entrer dans le conteneur avec un second terminal via la commande suivante :

```bash {frame="none"}
docker exec -it <name> /bin/bash
```

Exemple :

```bash {title="Terminal n°1"}
mowibox@chroma:~$ docker run -it ros:humble
root@a719943a59fc:/#
```

```bash {title="Terminal n°2"}
mowibox@chroma:~$ docker ps # Pour récupérer le nom du conteneur
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS     NAMES
a719943a59fc   ros:humble   "/ros_entrypoint.sh …"   12 seconds ago   Up 11 seconds             unruffled_cray

mowibox@chroma:~$ docker exec -it unruffled_cray /bin/bash
root@a719943a59fc:/#
```

La commande `docker run` possède quelques flags supplémentaires qui peuvent s'avérer pratiques.

* Le flag `--name` permet de définir un nom pour son conteneur. Cela évite de devoir gérer un nom aléatoire à chaque création de conteneur :

```bash {frame="none"}
docker run --name <container_name> <image_name>
```

* Le flag `-rm` permet de supprimer automatiquement le conteneur une fois que ce dernier est stoppé :

```bash {frame="none"}
docker run -rm <image name>
```

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Plusieurs flags peuvent être utilisés en même temps !
{{< /callout >}}

Avec ces commandes, vous avez déjà de bonnes bases pour comprendre le fonctionnement des images et des conteneurs. Cependant, à chaque fois que l'on crée un nouveau conteneur, on perd tous les changements que l'on aurait pu faire dans un autre avec une image similaire, et nous n'avons donc pour le moment aucun moyen d'y conserver nos données et nos fichiers. C'est là que le Dockerfile intervient, objet du prochain tutoriel.

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Relecteur :** Loubna LATRECHE, [Gauthier BIEHLER](https://github.com/Minorzar)
