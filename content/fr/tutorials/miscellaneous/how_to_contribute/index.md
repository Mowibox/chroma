---
title: "Comment contribuer à Chroma ?"
description:
summary: Tout ce qu’il faut savoir pour contribuer à Chroma et partager vos tutoriels
date: 
lastmod:
draft: false
weight: 4001
toc: true
icon: "heart-handshake"

seo:
   title: ""
   description: ""
   canonical: ""
   robots: "index, follow"

---

<p align="center">
    <img src="/chroma/images/contribute1.png" alt="Contribuing to Chroma" class="w-full h-auto" />
</p>



## Poser une question, Proposer des suggestions

La première manière de contribuer

[🔍 Review and Feedback](https://discord.com/channels/1383790297594728518/1386648737366937701)

## Contribuer

Si votre objectif de contribution est de rédiger un nouveau tutoriel, réecrire une partie d'un tutoriel déjà existant, ou encore plonger dans le code source du site pour aider à son amélioration, il est possible de configurer un environement de développement sur son ordinateur en local.

### Prérequis

* Node.js — [version 20.11 ou supérieure (LTS).](https://nodejs.org/en/download)
* Hugo — [version 0.143.1.](https://github.com/gohugoio/hugo/releases/tag/v0.143.1)
* Hugo extended — [version 0.143.1.](https://github.com/gohugoio/hugo/releases/tag/v0.143.1)
* Un IDE comme [Visual Studio Code.](https://code.visualstudio.com/)
* Savoir utiliser GitHub (forks, issues, pull requests) — un [tutoriel]({{< relref "tutorials/computer_science/introduction_to_github_part1">}}) est disponible sur le site.

### Mise en place de l'environnement de développement

Tout d'abord, créez une fork du [repository de Chroma](https://github.com/Mowibox/chroma). Clonez ensuite votre fork sur votre machine avec `git clone`. Dans un terminal au sein du répertoire du projet, exécutez la commande suivante pour installer les dépendances nécessaires :

```bash {frame="none"}
npm install
```

Vous aurez ainsi accès à un serveur de développement qui vous permettra de prévisualiser le site.
Toujours au sein du répertoire du projet, exécutez la commande ci-dessous pour démarrer le serveur de développement en local :

```bash {frame="none"}
npm run dev
```

Si tout c'est bien passé, cela va afficher un message dans votre terminal avec le lien cliquable vers votre site local (à une adresse de type localhost) :

```bash {title="Terminal"}
Watching for changes in /.../chroma/{assets,content,i18n,layouts,node_modules,package.json,static}
Watching for config changes in /.../chroma/config/_default, /home/mowibox/Documents/WorkspaceU/Git_folders/chroma/config/_default/menus
Start building sites … 
hugo v0.143.1-0270364a347b2ece97e0321782b21904db515ecc+extended linux/amd64 BuildDate=2025-02-04T08:57:38Z VendorInfo=gohugoio


                   | EN  | FR
-------------------+-----+------
  Pages            |  69 |  68
  Paginator pages  |   0 |   0
  Non-page files   |   2 |   2
  Static files     | 253 | 253
  Processed images |   4 |   0
  Aliases          |  13 |  12
  Cleaned          |   0 |   0

Built in 1638 ms
Environment: "development"
Serving pages from disk
Web Server is available at http://localhost:1313/chroma/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

Cliquez sur ce lien pour parcourir le site sur votre navigateur. Tant que le serveur sera actif, chaque modification sauvegardée sera mise à jour automatiquement sur la prévisualisation du site.

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
En cas de problème de build ou d'affichage, cette commande permet de nettoyer les fichiers générés précédemment par Hugo (public, resources, etc.) afin d'avoir un environnement propre avant de relancer `npm run dev` :

```bash {frame="none"}
npx shx rm -rf public resources hugo_stats.json .hugo_build.lock
```

{{< /callout >}}

### Structure du site

Les différents dossiers et fichiers de Chroma sont organisés de la manière suivante :

```text
├── assets/
├── config/
│   └──_default/
│      ├── hugo.toml
│      ├── menus.toml
│      ├── module.toml
│      └── params.toml
├── content/
│   ├── en/
│   └── fr/
|       ├── blog/
|       ├── computer_vision/
|       └── tutorials/
├── i18n/
├── layouts/
└── static/
    ├── gifs/
    ├── icons/
    └── images/
```

### Écrire un tutoriel

#### Extensions Visual Studio Code utiles pour le développement du site

* [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)
* [Hugo Language and Syntax Support](https://marketplace.visualstudio.com/items?itemName=budparr.language-hugo-vscode)
* [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
* [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

#### Ajout du tutoriel dans les dossiers

Créer un dossier, le lien Google aura le nom du dossier

#### Avant-propos

```md
---
title: ""
description: ""
summary: ""
date:
lastmod:
draft: false
weight:
toc: true
icon: ""

seo:
   title: ""
   description: ""
   canonical: ""
   robots: "index, follow"

---
```

* `title` :
* `description` :
* `summary` :
* `date` : Au format YYYY-MM-JJ
* `lastmod` :
* `draft` :
* `weight` :
* `toc` :
* `icon` : Vous pouvez rajouter une nouvelle icône en allant dans [Tabler Icons](https://tabler.io/icons). {{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Attention, il faut que la couleur de l'icône soit **#a514e9** et doit être ajoutée dans le dossier static/icons.
{{< /callout >}}

* `seo.title` :
* `seo.decription` :
* `seo.canonical` :
* `seo.robots` :

N'hésitez pas à regarder les avant-propos des tutoriels déjà existants afin de vous faire une idée.

#### Convention des poids de page

Pour le moment je gère ça, vous pouvez laisser vide ou regarder sur le preview local la page la plus basse de là ou vous voulez ajouter un tuto, regarder son poids sur le fichier correspondant, puis faire +1

#### Ajout d'images

```html {title="Ajout d'images"}
<p align="center">
    <img src="/chroma/images/image1.jpg" alt="Image 1 short description" class="w-full h-auto" />
</p>
```

```html {title="Ajout d'images avec légende"}
<p align="center">
    <img src="/chroma/images/image2.jpg" alt="Image with caption" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Une image avec une légende.</em>
</p>
```

Pas trop lourdes libres de droits
courte description dans le alt en anglais

#### Crédits de fin de page

À la fin de chaque page du site (comme celle-ci), il faut ajouter une section dédiée aux crédits de la page, en voici le format :

```md {title="Format des crédits"}
---

## Crédits


* **Rédacteur :**
* **Relecteur :**
```

Tout d'abord, remarquez qu'il y a une ligne séparatrice (`---`) permettant de scinder le tutoriel et les crédits. Il y a ensuite les différents champs qui sont à compléter :

* Rédacteur : C'est vous ! Il peut il y avoir plusieurs auteurs, séparés par des virgules.
* Relecteur : Ce sont les personnes qui ont relu votre tutoriel et vous ont proposé des suggestions. Inutile de vous indiquer comme tel si vous êtes rédacteur. Si vous n'avez pas de relecteurs, le champ peut être laissé vide, mais il doit être présent dans tous les cas.

## Demande de relecture des changements

Satisfait de votre tutoriel ? Il ne vous reste plus qu'à réaliser une pull request afin qu'un collaborateur puisse vérifier le tutoriel ! Le titre de la pull request doit être explicite, par exemple :

* "Ajout du tutoriel "Initiation à Python" - FR"
* "Suggestion de correction dans le tutoriel "Utilisation du terminal" - EN"
* "Amélioration de l'interface de visualisation des tutoriels"
* etc.

La description de la pull request doit expliquer brièvement les modifications apportés ou les ajouts par cette denrière. Une fois la pull request envoyée, un contributeur viendra vérifier que tous points expliqués dans cette page sont vérifiés. Dans le cas contraire, vous recevrez un message vous expliquant ce qu'il faut modifier pour que votre pull request soit acceptée. Si tout est correct, les modifications seront directement intégrées au site principal. Bravo et merci !

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Relecteur :**
