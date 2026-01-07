---
title: "Introduction à Git et GitHub – Partie 2"
summary: Mise en pratique de la théorie
weight: 1004
icon: "github"
---

<p align="center">
    <img src="/chroma/images/gitgithub.png" alt="Git and GitHub part 2" class="w-full h-auto" />
</p>

Dans cette deuxième partie du tutoriel d'introduction à Git et GitHub, vous rentrerez dans le vif du sujet en manipulant les différents concepts théoriques expliqués au sein de la partie précédente.

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

Une fois Git installé, la prochaine étape consiste à créer un compte sur la plateforme GitHub. Cela vous permettra d'initialiser votre premier dépôt (repository).

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez un compte GitHub via la [page d'inscription.](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home)
{{< /callout >}}

C'est maintenant que les choses sérieuses vont pouvoir commencer. Je vais d'abord vous montrer pas à pas les différentes étapes à réaliser, puis ce sera à votre tour de les reproduire :

* Pour commencer, j'appuie sur le bouton "+" situé en haut à gauche de la page. Cela me permet de sélectionner l'option "New repository".

<p align="center">
    <img src="/chroma/images/gitgithub18.png" alt="New repository" class="w-full h-auto" />
</p>

* Je rentre ensuite les différents détails de mon repository :
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

## Configuration du SSH

Le SSH (Secure Shell) est un protocole sécurisé qui permet de communiquer de manière chiffrée avec un serveur distant, notamment pour interagir avec GitHub sans avoir à saisir ses identifiants à chaque opération. Comme la manière de configurer le SSH diffère selon que vous soyez sur Windows ou Linux/Mac, cette section est décomposée en plusieurs parties. Dans chacune d’elles, je vous montre comment configurer le SSH le système d’exploitation correspondant. Vous pouvez ainsi suivre la partie adaptée à votre environnement.

{{< details "Configurer le SSH sur Windows" >}}

* Ouvrez l'application "Git Bash" pour avoir accès au terminal de commandes.
* Générez une clé SSH en entrant la commande suivante :

```bash {title="MINGW64:/c/Users/Mowibox"}
Mowibox@CHROMA MINGW64 ~
$ ssh-keygen -t ed25519 -C "votre_email@exemple.com"
```

Vous pouvez appuyer trois trois sur "Entrée" pour accepter l'emplacement par défaut du fichier et ne pas définir de mot de passe (optionnel).

* Activez l'agent SSH et ajoutez la clé SSH avec cette commande :

```bash {title="MINGW64:/c/Users/Mowibox"}
Mowibox@CHROMA MINGW64 ~
$ eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

La prochaine étape consiste à ajouter la clé que vous venez de générer sur GitHub. Pour ce faire, exécutez la commande ci-dessous :

```bash {title="MINGW64:/c/Users/Mowibox"}
Mowibox@CHROMA MINGW64 ~
$ cat ~/.ssh/id_ed25519.pub
```

Vous obtiendrez un résultat dans votre terminal qui correspond à votre clé (commence par ssh- et finit par votre adresse mail). Copiez ce résultat en entier.

* Sur GitHub, cliquez sur votre icône dans le coin supérieur droit, et accèdez aux paramètres SSH en cliquant sur "Settings" puis "SSH and GPG keys".

* Cliquez ensuite sur "New SSH Key". Donnez un titre à votre clé, mettez le type de clé sur "Authentication Key", puis copiez le résultat précédent dans l'espace dédié et ajoutez la clé à votre GitHub.

Et voilà ! Vous pouvez également vérifier que la connexion SSH est bien établie avec GitHub via la commande :

```bash {title="MINGW64:/c/Users/Mowibox"}
Mowibox@CHROMA MINGW64 ~
$ ssh -T git@github.com
```

Vous tomberez alors sur un message de confirmation de connexion. Entrez "yes", et si tout s'est bien passé, vous devriez obtenir l'affichage suivant :

```bash {title="MINGW64:/c/Users/Mowibox"}
Hi Mowibox! You've successfully authenticated, but GitHub does not provide shell access.

Mowibox@CHROMA MINGW64 ~
$
```

{{< /details >}}

{{< details "Configurer le SSH sur Linux" >}}

* Ouvrez un terminal avec le raccourci "CTRL + Alt + T".
* Générez une clé SSH en entrant la commande suivante :

```bash {title="mowibox@chroma: ~"}
mowibox@chroma:~$ ssh-keygen -t ed25519 -C "votre_email@exemple.com"
```

Vous pouvez appuyer trois fois sur "Entrée" pour accepter l'emplacement par défaut du fichier et ne pas définir de mot de passe (optionnel).

* Activez l'agent SSH et ajoutez la clé SSH avec cette commande :

```bash {title="mowibox@chroma: ~"}
mowibox@chroma:~$ eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

La prochaine étape consiste à ajouter la clé que vous venez de générer sur GitHub. Pour ce faire, exécutez la commande ci-dessous :

```bash {title="mowibox@chroma: ~"}
mowibox@chroma:~$ cat ~/.ssh/id_ed25519.pub
```

Vous obtiendrez un résultat dans votre terminal qui correspond à votre clé (commence par ssh- et finit par votre adresse mail). Copiez ce résultat en entier.

* Sur GitHub, cliquez sur votre icône dans le coin supérieur droit, et accèdez aux paramètres SSH en cliquant sur "Settings" puis "SSH and GPG keys".

* Cliquez ensuite sur "New SSH Key". Donnez un titre à votre clé, mettez le type de clé sur "Authentication Key", puis copiez le résultat précédent dans l'espace dédié puis ajoutez la clé à votre GitHub.

Et voilà ! Vous pouvez également vérifier que la connexion SSH est bien établie avec GitHub via la commande :

```bash {title="mowibox@chroma: ~"}
Mowibox@CHROMA MINGW64 ~
$ ssh -T git@github.com
```

Vous tomberez alors sur un message de confirmation de connexion. Entrez "yes", et si tout s'est bien passé, vous devriez obtenir l'affichage suivant :

```bash {title="MINGW64:/c/Users/Mowibox"}
Hi Mowibox! You've successfully authenticated, but GitHub does not provide shell access.

Mowibox@CHROMA MINGW64 ~
$
```

{{< /details >}}

{{< details "Configurer le SSH sur Mac" >}}

* Ouvrez un terminal avec le raccourci "Cmd + Alt + T".
* Générez une clé SSH en entrant la commande suivante :

```bash {title="mowibox – -zsh – 81x21"}
mowibox@chroma:~$ ssh-keygen -t ed25519 -C "votre_email@exemple.com"
```

Vous pouvez appuyer trois fois sur "Entrée" pour accepter l'emplacement par défaut du fichier et ne pas définir de mot de passe (optionnel).

* Activez l'agent SSH et ajoutez la clé SSH avec cette commande :

```bash {title="mowibox – -zsh – 81x21"}
mowibox@chroma:~$ eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

La prochaine étape consiste à ajouter la clé que vous venez de générer sur GitHub. Pour ce faire, exécutez la commande ci-dessous :

```bash {title="mowibox – -zsh – 81x21"}
mowibox@chroma:~$ cat ~/.ssh/id_ed25519.pub
```

Vous obtiendrez un résultat dans votre terminal qui correspond à votre clé (commence par ssh- et finit par votre adresse mail). Copiez ce résultat en entier.

* Sur GitHub, cliquez sur votre icône dans le coin supérieur droit, et accédez aux paramètres SSH en cliquant sur "Settings" puis "SSH and GPG keys".

* Cliquez ensuite sur "New SSH Key". Donnez un titre à votre clé, mettez le type de clé sur "Authentication Key", puis copiez le résultat précédent dans l'espace dédié puis ajoutez la clé à votre GitHub.

Et voilà ! Vous pouvez également vérifier que la connexion SSH est bien établie avec GitHub via la commande :

```bash {title="mowibox – -zsh – 81x21"}
Mowibox@CHROMA MINGW64 ~
$ ssh -T git@github.com
```

Vous tomberez alors sur un message de confirmation de connexion. Entrez "yes", et si tout s'est bien passé, vous devriez obtenir l'affichage suivant :

```bash {title="mowibox – -zsh – 81x21"}
Hi Mowibox! You've successfully authenticated, but GitHub does not provide shell access.

Mowibox@CHROMA MINGW64 ~
$
```

{{< /details >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Configurez l'authentification GitHub avec le SSH.
{{< /callout >}}

## Clonage du repository en local sur votre machine

<p align="center">
    <img src="/chroma/images/gitgithub3.jpg" alt="Local copy" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Le chariot est l'équivalent de la copie locale du repository.</em>
</p>

Maintenant que tout est configuré, revenez au repository. Pour le moment, votre repository n'est accessible que sur GitHub. Il sera plus pratique d'avoir une copie locale sur votre ordinateur pour y ajouter vos fichiers, modifications, etc. C'est l'objectif principal de cette section.

Quel que soit votre système d'exploitation, vous pouvez copier le lien GitHub associé à votre repository en cliquant sur le bouton vert "<> Code" puis sur l'icône "copier". Vérifiez que le lien copié est bien le lien "SSH".

<p align="center">
    <img src="/chroma/images/gitgithub21.png" alt="Copy to clipboard" class="w-full h-auto" />
</p>

Comme dans la section précédente, la suite de cette introduction est séparée en plusieurs parties où je vous montre comment et cloner `repository-mine` en local en fonction du système d’exploitation utilisé. Vous pouvez ainsi suivre la séquence d'étapes liée à votre OS.

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

_Remarque : Il est aussi possible d'ouvrir directement Git Bash sans passer par l'explorateur, et ensuite se rendre manuellement dans l'emplacement de votre choix via la commande [`cd`.]({{< relref "tutorials/computer_science/using_terminal/#cd">}})._

* La console Git étant lancée, je n'ai plus qu'à exécuter la commande `git clone` suivie de l'adresse SSH copiée précédemment. Dans mon cas, cela donnerait :

```bash {title="MINGW64:/c/Users/Mowibox/Documents"}
Mowibox@CHROMA MINGW64 ~/Documents
$ git clone git@github.com:Mowibox/repository-mine.git
```

* Il ne me reste plus qu'à exécuter la commande pour voir apparaître le dossier dans mon explorateur de fichiers.

<p align="center">
    <img src="/chroma/images/gitgithub23.png" alt="Your repository (Windows)" class="w-full h-auto" />
</p>

{{< /details >}}

{{< details "Cloner un repository sur Linux/Mac" >}}

* Sur mon ordinateur, je choisis un emplacement dédié dans l'explorateur de fichiers, par exemple dans mon dossier "Documents". Avec un clic droit dans l'explorateur, je sélectionne l'option "Open in terminal" ce qui me permet d'avoir un terminal ouvert directement dans l'emplacement "Documents" :

<p align="center">
    <img src="/chroma/images/gitgithub24.png" alt="Open in terminal" class="w-full h-auto" />
</p>

```bash {title="mowibox@chroma:~/Documents"}
mowibox@chroma:~/Documents$
```

_Remarque : Il est aussi possible d'ouvrir directement un terminal sans passer par l'explorateur avec le raccourci "Ctrl + Alt + T" (ou "Cmd + Alt + T"), et ensuite se rendre manuellement dans l'emplacement de votre choix via la commande [`cd`.]({{< relref "tutorials/computer_science/using_terminal/#cd">}})._

* Le terminal ouvert, je n'ai plus qu'à exécuter la commande `git clone` suivie de l'adresse SSH copiée précédemment. Dans mon cas, cela donnerait :

```bash {title="mowibox@chroma:~/Documents"}
mowibox@chroma:~/Documents$ git clone git@github.com:Mowibox/repository-mine.git
```

* Il ne me reste plus qu'à exécuter la commande pour voir apparaître le dossier dans mon explorateur de fichiers.

<p align="center">
    <img src="/chroma/images/gitgithub25.png" alt="Your repository (Linux/Mac)" class="w-full h-auto" />
</p>

{{< /details >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Clonez votre repository fraîchement créé en local sur votre machine.
{{< /callout >}}

## Apport de modifications au projet

<p align="center">
    <img src="/chroma/images/gitgithub4.jpg" alt="Creating file A" class="w-full h-auto" />
</p>

En entrant dans le dossier, vous devriez y apercevoir le fichier "README.md". C'est à l'intérieur qu'il est possible de créer tous les dossiers ou fichiers dont vous aurez besoin pour votre projet. Dans le mien, je vais créer un simple fichier texte nommé `Fichier_A.txt`, dans lequel j'écris le texte suivant :

``` txt {title="Fichier_A.txt"}
Hello, World!
```

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Créez un ou plusieurs fichiers au sein du repository. Faites vous plaisir sur le contenu !
{{< /callout >}}

Maintenant que mon fichier est en place, constatez que sur GitHub... le fichier n'apparaît pas. En effet, il faut exécuter une série de commandes pour l'ajouter au repository distant (sur GitHub).

Pour ce faire j'ouvre un terminal au sein du repository de la même manière qu'expliqué précédemment. Puis, j'exécute ensuite les commandes suivantes :

* ```bash {frame="none"}
  git add .
  ```

  La commande `git add .` permet d'ajouter tous les fichiers créés ou modifiés à la zone de préparation (qu'on appelle staging area). Le `.` indique à Git d’inclure toutes les modifications présentes dans le dossier courant et ses sous-dossiers.

  <p align="center">
    <img src="/chroma/images/gitgithub5.jpg" alt="Adding file A" class="w-full h-auto" />
  </p>

* ```bash {frame="none"}
  git commit -m "Message"
  ```

  La commande `git commit -m "Message"` permet d'enregistrer et valider les modifications ajoutées avec `git add`. De manière générale, on ajoute toujours un message descriptif de la modification grâce au flag `-m "Message explicatif"`. Par exemple :

  ```bash {frame="none"}
  git commit -m "Ajout du fichier A"
  ```

  <p align="center">
    <img src="/chroma/images/gitgithub6.jpg" alt="Writing file A commit" class="w-full h-auto" />
  </p>

* ```bash {frame="none"}
  git push
  ```

  La commande `git push` permet d'envoyer les commits sur le repository distant, c'est-à-dire GitHub.

  <p align="center">
    <img src="/chroma/images/gitgithub8.jpg" alt="Push file A" class="w-full h-auto" />
  </p>

Au bout des différentes étapes illustrées ci-dessus, je peux finalement voir mon fichier `Fichier_A.txt`, le message de commit et son contenu sur GitHub :

<p align="center">
    <img src="/chroma/images/gitgithub26_fr.png" alt="Repository after pushing" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/gitgithub27_fr.png" alt="File A" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Utilisez les commandes `add`, `commit` et `push` pour ajouter vos modifications sur le repository distant.
N'oubliez pas de spécifier un message avec `-m "Message"` lors du commit !
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Si quelqu’un possède une copie locale de votre repository sur son ordinateur, il pourra récupérer les dernières modifications en utilisant la commande `git pull`.
Lorsque vous ouvrez un repository, lancez toujours cette commande en premier pour être sûr d’avoir la version la plus à jour.

<p align="center">
    <img src="/chroma/images/gitgithub10.jpg" alt="Pull" class="w-full h-auto" />
    </br>
</p>
{{< /callout >}}

## Suppression de fichiers du projet

Sachez que comme pour l'ajout de fichiers, il est possible de supprimer des fichiers. La commande :

```bash {frame="none"}
git rm nom_du_fichier
```

vous permet de supprimer un fichier du projet dont vous aurez spécifié le nom. Comme pour `git add`, il faut faire suivre la commande par `git commit`, puis `git push`.

Voilà un exemple où j'ai supprimé le "Fichier_A.txt" en appliquant les différentes commandes :

<p align="center">
    <img src="/chroma/images/gitgithub28_fr.png" alt="Repository after deleting" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
Utilisez les commandes `rm`, `commit` et `push` pour supprimer un de vos fichiers du projet. N'oubliez pas le message de commit !
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Une autre méthode de suppression consiste à supprimer le fichier manuellement, puis d'utiliser la commande `git add .` : cela revient à ajouter une modification au projet, qui est la suppression du fichier.
{{< /callout >}}

## Tableau récapitulatif des commandes

Ce tableau récapitule l'ensemble des fonctions vues au cours de ce tutoriel ainsi que leur utilité. N'hésitez pas à le garder sous la main au début pour vous familiariser avec les commandes !

| Commande | Description |
| --------------------------- | ------------- |
| [`git pull`](https://git-scm.com/docs/git-pull) | Récupère les dernières modifications depuis le repository distant et met à jour votre copie locale. |
| [`git add`](https://git-scm.com/docs/git-add) | Ajoute des fichiers créés ou modifiés à la staging area. |
| [`git rm`](https://git-scm.com/docs/git-rm) | Supprime un fichier du projet et informe Git de cette suppression. |
| [`git commit`](https://git-scm.com/docs/git-commit) | Enregistre les modifications ajoutées avec un message (`-m "Message"`) décrivant l’action effectuée. |
| [`git push`](https://git-scm.com/docs/git-push) | Envoie vos commits vers le repository distant. |

Dans la prochaine partie de cette introduction, nous allons explorer plus en profondeur les fonctionnalités offertes par Git et GitHub en nous attaquant à un concept plus complexe mais très pratique lorsque vous travaillez à plusieurs sur un même projet : les issues, les branches & les pull requests.

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Janvier 2026
* **Relecteur :**
