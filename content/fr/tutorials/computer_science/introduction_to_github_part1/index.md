---
title: "Introduction à Git et GitHub – Partie 1"
summary: Comprendre les bases avec des dessins
weight: 1003
icon: "git"
---

<p align="center">
    <img src="/chroma/images/gitgithub.png" alt="Git and GitHub" class="w-full h-auto" />
</p>

GitHub est un service web d'hébergement et de gestion de développement de logiciels, utilisant le logiciel de gestion de versions Git. À la manière d'un drive, il permet de stocker et de gérer des fichiers, mais il va bien au-delà en offrant un contrôle de version complet, la collaboration aisée entre développeurs et des fonctionnalités de suivi des problèmes. Pour comprendre leur fonctionnement sans entrer dans les détails les plus complexes, laissez-moi vous conter une petite histoire :

## Chrome et la "repository mine"

Voici Chrome.

<p align="center">
    <img src="/chroma/images/gitgithub1.png" alt="Chrome" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome : Un charme à toute épreuve !</em>
</p>

Chrome est un joyeux luron qui aime créer des fichiers et les partager avec ses amis. Avant, il utilisait toutes sortes de méthodes et de stratagèmes loufoques pour leur envoyer ses fichiers (lettre, pigeon voyageur et j'en passe !). Cela fonctionnait, mais dès qu'il voulait modifier son fichier, il était obligé de repasser par tous ses amis pour leur donne la dernière version. Et le problème se posait dans les deux sens : lorsque que l'un de ses amis voulait apporter une modification à son fichier, il devait la faire sur son fichier envoyer puis le renvoyer à Chrome, mais les autres n'avaient pas tout de suite la modification. Pire encore, si tous ses amis lui proposent une version modifiée, il se retrouve avec une multitude de fichiers à gérer !

Un beau jour, Chrome décida d'apporter une solution à son problème en créant une mine :

<p align="center">
    <img src="/chroma/images/gitgithub2.jpg" alt="Repository mine" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">La repository mine.</em>
</p>

Cette mine permettrait à chacun de venir récupérer les fichiers que tous ceux qui contribuent au projet déposent et modifient, pour éviter les doublons dispersés un peu partout. Pour abréger le nom de la mine, appelons là uniquement le **repository**. Pour pouvoir faciliter les transferts du repository à chez lui, Chrome va se créer une copie locale des fichiers issus du repository, le tout sera mis dans un chariot :

<p align="center">
    <img src="/chroma/images/gitgithub3.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Le chariot est une copie locale du contenu de la mine.</em>
</p>

Puisque Chrome vient de créer le repository, il n'a pas encore créé de fichier. Il est donc totalement normal que son chariot soit vide. L'objectif maintenant va être de le remplir. Par exemple, Chrome décide de créer un fichier A :

<p align="center">
    <img src="/chroma/images/gitgithub4.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome crée le fichier A, moi je trouve que c'est un super fichier, et vous ?</em>
</p>

Satisfait de son fichier A, il va donc le partager dans sa mine pour que tous ses amis puissent y jeter un coup d'œil. Il réalise ce partage en plusieurs étapes :

Tout d'abord il prépare le fichier A à l'envoi en **l'ajoutant (add)** à son chariot :

<p align="center">
    <img src="/chroma/images/gitgithub5.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome ajoute le fichier A.</em>
</p>

Pour que ses amis ne soient pas perdus dans la mine, il décide de noter la modification qu'il a apporté sur une petite note qu'il va attacher au chariot. Cet **engagement (commit)** lui permet de valider officiellement le contenu de son chariot.

<p align="center">
    <img src="/chroma/images/gitgithub6.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chrome décrit la modification qu'il va apporter à la mine : "Ajout du fichier A".</em>
</p>

<p align="center">
    <img src="/chroma/images/gitgithub7.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">En collant l'étiquette, il valide sa modification qui est prête à partir.</em>
</p>

Une fois que tout est prêt, Chrome a juste à **pousser (push)** son chariot jusque dans la mine pour le partager, rien de plus simple !

<p align="center">
    <img src="/chroma/images/gitgithub8.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PUSH</b></em>
</p>

## Here's come a new challenger!

Voici maintenant Nickel.

<p align="center">
    <img src="/chroma/images/gitgithub9.png" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Nickel : Pour différencier Chrome de Nickel, rien de tel qu'un chapeau melon aérodynamique !</em>
</p>

Nickel est un grand ami de Chrome qui aime également créer des fichiers. Lorsqu'il entend que Chrome a créé un repository, ce dernier n'a qu'une envie : contribuer au projet. Puisque Chrome considère Nickel comme une personne de confiance, il lui donne le droit de collaborer au sein de sa mine.

Pour récupérer le fichier A, Nickel doit aussi créer une copie locale du repository, qu'il mettra dans son chariot. Une fois ceci de fait, il pourra récupérer son fichier en **tirant (pull)** son chariot de la mine jusqu'à chez lui :

<p align="center">
    <img src="/chroma/images/gitgithub10.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PULL</b></em>
</p>

Nickel décide d'apporter des améliorations au fichier A, et comme il est de bonne humeur, il crée également un nouveau fichier B :

<p align="center">
    <img src="/chroma/images/gitgithub11.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Nickel modifie A et crée B, va-t-on faire tout l'alphabet ? Non ça serait trop long...</em>
</p>

Nickel va donc suivre les mêmes étapes que son cher compère Chrome afin de partager ses modifications au sein du repository :

Nickel prépare le fichier modifié A* et le fichier B en les **ajoutant (add)** à son chariot :

<p align="center">
    <img src="/chroma/images/gitgithub12.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Ajout des fichier A* et B.</em>
</p>

Il rédige ensuite une petite note qu'il attache à son chariot pour confirmer ses ajouts et modifications :

<p align="center">
    <img src="/chroma/images/gitgithub13.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Nickel <b>engage (commit)</b> ses modifications.</em>
</p>

Nickel n'a plus qu'à **pousser (push)** son chariot dans la mine !

<p align="center">
    <img src="/chroma/images/gitgithub14.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PUSH</b></em>
</p>

Enfin, si Chrome ou n'importe quel autre collaborateur du repository veut récupérer localement les modifications de Nickel, il a juste à **tirer (pull)** son chariot :

<p align="center">
    <img src="/chroma/images/gitgithub15.jpg" alt="" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><b>PULL</b></em>
</p>

Grâce à cette mine, chacun peut récupérer les dernières mises à jour, y apporter des améliorations, les valider et les partager avec tous les collaborateurs, évitant ainsi la confusion et le chaos des méthodes traditionnelles.

**FIN**

## Git et GitHub - Comparaison avec la mine

Au travers de cette histoire un peu extravageante, nous avons pu explorer de manière implicite le vocabulaire ainsi que les actions réalisables avec Git et GitHub. **Attention, il ne faut pas confondre Git et GitHub !** GitHub est le service d'hébergement, là où Git est la technologie sur laquelle repose GitHub pour gérer les différentes versions.

Un peu comme si GitHub vous donnait une représentation visuelle avec une interface utilisateur des commandes que vous allez effectuer avec Git (Git serait l'ensemble de la mine avec les chariots, et GitHub vous permettrait de visualiser cette mine d'une manière plus claire). Regardons un peu plus en détail le vocabulaire que l'on a découvert :

* **Repository :** Le repository (dépôt) est l'élément fondamental de GitHub. C'est le dossier qui va contenir tous les éléments du projet. Comme on a pu le voir avec Chrome & Nickel, un repository peut avoir plusieurs collaborateurs, ils peuvent donc être publics ou privés.
* **Clone :** Le clone est une copie locale du repository qui réside localement sur votre ordinateur plutôt qu'en ligne. Dans l'histoire, ça serait l'action de "Créer un chariot". C'est dans ce clone de votre repository qui vous pouvez faire vos modifications hors ligne.

Les autres noms que vous avez pu voir en gras tout au long de l'histoire **(add, commit, push, pull)** sont des commandes Git qui permettent de gérer les fichiers. Pour mieux vous les illustrer, je propose de vous les expliquer dans la partie suivante de ce tutoriel où l'on va manipuler des fichiers en créant notre propre repository.

<p align="center">
    <img src="/chroma/images/gitgithub16.jpg" alt="" class="w-full h-auto" />
    </br>
</p>

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Mai 2025
* **Relecteur :** Loubna LATRECHE, [Gauthier BIEHLER](https://github.com/Minorzar)
