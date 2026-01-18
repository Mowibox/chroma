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

Tout au long de cette introduction, nous avons illustré nos propos et nos manipulations via la `repository-mine`. De manière générale, une mine est créée pour en extraire des minerais, un filon, un trésor... Ne serait-ce pas une bonne idée d'ajouter un trésor à la `repository-mine` pour lui apporter de la valeur ? En ce sens, j'ai créé au sein du repository un fichier nommé `Notre_Tresor.md` :

```md {title="Notre_Tresor.md"}
# Notre trésor

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
* Des labels : Ils permettent de catégoriser l'issue. Ici, on a mis le label `enhancement`, car le but de l'issue est d'apporter une amélioration au repository de base. Le label `good first issue` indique qu'il s'agit d'une issue idéale pour ceux qui apporter une première contribution au projet.

La prochaine étape est donc de modifier les fichiers concernés afin d'enrichir le trésor commun. Or, le repository ayant été créé par moi-même, vous ne pouvez pas modifier directement le contenu. Plutôt que de donner un à un les droits d'écriture à chaque contribueur, GitHub propose un mécanisme alternatif : la fork.

## Fork un repository

"Forker" un repository consiste à créer une copie complète d'un repository sur votre propre compte GitHub. Cette copie vous appartient : vous pouvez y effectuer toutes les modifications que vous souhaitez. C'est le mode de fonctionnement le plus courant pour contribuer à un projet sans en être propriétaire original.

<p align="center">
    <img src="/chroma/images/gitgithub30.png" alt="Two mines" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Fork un repository, c'est comme avoir une mine identique à l'originale dans laquelle vous pouvez tout faire !</em>
</p>

Pour illustrer comment créer une fork, un nouveau contribueur est introduit : Chromatistí.

<p align="center">
    <img src="/chroma/images/gitgithub31.png" alt="Chromatisti" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chromatistí !</em>
</p>

* Pour créer une fork, Chromatistí va se rendre sur mon repository et appuyer sur le bouton "Fork" :

<p align="center">
    <img src="/chroma/images/gitgithub32.png" alt="Create a fork" class="w-full h-auto" />
</p>

* Chromatistí vérifie ensuite les informations de sa fork. Les informations par défaut sont celles du repository de référence, mais elles peuvent aussi être modifiées à souhait :

<p align="center">
    <img src="/chroma/images/gitgithub33.png" alt="Fork informations" class="w-full h-auto" />
</p>

* Chromatistí appuie sur "Create a fork" et obtient finalement une `repository-mine` identique à l'originale (c'est bien son icône qui est à côté du nom du repository) :

<p align="center">
    <img src="/chroma/images/gitgithub34.png" alt="Fork repository" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez une fork de [repository-mine](https://github.com/Mowibox/repository-mine), puis clonez le repository sur votre machine.
{{< /callout >}}

## Les branches

quand vous avez des choses à tester sans le projet original

### Création de branche

La commande `git-checkout -b <nom_de_branche>` permet de créer une nouvelle branche. Ainsi, si Chromatistí entre la commande :

```bash
git checkout -b mon-tresor
```

une nouvelle branche nommée `mon-tresor` et crée et l'y positionne directement. Il est ainsi possible de modifier le fichier `Notre_Tresor.md` avec une citation, sans altérer la branche principale :

```md {title="Notre_Tresor.md"}
# Notre trésor

* "Les limites de l'imagination sont celles qu'on lui impose."

* "Une image vaut mille mots." – Confucius (Printer’s Ink, 1921).
```

<p align="center">
    <img src="/chroma/images/gitgithub35.png" alt="Branch creation" class="w-full h-auto" />
</p>

Pour que les modifications soient effectives dans Git, il faut utiliser les mêmes commandes que dans la partie précédente. La seule subtilité est l'ajout du flag `--set-upstream origin <nom_de_branche>` à la commande `git push` :

```bash
git add Notre_Tresor.md
git commit -m "Ajout de mon trésor au bien commun"
git push --set-upstream origin mon-tresor
```

La branche ainsi que ses modifications associées sont alors visibles sur Github.

<p align="center">
    <img src="/chroma/images/gitgithub36_fr.png" alt="Branch selection" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Le changement de branche est directement disponible dans l'interface principale.</em>
</p>

<p align="center">
    <img src="/chroma/images/gitgithub37_fr.png" alt="Branch my-treasure overview" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Ici, on voit que la branche active est "mon-tresor" et que le commit a bien été pris en compte.</em>
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez une nouvelle branche et modifiez le fichier "Notre_Tresor.md" en respectant les directives suivantes :
{{< /callout >}}

La commande `git checkout <nom_de_branche>`, vous permet de changer de branche active. Par exemple pour retourner sur la branche principale, il faut écrire :

```bash
git checkout main
```

Vous verrez alors que le fichier `Notre_Tresor.md` est revenu à son état d'origine.

<p align="center">
    <img src="/chroma/images/gitgithub38.png" alt="Main branch" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Vous êtes ici !</em>
</p>

Essayez de vous déplacer de branche en branche pour voir les différents changements !

### Fusion de branche

à partir de main

```bash
git merge mon-tresor
```

Les modifications effectuées dans la branche `mon-tresor` apparaissent désormais sur la branche `main` :

```md {title="Notre_Tresor.md"}
# Notre trésor

