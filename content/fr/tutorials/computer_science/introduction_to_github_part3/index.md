---
title: "Introduction à Git et GitHub – Partie 3"
summary: Issues, forks, branches et pull requests
weight: 1005
icon: "git-branch"
---

<p align="center">
    <img src="/chroma/images/gitgithub.png" alt="Git and GitHub part 3" class="w-full h-auto" />
</p>

Dans cette dernière partie du tutoriel d'introduction à Git et GitHub, vous apprendrez à maîtriser les fonctionnalités collaboratives avancées de GitHub, telles que les issues, les branches et les pull requests, afin de gérer efficacement vos contributions et celles des autres dans un projet GitHub.

## Prérequis

* Avoir complété [l'initiation à Git et GitHub – Partie 2.]({{< relref "tutorials/computer_science/introduction_to_github_part2">}})

* Avoir quelques notions sur [l'utilisation d'un terminal.]({{< relref "tutorials/computer_science/using_terminal">}})

## Objectif final : La mine aux trésors

<p align="center">
    <img src="/chroma/images/gitgithub2.jpg" alt="Repository mine" class="w-full h-auto" />
</p>

Tout au long de cette introduction, nous avons illustré nos propos et nos manipulations via la `repository-mine`. De manière générale, une mine est créée pour en extraire des minerais, un filon, un trésor... Ne serait-ce pas une bonne idée d'ajouter un trésor à la `repository-mine` pour lui apporter de la valeur ? Dans cette optique, j'ai créé au sein du repository un fichier nommé [`Notre_Tresor.md`](https://github.com/Mowibox/repository-mine/blob/main/Notre_Tresor.md) :

```md {title="Notre_Tresor.md"}
# Notre trésor

* "Les limites de l'imagination sont celles qu'on lui impose."
```

Pour le moment il n'est pas très rempli, je peux vous l'accorder... Mais il s'agit d'une phrase qui me tient à cœur, un principe important sur lequel je fonde ma manière de penser. Comme cette phrase a de la valeur pour moi, je peux la considérer comme un trésor. C'est la première pierre d'un trésor bien plus grand : les suivantes, c'est à vous de les poser !

Le but final est de remplir ce trésor commun avec votre touche personnelle : cela peut être une citation que vous appréciez particulièrement, une phrase qui vous inspire, des pensées ou des mots de qui vous donnent de la motivation au quotidien et que vous souhaitez partager avec autrui. Ce fichier constituera ainsi le cœur du trésor de la `repository-mine`, enrichi par les contributions de chacun.

## Les issues

Une issue est un espace de discussion associé à un repository. Concrètement, elles permettent de signaler un bug, proposer une amélioration, décrire un problème ou poser une question. Cela aide les contributeurs à avoir une vue globale sur les problèmes et les objectifs liés au repository et à suivre leur résolution au fil du projet.

Sur GitHub, il me suffit de cliquer sur l'onglet **"Issues"** de mon repository, puis sur **"New Issue"** :

<p align="center">
    <img src="/chroma/images/gitgithub29_fr.png" alt="Issue description" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;"><a href="https://github.com/Mowibox/repository-mine/issues/2">Voir l'issue sur GitHub.</a></em>
</p>

Dans l'image ci-dessus on peut voir les différentes caractéristiques d'une issue :

* **Un titre :** "Enrichir notre trésor". Le titre permet de résumer en une phrase de quoi l'issue traite.
* **Une description :** Elle permet d'apporter plus de détail au contexte de l’issue, en expliquant ce qui est attendu et en précisant éventuellement les contraintes ou les pistes à suivre.
* **Des labels :** Ils permettent de catégoriser l'issue. Ici, on a mis le label `enhancement`, car le but de l'issue est d'apporter une amélioration au repository de base. Le label `good first issue` indique qu'il s'agit d'une issue idéale pour ceux qui veulent apporter une première contribution au projet.

La prochaine étape est donc de modifier les fichiers concernés afin d'enrichir le trésor commun. Or, le repository ayant été créé par moi-même, vous ne pouvez pas modifier directement le contenu. Plutôt que de donner un à un les droits d'écriture à chacun, GitHub propose un mécanisme alternatif : **la fork.**

## Les forks

Pour illustrer comment créer une fork, un nouveau contributeur est introduit : **Chromatistí.**

<p align="center">
    <img src="/chroma/images/gitgithub30.png" alt="Chromatisti" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Chromatistí !</em>
</p>

"Forker" un repository consiste à créer une copie complète d'un repository sur votre propre compte GitHub. Cette copie, la fork, vous appartient : vous pouvez y effectuer toutes les modifications que vous souhaitez. C'est le mode de fonctionnement le plus courant pour contribuer à un projet sans en être propriétaire original.

<p align="center">
    <img src="/chroma/images/gitgithub31.png" alt="Two mines" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Fork un repository, c'est comme avoir une mine identique à l'originale dans laquelle vous pouvez tout faire !</em>
</p>


* Pour créer une fork, Chromatistí va se rendre sur mon repository et appuyer sur le bouton **"Fork"** :

<p align="center">
    <img src="/chroma/images/gitgithub32.png" alt="Create a fork" class="w-full h-auto" />
</p>

* Chromatistí vérifie ensuite les informations de sa fork. Les informations par défaut sont celles du repository de référence, mais elles peuvent aussi être modifiées à souhait :

<p align="center">
    <img src="/chroma/images/gitgithub33.png" alt="Fork informations" class="w-full h-auto" />
</p>

* Chromatistí appuie sur **"Create fork"** et obtient finalement une `repository-mine` identique à l'originale (c'est bien son icône qui est à côté du nom du repository) :

<p align="center">
    <img src="/chroma/images/gitgithub34.png" alt="Fork repository" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez une fork de [repository-mine](https://github.com/Mowibox/repository-mine), puis clonez le repository sur votre machine.
{{< /callout >}}

## Les branches

Une branche est une ligne de développement parallèle qui permet de travailler sur des modifications sans affecter la version principale du projet. Les branches s’avèrent très utiles lorsque vous souhaitez tester de nouvelles idées, corriger des bugs ou développer de nouvelles fonctionnalités sans impacter le projet original. Ici, la branche sera utilisée pour apporter des modifications au fichier `Notre_Tresor.md` avant de les intégrer, une fois validées, à la branche principale.

### Création de branche

La commande `git checkout -b <nom_de_branche>` permet de créer une nouvelle branche. Ainsi, si Chromatistí ouvre un terminal dans son repository local et entre la commande :

```bash {frame="none"}
git checkout -b mon-tresor
```

une nouvelle branche nommée `mon-tresor` et créée et l'y positionne directement. Il est ainsi possible de modifier le fichier `Notre_Tresor.md` avec une citation, sans altérer la branche principale :

```md {title="Notre_Tresor.md", hl_lines=[5]}
# Notre trésor

* "Les limites de l'imagination sont celles qu'on lui impose."

* "Une image vaut mille mots." – Confucius (Printer’s Ink, 1921).
```

<p align="center">
    <img src="/chroma/images/gitgithub35_fr.png" alt="Branch creation" class="w-full h-auto" />
</p>

Pour que les modifications soient effectives dans Git, il faut utiliser les mêmes commandes que dans la partie précédente. La seule subtilité à prendre en compte est l'ajout du flag `--set-upstream origin <nom_de_branche>` à la commande `git push` :

```bash {frame="none"}
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

* Chaque contribution doit commencer par un `*` (liste à puces Markdown).
* La citation ou le texte doit être encadré par des guillemets `" "`.
* Si possible, précisez la source (auteur, ouvrage, année).
* N’ajoutez qu’une seule contribution par personne.
* Ne modifiez pas les contributions des autres.
{{< /callout >}}

La commande `git checkout <nom_de_branche>`, vous permet de changer de branche active. Par exemple, pour retourner sur la branche principale, il faut écrire :

```bash {frame="none"}
git checkout main
```

Vous verrez alors que le fichier `Notre_Tresor.md` est revenu à son état d'origine.

<p align="center">
    <img src="/chroma/images/gitgithub38_fr.png" alt="Main branch" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Vous êtes ici !</em>
</p>

Essayez de vous déplacer de branche en branche pour voir les différents changements !

### Fusion de branches

La fusion de branches permet de combiner les modifications de deux branches afin de créer une version unifiée du projet. La commande `git merge <nom_de_branche>` permet de réaliser cette opération.

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Pour fusionner la branche `<nom_de_branche>` avec une autre, il faut **obligatoirement être positionné sur la branche de destination** (celle qui recevra les modifications) avec `git checkout <branche_de_destination>` !
{{< /callout >}}

Avec Chromatistí, cela donnerait :

```bash {frame="none"}
git checkout main  # déplacement sur la branche main
git merge mon-tresor
```

Les modifications effectuées dans la branche `mon-tresor` apparaissent désormais sur la branche `main` :

```md {title="Notre_Tresor.md"}
# Notre trésor

* "Les limites de l'imagination sont celles qu'on lui impose."

* "Une image vaut mille mots." – Confucius (Printer’s Ink, 1921).
```

<p align="center">
    <img src="/chroma/images/gitgithub39_fr.png" alt="Merging branches" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">De manière imagée : on fusionne les deux branches du train pour n'avoir qu'une seule mine.</em>
</p>

Lorsqu'une branche est fusionnée, elle peut être supprimée avec la commande `git branch -d <nom_de_branche>`. Par exemple, pour Chromatistí :

```bash {frame="none"}
git branch -d mon-tresor
```

Les manipulations ayant été faites en local, il faut ensuite pousser les modifications sur le repository distant pour qu'elles soient effectives :

```bash {frame="none"}
git push
```

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Fusionnez votre branche avec la branche principale, puis supprimez-la.
{{< /callout >}}

Vous avez finalement votre trésor au sein de la mine ! Mais rappelez-vous, les modifications ont été réalisées au sein de votre fork. Il reste encore une dernière étape qui consiste à inclure ces changements au sein du repository principal. C'est le rôle de la **pull request**.

## Les pull requests

La pull request est un mécanisme fondamental de GitHub qui permet de proposer la fusion de changements d’une branche vers une autre, tout en offrant un espace de discussion et de validation avant leur intégration.

<p align="center">
    <img src="/chroma/images/gitgithub40_fr.png" alt="Pull request on mines" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">C'est comme demander à relier les deux mines pour n'en avoir qu'une seule.</em>
</p>

{{< callout context="tip" title="Remarque sur les branches et les pull requests" icon="outline/message-dots" >}}
Vous aurez probablement remarqué (ou non) que fusionner une branche et réaliser une pull request aboutissent, au final, au même résultat : intégrer des modifications d’une branche dans une autre (souvent `main`).

Toutefois, ces deux opérations ne jouent pas le même rôle :

* La fusion de branche via `git merge` est une action généralement effectuée en local. Elle est rapide, directe, mais n’implique aucun mécanisme de validation, de discussion ou de contrôle.
* La pull request est un processus propre à GitHub qui encadre cette fusion : elle permet de relire le code, de discuter des changements, et de garder une trace claire des décisions prises avant la fusion.

En pratique :

* Sur un projet personnel ou en local, un simple `git merge` peut suffire.
* Sur un projet collaboratif, on privilégie la pull request, qui peut provenir d’une fork ou bien d’une branche du même repository lorsque plusieurs collaborateurs ont les droits d’écriture.

{{< /callout >}}

Tout le processus se passe sur GitHub :

* Dans sa fork, Chromatistí appuie sur le bouton **"Contribute"**, puis sur **"Open pull request"**, ce qui lui ouvre une interface dans laquelle il peut écrire un titre et une description à sa proposition :

<p align="center">
    <img src="/chroma/images/gitgithub41_fr.png" alt="Adding reference" class="w-full h-auto" />
</p>

Pour cet exercice, il peut se contenter d'écrire "Pull request pour l'issue ...". Pour quelle issue ? Il y a deux manières de le préciser :

* En appuyant sur le bouton **"Reference"** comme indiqué dans l'image ci-dessus.
* En tapant "#" dans le champ de description.

Dans les deux cas, la liste des issues et des anciennes pull requests s'affiche, il suffit alors de sélectionner l'issue qui concerne les modifications (ici, l'issue #2).

<p align="center">
    <img src="/chroma/images/gitgithub42_fr.png" alt="Pull request pending" class="w-full h-auto" />
</p>

Ajouter une description et des références permet d'ajouter du contexte aux modifications apportées, ce qui facilite la compréhension pour le propriétaire originel du repository.

Une fois la pull request créée (**"Create pull request"**), il ne reste plus qu'à attendre qu'un contributeur (en l'occurrence, moi) vienne la valider :

<p align="center">
    <img src="/chroma/images/gitgithub43_fr.png" alt="Accepted pull request" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/gitgithub44_fr.png" alt="Final treasure" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Et voilà !</em>
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Réalisez une pull request pour intégrer vos modifications au repository principal. **N'oubliez pas de référencer la bonne issue !**
{{< /callout >}}

<p align="center">
    <img src="/chroma/images/gitgithub40_fr.png" alt="Final graph" class="w-full h-auto" />
</p>

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
