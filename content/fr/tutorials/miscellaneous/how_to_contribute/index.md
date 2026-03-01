---
title: "Comment contribuer à Chroma ?"
description: "Tout ce qu’il faut savoir pour contribuer à Chroma et partager vos tutoriels"
summary: "Ce guide explique comment contribuer à Chroma : proposer des idées, signaler des bugs, rédiger des tutoriels et participer au développement du site via GitHub et Discord."
date: 2026-03-01
lastmod: 2026-03-01
draft: false
weight: 4001
toc: true
icon: "heart-handshake"

seo:
   title: "Contribuer à Chroma – Guide du contributeur"
   description: "Découvrez comment contribuer à Chroma : retours, rédaction de tutoriels, installation de l’environnement de développement et soumission de pull requests."
   canonical: "https://mowibox.github.io/chroma/fr/tutorials/miscellaneous/how_to_contribute/"
   noindex: false
   robots: "index, follow"

---

<p align="center">
    <img src="/chroma/images/contribute1.jpg" alt="Contributing to Chroma" class="w-full h-auto" />
</p>

Ce guide a pour vocation de vous accompagner pas à pas dans le processus de contribution à Chroma. Que ce soit en proposant des idées, en identifiant des problèmes ou en rédigeant vos propres pages, il y a toujours un moyen de donner un coup de main !

## Donner un retour : questions, suggestions

La première manière de contribuer à l'amélioration du site est de partager vos retours et vos propositions d'améliorations. Pour ce faire, deux voies s'offrent à vous :