* "Les limites de l'imagination sont celles qu'on lui impose."

* "Une image vaut mille mots." – Confucius (Printer’s Ink, 1921).
```

<p align="center">
    <img src="/chroma/images/gitgithub39.png" alt="Merging branches" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">On fusionne les deux branches du train pour n'avoir qu'une seule mine.</em>
</p>

Lorsqu'une branche est fusionnée, elle peut être supprimée avec la commande `git branch -d <nom_de_branche>`. Par exemple, pour Chromatistí :

```bash
git branch -d mon-tresor
```

Les manipulations ayant été faites en local, il faut ensuite pousser les modifications sur le repository distant pour qu'elles soient effectives :

```bash
git push
```

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Fusionnez votre branche avec la branche principale et supprimez la branche.
{{< /callout >}}

## Les pull requests

<p align="center">
    <img src="/chroma/images/gitgithub40.png" alt="Pull request on mines" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"></em>
</p>

Contribute -> Open pull request

<p align="center">
    <img src="/chroma/images/gitgithub41_fr.png" alt="Adding reference" class="w-full h-auto" />
</p>

Référencer l'issue

<p align="center">
    <img src="/chroma/images/gitgithub42_fr.png" alt="Pull request pending" class="w-full h-auto" />
</p>

Lorsque la pull request est envoyée, il ne reste plus qu'à attendre qu'un contribueur (en l'occurence, moi) vienne la valider :

<p align="center">
    <img src="/chroma/images/gitgithub43_fr.png" alt="Accepted pull request" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/gitgithub44_fr.png" alt="Final treasure" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Et voilà !</em>
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Réalisez une pull request pour intégrer vos modifications au repository principal. N'oubliez pas de référencer la bonne issue !
{{< /callout >}}

{{< callout context="tip" title="Remarque sur les branches et les pull requests" icon="outline/message-dots" >}}
Vous aurez probablement remarqué (ou non) que fusionner une branche et réaliser une pull request aboutissent, au final, au même résultat : intégrer des modifications d’une branche dans une autre (souvent `main`).

Toutefois, ces deux opérations ne jouent pas le même rôle :

* La fusion de branche via `git merge` est une action généralement effectuée en local. Elle est rapide, directe, mais n’implique aucun mécanisme de validation, de discussion ou de contrôle.
* La pull request est un processus propre à GitHub qui encadre cette fusion : elle permet de relire le code, de discuter des changements, et de garder une trace claire des décisions prises avant la fusion.

En pratique :

* Sur un projet personnel ou en local, un simple `git merge` peut suffire.
* Sur un projet collaboratif, on privilégie la pull request, qui peut provenir d’une fork ou bien d’une branche du même repository lorsque plusieurs collaborateurs ont les droits d’écriture.

{{< /callout >}}

## Pour aller plus loin


## Tableau récapitulatif des commandes

Comme pour la partie précédente, ce tableau récapitule l'ensemble des fonctions vues au cours de ce tutoriel ainsi que leur utilité. N'hésitez pas à le garder sous la main au début pour vous familiariser avec les commandes !

| Commande | Description |
| --------------------------- | ------------- |
| [`git pull`](https://git-scm.com/docs/git-pull) | Récupère les dernières modifications depuis le repository distant et met à jour votre copie locale. |
| [`git add`](https://git-scm.com/docs/git-add) | Ajoute des fichiers créés ou modifiés à la staging area. |
| [`git rm`](https://git-scm.com/docs/git-rm) | Supprime un fichier du projet et informe Git de cette suppression. |
| [`git commit`](https://git-scm.com/docs/git-commit) | Enregistre les modifications ajoutées avec un message (`-m "Message"`) décrivant l’action effectuée. |
| [`git push`](https://git-scm.com/docs/git-push) | Envoie vos commits vers le repository distant. |
| [`git checkout -b <branche>`](https://git-scm.com/docs/git-checkout) | Crée une nouvelle branche à partir de la branche courante et s’y positionne immédiatement. |
| [`git checkout <branche>`](https://git-scm.com/docs/git-checkout) | Change la branche active du repository local. |
| [`git push --set-upstream origin <branche>`](https://git-scm.com/docs/git-push) | Pousse la branche locale vers le repository distant et définit la branche distante comme référence par défaut (*upstream*). |
| [`git merge <branche>`](https://git-scm.com/docs/git-merge) | Fusionne la branche spécifiée avec la branche active. |
| [`git branch -d <branche>`](https://git-scm.com/docs/git-branch) | Supprime une branche locale uniquement si elle a déjà été fusionnée. |

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Janvier 2026
* **Relecteur :**
