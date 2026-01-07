---
title: "Introduction à Git et GitHub – Partie 3"
summary: Issues, branches et pull requests
weight: 1005
icon: "git-branch"
---

<p align="center">
    <img src="/chroma/images/gitgithub.png" alt="Git and GitHub part 3" class="w-full h-auto" />
</p>

Dans cette dernière partie du tutoriel d'introduction à Git et GitHub, vous

## Prérequis

* Avoir complété [l'initiation à Git et GitHub – Partie 2.]({{< relref "tutorials/computer_science/introduction_to_github_part2">}})

* Avoir quelques notions sur [l'utilisation d'un terminal.]({{< relref "tutorials/computer_science/using_terminal">}})

## Objectif final : La mine aux trésors

<p align="center">
    <img src="/chroma/images/gitgithub2.jpg" alt="Repository mine" class="w-full h-auto" />
</p>

Tout au long de cette introduction, nous avons illustré nos propos et nos manipulations via la `repository-mine`. De manière générale, une mine est créée pour en extraire des minerais, un filon, un trésor... Ne serait-ce pas une bonne idée d'ajouter un trésor à la `repository-mine` pour lui apporter de la valeur ? En ce sens, j'ai créé au sein du repository un fichier nommé `Notre_Tresor.txt` :

```txt {title="Notre_Tresor.txt"}
* "Les limites de l'imagination sont celles qu'on lui impose."
```

Pour le moment il n'est pas très rempli, je peux vous l'accorder... Mais il s'agit d'une phrase qui me tient à cœur, un principe important sur lequel je fonde ma manière de penser. Comme cette phrase a de la valeur pour moi, je peux la considérer comme un trésor. C'est la première pierre d'un trésor bien plus grand : les suivantes, c'est à vous de les poser !

Le but final est de remplir ce trésor commun avec votre touche personnelle : cela peut être une citation que vous appréciez particulièrement, une phrase qui vous inspire, des pensées ou des mots de qui vous donnent de la motivation au quotidien et que vous souhaitez partager avec autrui. Ce fichier constituera ainsi le cœur du trésor de la `repository-mine`, enrichi par les contributions de chacun.

## Les issues

Une issue est un espace de disscussion associé à un repository. Concrètement il permet de signaler un bug, proposer une amélioration, décrire un problème, poser une question, etc. Cela permet notamment aux contribueurs du repository en question d'avoir une vue globale sur les problèmes et les objectifs liés au repository et suivre leur résolution au fil du projet. Pour illustrer mon propos, je crée une issue pour l'objectif final expliqué précédemment.

Il me suffit cliquer sur l'onglet "Issues" de mon repository sur GitHub, puis sur "New Issue" :

<p align="center">
    <img src="/chroma/images/gitgithub29_fr.png" alt="Issue description" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><a href="https://github.com/Mowibox/repository-mine/issues/2">Voir l'issue sur GitHub.</a></em>
</p>

Dans l'image ci-dessus on peut voir les différentes caractéristiques d'une issue :

* Un titre : "Enrichir notre trésor". Le titre permet de résumer en une phrase de quoi l'issue traite.
* Une description : Elle permet d'apporter plus de détail au contexte de l’issue, en expliquant ce qui est attendu et en précisant éventuellement les contraintes ou les pistes à suivre.
* Des labels : Ils permettent de catégoriser l'issue. Ici, on a mis le labels `enhancement` car le but de l'issue est d'apporter une amélioration au repository de base. Le label `good first issue` indique qu'il s'agit d'une issue idéale pour ceux qui apporter une première contribution au projet.

## Fork un repository

<p align="center">
    <img src="/chroma/images/gitgithub30.png" alt="Chromatisti" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Je me demande bien ce que peut dire Chromatistí...</em>
</p>

<p align="center">
    <img src="/chroma/images/gitgithub31.png" alt="Create a fork" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/gitgithub32.png" alt="Fork informations" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/gitgithub33.png" alt="Fork repository" class="w-full h-auto" />
</p>

## Les branches

```bash
git checkout -b mon-tresor # création de branche
```
modifie le fichier en
```bash
git push --set-upstream origin mon-tresor
```

```bash
git checkout main # Se déplacer de branche en branche comme un singe
```
à partir de main

```bash
git merge mon-tresor
```
La ligne apparait dans le fichier
```bash
git branch -d mon-tresor # supprimer la branche
```

```bash
git push
```

## Les pull requests

Contribute -> Open pull request

Référencer l'issue

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Janvier 2026
* **Relecteur :**