* **Sur Discord :** Le canal [🔍 Review and Feedback](https://discord.com/channels/1383790297594728518/1386648737366937701) vous permet de poser vos questions, discuter avec les autres collaborateurs et proposer vos idées pour améliorer le site.
* **Sur GitHub :** Si vous constatez un bug, n'hésitez pas à créer une [issue sur le repository de Chroma.](https://github.com/Mowibox/chroma/issues/new/choose)

## Contribuer au développement de Chroma

Si votre objectif de contribution est de rédiger un nouveau tutoriel, réécrire une partie d'un tutoriel déjà existant, ou encore plonger dans le code source du site pour aider à son amélioration, il est possible de configurer un environnement de développement sur son ordinateur en local.

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

Si tout s'est bien passé, cela va afficher un message dans votre terminal avec le lien cliquable vers votre site local (à une adresse localhost) :

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

```text {title="Structure de Chroma"}
.
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

* `assets/` regroupe les ressources sources (SCSS, JavaScript, style, etc.) utilisées pour le site.
* `config/` regroupe les fichiers de configuration et paramètres généraux du site.
* `content/` contient l’ensemble des pages du site, organisées par langue (`fr/` et `en/`).
* `i18n/` contient les fichiers de traduction.
* `static/` contient les fichiers statiques du site (images, gifs, icônes, etc.).

De manière générale, c'est le dossier `tutorials/` qui vous intéressera, lui-même contenant quatre dossiers en fonction du thème du tutoriel : Informatique (`computer_science/`), Électronique (`electronics/`), Conception & développement 3D (`design_3d_development/`), et Autres (`miscellaneous/`). Mais il n'est pas exclu que votre contribution puisse concerner d'autres parties du site, par exemple s'il y a des [issues connues.](https://github.com/Mowibox/chroma/issues)

### Écrire un tutoriel

La section suivante détaille les différentes étapes pour créer et mettre en forme un nouveau tutoriel :

| Étape | Description |
| ------ | ------------ |
| [Extensions VSCode](#extensions-visual-studio-code-utiles-pour-le-développement-du-site) | Installer les extensions utiles pour le développement du site |
| [Ajout du tutoriel](#ajout-du-tutoriel-dans-les-dossiers) | Créer le dossier et le fichier `index.md` de votre tutoriel |
| [Avant-propos](#avant-propos) | Renseigner le _front-matter_ (title, description, date, weight, etc.) |
| [Convention des poids](#convention-des-poids-de-page) | Définir la position du tutoriel dans la liste grâce au champ `weight` |
| [Mise en forme du contenu](#mise-en-forme-du-contenu) | Rédiger le tutoriel en Markdown avec la structure recommandée |
| [Ajout d’images](#ajout-dimages) | Ajouter les images dans les dossiers appropriés et les référencer correctement |
| [Crédits de fin de page](#crédits-de-fin-de-page) | Ajouter une section de crédits en bas du tutoriel |

#### Extensions Visual Studio Code utiles pour le développement du site

Si vous utilisez VSCode, voici une liste non-exhaustive d'extensions qui peuvent vous aider à bien mettre en forme vos fichiers :

* [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)
* [Hugo Language and Syntax Support](https://marketplace.visualstudio.com/items?itemName=budparr.language-hugo-vscode)
* [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
* [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

#### Ajout du tutoriel dans les dossiers

Pour créer un tutoriel, vous devez créer un dossier contenant un fichier `index.md`. Identifiez d'abord le thème de votre tutoriel afin de le mettre dans le bon dossier (Informatique, Électronique, etc.). Le lien internet qui pointera vers votre page aura le nom de votre dossier. Pour faciliter la visibilité et la structure du site, deux points sont à respecter lors du nommage :

* Le nom du dossier doit être en **anglais**. Cela facilite la gestion de l'internationalisation fr/en.
* Le nom du dossier ne doit pas être trop long.

La commande `hugo new content content/<chemin_du_dossier>/index.md` vous permet de créer directement la page en spécifiant son chemin d'accès.

**Exemple :** Le tutoriel "Initiation à la programmation embarquée" est un tutoriel en français d'électronique. Le dossier `introduction_to_embedded_prog/` et son fichier `index.md` ont été créés dans le dossier `content/fr/tutorials/electronics/` avec la commande :

```bash {frame="none"}
hugo new content content/fr/tutorials/electronics/introduction_to_embedded_prog/index.md
```

Le lien internet sera alors de la forme suivante : `https://mowibox.github.io/chroma/fr/tutorials/electronics/introduction_to_embedded_prog/`

```text {title="Arborescence du tutoriel"}
.
└── fr/
    ├── blog/
    ├── computer_vision/
    └── tutorials/
        ├── computer_science/
        ├── design_3d_development/
        └── electronics/
            └── introduction_to_embedded_prog/
                └── index.md
```

#### Avant-propos

Chaque page de tutoriel commence par un avant-propos (aussi appelé _front-matter_), encadré par des tirets `---`. Les différents champs sont détaillés ci-dessous :

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
   noindex: false
   robots: "index, follow"

---
```

* `title` : C'est le titre de votre tutoriel. Je pense que c'est assez explicite, non ?
* `description` : Décrit votre contenu en **une courte phrase.** Utilisée notamment pour l'aperçu dans la liste des tutoriels.
* `summary` : Décrit votre tutoriel avec un peu plus de détail, en 2-3 phrases.
* `date` : La date à laquelle vous avez commencé à écrire votre tutoriel, **au format YYYY-MM-JJ.**
* `lastmod` : La date de dernière modification du tutoriel, **au format YYYY-MM-JJ.**
* `draft` : Rend le tutoriel visible ou non lors de la prévisualisation. Par défaut, il est visible (`false`).
* `weight` : Définit l'ordre d'affichage de votre contenu dans la liste des tutoriels. La manière de le remplir est détaillée dans la [section suivante.](#convention-des-poids-de-page)
* `toc` : Affiche la table des matières de la page. Par défaut, elle est affichée (`true`).
* `icon` : Vous pouvez rajouter une nouvelle icône en allant dans [Tabler Icons](https://tabler.io/icons). Il s'agira de l'icône qui illustrera votre page dans la liste des tutoriels {{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Attention, il faut que la couleur de l'icône soit **#a514e9** et doit être ajoutée dans le dossier `static/icons`.
{{< /callout >}}

* `seo.title` : Titre optimisé pour les moteurs de recherche. Il peut être différent de `title`.
* `seo.description` : Description affichée dans les résultats de moteur de recherche.
* `seo.canonical` : URL canonique de la page
* `seo.noindex` : Gère l’indexation de la page par les moteurs de recherche. Activé par défaut (`false`).
* `seo.robots` : Indique aux moteurs de recherche comment indexer la page.

<p align="center">
    <img src="/chroma/images/contribute2_fr.png" alt="Tutorial cardlist example" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Exemple d'aperçu de tutoriel dans la liste. Les champs title, description et icon, sont sollicités</em>
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
N'hésitez pas à regarder les avant-propos des tutoriels déjà existants afin de vous faire une idée sur comment les remplir !
{{< /callout >}}

#### Convention des poids de page

L'ordre des tutoriels est défini dans l'avant-propos grâce au champ `weight`. Pour le moment, cette valeur est gérée manuellement (par moi-même). Vous pouvez soit laisser le champ vide, soit lancer le site en local, repérer les tutoriels situés à l’endroit où vous souhaitez ajouter le vôtre, puis adapter les poids des pages environnantes.

#### Mise en forme du contenu

La rédaction de contenu se fait principalement avec le langage [Markdown,](https://fr.wikipedia.org/wiki/Markdown) qui a l'avantage d'être assez facile à prendre en main, c'est d'ailleurs le langage utilisé pour les [fichiers README](https://github.com/Mowibox/chroma/blob/main/README.md) sur GitHub.

Pour aller plus loin et exploiter toutes les fonctionnalités du site, la documentation de Doks (en anglais) propose des guides détaillés sur la création de contenu :

* La section [Authoring content](https://getdoks.org/docs/basics/authoring-content/) vous permet d'apprendre les bases : structurer votre texte, gérer les titres, paragraphes, listes etc.
* Pour insérer du contenu dynamique comme des notes, astuces, boutons ou autres spécificités, utilisez les [shortcodes.](https://getdoks.org/docs/basics/shortcodes/)
* Pour écrire du code, vous pouvez vous référer à la section [Code blocks.](https://getdoks.org/docs/built-ins/code-blocks/)
* Si votre tutoriel a besoin de rédaction mathématique, un support LaTeX est disponible dans la section [Math.](https://getdoks.org/docs/built-ins/math/)
* Vous pouvez créer des diagrammes et des schémas avec la section [Diagrams.](https://getdoks.org/docs/built-ins/diagrams/)

N’hésitez pas à combiner les fonctionnalités de Markdown et des shortcodes Doks pour créer un tutoriel à votre image. Et en parlant d'image, voilà la section qui en parle !

#### Ajout d'images

L'ensemble des images du site dédiées aux pages sont stockées dans le dossier [`static/images/`.](https://github.com/Mowibox/chroma/tree/main/static/images) Pour intégrer une image du dossier dans votre page, adaptez le bloc HTML suivant à votre besoin :

```html {title="Ajout d'images"}
<p align="center">
    <img src="/chroma/images/image1.jpg" alt="Image 1 short description" class="w-full h-auto" />
</p>
```

Où `image1.jpg` est le nom de l'image. Si vous voulez rajouter une nouvelle image, il suffit donc de rajouter l'image en question dans le dossier `static/images` pour qu'elle soit utilisable. Comme pour le reste du site, certains points sont à respecter lors de l'ajout d'images :

* L’image ne doit **pas dépasser 2 MB.**
* L’image utilisée doit être **libre de droit.**
* Il est préférable de **nommer l’image en lien avec le tutoriel que vous écrivez.** Par exemple, les images de ce tutoriel sont nommées `contribute1.jpg`, `contribute2.png`, etc. Cela permet de retrouver plus facilement dans quel tutoriel l’image est utilisée.
* Si certaines images peuvent être utilisées dans plusieurs tutoriels, vous pouvez leur donner un nom plus générique, tout en ajoutant un tiret du bas (`_`) au début pour les distinguer (ex : `_buzzer.jpg`).
* Le champ `alt` doit contenir une **très courte description du contenu de l’image en anglais.**

Il est aussi possible d'ajouter une légende à votre image en utilisant le bloc HTML ci-dessous :

```html {title="Ajout d'images avec légende"}
<p align="center">
    <img src="/chroma/images/image2.jpg" alt="Image with caption" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Une image avec une légende.</em>
</p>
```

<p align="center">
    <img src="/chroma/images/contribute3.jpg" alt="Image caption example" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Une image avec une légende.</em>
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Les gifs et les icônes suivent le même principe et ont leur dossier dédié (`static/icons`, `static/gifs`).
{{< /callout >}}

#### Crédits de fin de page

À la fin de chaque page du site (comme celle-ci), il faut ajouter une section consacrée aux crédits de la page, en voici le format :

```md {title="Format des crédits"}
---

## Crédits

* **Rédacteur :**
* **Relecteur :**
```

Tout d’abord, remarquez qu’il y a une ligne séparatrice (`---`) permettant de scinder le tutoriel et les crédits. Il y a ensuite les différents champs qui sont à compléter :

* **Rédacteur :** C'est vous ! Il peut il y avoir plusieurs auteurs, séparés par des virgules.
* **Relecteur :** Ce sont les personnes qui ont relu votre tutoriel et vous ont proposé des suggestions. Inutile de vous indiquer comme tel si vous êtes rédacteur. Si vous n'avez pas de relecteurs, le champ peut être laissé vide, mais il doit être présent dans tous les cas.

## Demande de relecture des changements

Satisfait de votre tutoriel ? Il ne vous reste plus qu'à réaliser une pull request afin qu'un collaborateur puisse vérifier le tutoriel ! Le titre de la pull request doit être explicite, par exemple :

* "Ajout du tutoriel "Initiation à Python" - FR"
* "Suggestion de correction dans le tutoriel "Using the terminal" - EN"
* "Amélioration de l'interface de visualisation des tutoriels"
* etc.

La description de la pull request doit expliquer brièvement les modifications apportées ou les ajouts par cette dernière. Une fois la pull request envoyée, un contributeur viendra vérifier que tous les points expliqués dans cette page sont vérifiés. Dans le cas contraire, vous recevrez un message vous expliquant ce qu'il faut modifier pour que votre pull request soit acceptée. Si tout est correct, les modifications seront directement intégrées au site principal.

**Bravo et merci !**

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Relecteur :**
