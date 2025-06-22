---
title: "Utilisation de Docker – Partie 2"
summary: Images & conteneurs
weight: 5004
icon: "docker"
---

## Les images, les conteneurs, késako ?



## Manipulation sur les images



## Manipulation sur les conteneurs

Vous pouvez voir la liste des images au sein de votre docker avec la ligne de commande suivante :

```bash
docker images
```

Par exemple, si vous avez exécuté la commande `docker run hello-world` du tutoriel précédent, vous pourrez voir l'image "hello-world" dans la liste :

```bash {title="Terminal"}
mowibox@chroma:~$ docker images
REPOSITORY    TAG      IMAGE ID       CREATED        SIZE
hello-world   latest   74cc54e27dc4   4 months ago   10.1kB
```

 Il est également possible de remplir cette liste en ajoutant des images sur notre docker.
