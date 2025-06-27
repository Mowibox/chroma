---
title: "Introduction à Docker – Partie 1"
summary: Installation de Docker
weight: 5003
icon: "docker"
---

<p align="center">
    <img src="/chroma/images/docker1.png" alt="Docker" class="w-full h-auto" />
</p>

Cette série de tutoriels vous illustrera comment utiliser Docker avec un ordinateur sous Linux. Cette partie est consacrée à l'installation de Docker.

## Docker ?

Docker est un outil open-source qui permet d'empaqueter une application et ses dépendances dans un environnement isolé, (appelé conteneur) pouvant être exécuté sur n'importe quel serveur.

_"C'est un peu comme une [machine virtuelle](https://cloud.google.com/learn/what-is-a-virtual-machine?hl=fr) alors...?"_

Oui et non ! Une machine virtuelle isole tout un système et dispose de ses propres ressources. Pour Docker, le noyau va partager les ressources de système hôte et interagir avec les conteneurs, ce qui réduit les surcharges et améliore les performances.

Avec Docker, vous allez pouvoir créer une image spécifique de votre application, qui encapsulera toutes les dépendances nécessaires, les bibliothèques, le système d'exploitation... Vous pourrez ensuite partager cette image Docker et l'exécuter de manière cohérente sur n'importe quel système prenant en charge Docker. Ainsi, vous pourrez exécuter des logiciels conçus pour les dernières versions d'un système d'exploitation sur des machines qui n'ont pas eu de mise à jour depuis des années.

Fini le fameux :

> "Mais... ça marche sur ma machine !"

Tout le monde utilise la même image, avec les mêmes versions, les mêmes dépendances, et donc les mêmes résultats.

## Installation sous Linux

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
La procédure d'installation présentée ci-dessous peut-être retrouvée sur le [site officiel de Docker.](https://docs.docker.com/engine/install/ubuntu)
{{< /callout >}}

Sur votre machine, ouvrez un terminal (Ctrl+Alt+T) et entrez les commandes suivantes :

```bash {frame="none"}
curl -fsSL https://get.docker.com -o get-docker.sh
```

Vous pouvez vérifier que vous avez bien récupéré le fichier get-docker.sh avec la commande `ls`.

Exécutez ensuite le fichier .sh pour lancer l'installation de Docker :

```bash {frame="none"}
sudo sh ./get-docker.sh
```

Une fois Docker installé, il reste encore quelques commandes de post-installation à exécuter :

Vérifiez que le groupe "docker" a bien été créé avec la commande `sudo groupadd docker` :

```bash {frame="none"}
sudo groupadd docker
```

Exemple de sortie si le groupe existe déjà :

```bash {title="Terminal"}
mowibox@chroma$ sudo groupadd docker
[sudo] password for mowibox:
groupadd: group 'docker' already exists
```

Ajoutez l'utilisateur (c'est vous !) au groupe docker :

```bash {frame="none"}
sudo usermod -aG docker $USER
```

Vérifiez ensuite si le service docker est activé (enabled) :

```bash {frame="none"}
systemctl is-enabled docker
```

Si ce n'est pas le cas, vous pouvez l'activer en entrant les commandes suivantes :

```bash {frame="none"}
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

Une fois toutes les commandes rentrées, vous pouvez redémarrer votre système pour que les modifications soient effectives :

```bash {frame="none"}
reboot
```

Et voilà ! Votre docker est prêt à l'emploi. Vous pouvez exécuter la commande `docker run hello-world` dans le terminal pour vous en assurer. Vous devriez obtenir le résultat ci-dessous :

```bash {title="Terminal"}
mowibox@chroma:~$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
e6590344b1a5: Pull complete
Digest: sha256:940c619fbd418f9b2b1b63e25d8861f9cc1b46e3fc8b018ccfe8b78f19b8cc4f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Le tutoriel suivant explique le concept propre à Docker des images et des conteneurs et vous apprendra à les prendre en main.

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Dernière mise à jour :** Juin 2025
* **Relecteur :** Loubna LATRECHE
