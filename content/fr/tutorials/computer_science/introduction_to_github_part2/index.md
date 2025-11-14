---
title: "Introduction à Git et GitHub – Partie 2"
summary: Mise en pratique de la théorie
weight: 1004
icon: "github"
---

<p align="center">
    <img src="/chroma/images/gitgithub.png" alt="Git and GitHub part 2" class="w-full h-auto" />
</p>

Dans cette deuxième partie du tutoriel d'introduction à Git et GitHub, vous rentrerez dans le vif du sujet en manipulant les différents concepts théoriques expliquées au sein de la partie précédente.

## Prérequis

* Avoir complété [l'initiation à Git et GitHub – Partie 1.]({{< relref "tutorials/computer_science/introduction_to_github_part1">}})

* Avoir quelques notions sur [l'utilisation d'un terminal.]({{< relref "tutorials/computer_science/using_terminal">}})

## Installation de Git

Dans un premier temps, vous devez installer Git en vous rendant sur la [page officielle de téléchargement](https://git-scm.com/install/).

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Téléchargez Git en choisissant la version appropriée à votre OS (Windows, Linux, Mac, ...).
{{< /callout >}}

## Création d'un nouveau repository sur GitHub

<p align="center">
    <img src="/chroma/images/gitgithub2.jpg" alt="Repository mine" class="w-full h-auto" />
</p>

Une fois Git installé, la prochaine étape consiste à créer un compte sur la plateforme GitHub. Cela vous permettra de d'initialiser votre premier dépôt (repository).

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez un compte GitHub via la [page d'inscription.](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)
{{< /callout >}}

C'est maintenant que les choses sérieuses vont pouvoir commencer. Je vais d'abord vous montrer pas à pas les différentes étapes à réaliser, puis ce sera à votre tour de les reproduire :

* Pour commencer, j'appuie sur le bouton "+" situé en haut à gauche de la page. Cela me permet de sélectionner l'option "New repository".

<p align="center">
    <img src="/chroma/images/gitgithub18.png" alt="New repository" class="w-full h-auto" />
</p>

* Je rentre ensuite les différentes détails de mon repository :
  * **Son nom :** Pour rester dans l'histoire de la partie précédente, je vais l'appeler la "repository-mine", mais libre à vous de choisir le nom qui vous plaît !
  {{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
  Les espaces ne sont pas autorisés dans le nom du repository : il ne peut seulement contenir des lettres ASCII, des chiffres, ainsi que les caractères ".", "_", et "-".
  {{< /callout >}}
  * **Sa description :** Pour détailler en une ligne ou deux en quoi consistera le projet.
  * **Sa visibilité :** Sur GitHub, vous pouvez choisir de rendre un repository public ou privé. Un repository public sera visible par toute personne consultant votre profil, tandis qu’un repository privé ne sera accessible qu’à vous (ou aux personnes que vous y autorisez). Dans le cadre du tutoriel, je rends le mien public, mais encore une fois, vous êtes libre de choisir l'option qui vous convient.

<p align="center">
    <img src="/chroma/images/gitgithub19.png" alt="Repository details" class="w-full h-auto" />
</p>

* Remarquez que je coche également l’option pour ajouter un **README** à mon repository. Un README est un fichier contenant une présentation du projet et les informations essentielles pour en comprendre l’objectif et l’utilisation. Je rentrerai dans ses détails une autre fois car ce n'est pas le cœur du tutoriel, mais il est fortement conseillé de cocher cette option à chaque création de repository.

* Enfin, je n'ai plus qu'à appuyer sur "Create repository" et observer mon repository tout neuf !

<p align="center">
    <img src="/chroma/images/gitgithub20.png" alt="A setup repository" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Suivez les étapes détaillées ci-dessus afin de créer un repository.
{{< /callout >}}

## Clonage du repository en local sur votre machine

<p align="center">
    <img src="/chroma/images/gitgithub3.jpg" alt="Local copy" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Le chariot est l'équivalent de la copie locale du repository.</em>
</p>

Pour le moment votre repository n'est accessible que sur GitHub, il sera plus pratique d'avoir une copie locale sur votre ordinateur pour y ajouter vos fichiers, modifications etc. C'est l'objectif principal de cette section.

Quelque soit votre système d'exploitation, vous pouvez copier le lien GitHub associé à votre repository en cliquant sur Le bouton vert "<> Code" puis sur l'icône "copier". Vérifiez que le lien copié est bien le lien "HTTPS".

<p align="center">
    <img src="/chroma/images/gitgithub21.png" alt="Copy to clipboard" class="w-full h-auto" />
</p>

Comme les étapes suivantes diffèrent selon que vous soyez sur Windows ou Linux/Mac, la suite de cette introduction est séparée en deux sections. Dans chacune d’elles, je vous montre comment cloner repository-mine en local en utilisant le système d’exploitation correspondant. Vous pouvez ainsi suivre la section adaptée à votre environnement.

{{< details "Cloner un repository sur Windows" >}}

* Sur mon ordinateur, je choisis l'emplacement où cloner le dossier du projet, par exemple dans mon dossier "Documents". Une fois l'emplacement décidé, je réalise un clic droit dans l'explorateur de fichiers, pour sélectionner "Plus d'options", puis "Git Bash Here" :

<p align="center">
    <img src="/chroma/images/gitgithub22.png" alt="Git Bash Here" class="w-full h-auto" />
</p>

* Après avoir cliqué sur l'option "Git Bash Here", un terminal s'ouvre, me permettant d'utiliser les commandes Git :

```bash {title="MINGW64:/c/Users/Mowibox/Documents"}
Mowibox@CHROMA MINGW64 ~/Documents
$
```

* La console Git étant lancée, je n'ai plus qu'à exécuter la commande `git clone` suivie de l'adresse HTTPS copiée précédemment. Dans mon cas, cela donnerait :

```bash {title="MINGW64:/c/Users/Mowibox/Documents"}
Mowibox@CHROMA MINGW64 ~/Documents
$ git clone https://github.com/Mowibox/repository-mine.git
```

* Il ne me reste plus qu'à exécuter la commande pour voir apparaître le dossier dans mon explorateur de fichiers.

<p align="center">
    <img src="/chroma/images/gitgithub22.png" alt="Your repository (Windows)" class="w-full h-auto" />
</p>

{{< /details >}}

{{< details "Cloner un repository sur Linux/Mac" >}}

* Sur mon ordinateur, je choisis un emplacement dédié dans l'explorateur de fichiers, par exemple dans mon dossier "Documents". Avec un clic droit dans l'explorateur, je sélectionne l'option "Open in terminal" ce qui me permet d'avoir un terminal ouvert directement dans l'emplacement "Documents" :

<p align="center">
    <img src="/chroma/images/gitgithub23.png" alt="Open in terminal" class="w-full h-auto" />
</p>

```bash {title="mowibox@chroma:~/Documents"}
mowibox@chroma:~/Documents$
```

_Remarque : Il est aussi possible d'ouvrir directement un terminal sans passer par l'explorateur avec le raccourci "Ctrl + Alt + T" (ou "Cmd + Alt + T"), et ensuite se rendre manuellement dans l'emplacement de votre choix via la commande [`cd`.]({{< relref "tutorials/computer_science/using_terminal/#cd">}})_

* Le terminal ouvert, je n'ai plus qu'à exécuter la commande `git clone` suivie de l'adresse HTTPS copiée précédemment. Dans mon cas, cela donnerait :

```bash {title="mowibox@chroma:~/Documents"}
mowibox@chroma:~/Documents$ git clone https://github.com/Mowibox/repository-mine.git
```

* Il ne me reste plus qu'à exécuter la commande pour voir apparaître le dossier dans mon explorateur de fichiers.

<p align="center">
    <img src="/chroma/images/gitgithub24.png" alt="Your repository (Linux/Mac)" class="w-full h-auto" />
</p>

{{< /details >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Clonez votre repository fraîchement créé en local sur votre machine.
{{< /callout >}}

## Apport de modifications au projet

Maintenant que le repository est

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez un ou plusieurs fichiers au sein du projet. Faites vous plaisir sur le contenu !
{{< /callout >}}


{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Utilisez les commandes add, commit et push pour ajouter vos modifications sur le repository distant.
N'oubliez pas de spécifier un message avec `-m "Message"` lors du commit !
{{< /callout >}}



## Suppression de fichiers du projet

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Utilisez les commandes rm, commit et push pour supprimer un de vos fichiers du projet.
{{< /callout >}}

## Récapitulatif des commandes


## Pour aller plus loin

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Octobre 2025
* **Relecteur :**
