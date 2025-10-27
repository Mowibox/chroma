---
title: "Utilisation du Terminal"
summary: Les commandes pratiques
weight: 1001
icon: "terminal"
---

<p align="center">
    <img src="/chroma/images/using_terminal.png" alt="Tchoo tchoo" class="w-full h-auto" />
</p>

Le terminal est un outil puissant pour interagir avec son système d'exploitation. Que vous soyez sur Linux, macOS, ou Windows, apprendre à utiliser les commandes de base vous permettra de mieux gérer votre environnement et de réaliser plus aisément certaines tâches.

Dans ce guide, je vous présente les commandes de terminal les plus utiles, accompagnées d'exemples. N'hésitez pas à suivre les mêmes étapes de votre côté, en adaptant les chemins et options selon votre système.

## Les commandes de terminal

Commençons par ouvrir un terminal (PowerShell sur Windows). Dans les distributions Linux (et macOS), il est souvent possible de l'ouvrir avec le raccourci clavier "Ctrl + Alt + T" (ou "Cmd + Alt + T").

### pwd

La commande `pwd` vous permet **d'afficher le répertoire courant par rapport à la racine.**

```bash {title="Terminal"}
mowibox@chroma:~$ pwd
/home/mowibox
```

Ici, on peut voir que je suis au niveau du dossier `/home/mowibox`. Cela peut s'avérer pratique lorsque vous avez besoin de copier-coller le chemin d'accès actuel quelque part.

### ls

La commande `ls` permet **d'afficher le contenu du répertoire courant.**

```bash {title="Terminal"}
mowibox@chroma:~$ ls
Desktop    Downloads  Pictures  Templates
Documents  Music      Public    Videos
```

Dans cet exemple, on peut voir la liste de plusieurs dossiers : `Desktop`, `Downloads`, etc.

**Sous Windows**, la mise en forme ressemblera plutôt à celle-ci dessous :

```bash {title="Invite de commandes"}
mowibox@chroma:~$ ls
PS C:\Users\Mowibox> ls


    Répertoire : C:\Users\Mowibox


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-r---        25/06/2025     15:57                Desktop
d-r---        14/03/2025     23:40                Documents
d-r---        27/06/2025     20:26                Downloads
d-r---        04/03/2025     21:21                Music
d-r---        27/06/2025     20:26                Pictures
d-r---        12/03/2025     15:53                Videos
```

Pour ce tutoriel, **on illustrera les commandes avec un terminal Linux,** donc si vous êtes sous Windows, ne soyez pas surpris par la mise en forme : Les commandes fonctionneront de la même manière.

On peut aussi ajouter le nom d'un répertoire à la suite de la commande pour aller regarder son contenu. Essayons avec le dossier `Documents` :

```bash {title="Terminal"}
mowibox@chroma:~$ ls Documents
Dossier_1  file.txt
```

On y retrouve le dossier `Dossier_1` ainsi que le fichier texte `file.txt`. Et ce genre d'ajout marche aussi pour d'autres commandes que nous verrons par la suite !

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}

**Prenez garde aux majuscules !** Si votre dossier s'appelle `Documents`, alors il sera différent de `documents` ou du `dOCumenTs`. On dit que le système est **sensible à la casse** (case sensitive en anglais) : les commandes ne fonctionneront que si le nom correspond exactement.

{{< /callout >}}

### cd

La commande `cd` permet de **changer de répertoire courant.** Essayons d'entrer dans le dossier `Documents` :

```bash {title="Terminal"}
mowibox@chroma:~$ cd Documents
mowibox@chroma:~/Documents$
```

À chaque nouvelle ligne de terminal, on voit que le chemin `~` est devenu `~/Documents`, ce qui nous assure d'être au bon endroit. On peut regarder comme précédemment le contenu du dossier avec `ls` :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
Dossier_1  file.txt
```

On retrouve bien le contenu que nous avions vu dans la section précédente.

Si vous voulez revenir en arrière, vous pouvez **remonter d'un répertoire** en ajoutant `..` à la suite de `cd` :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ cd ..
mowibox@chroma:~$
```

On retourne ainsi au répertoire au-dessus de `Documents`.

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Vous pouvez remonter de deux dossiers à la fois avec `cd ../..`, de trois dossiers avec `cd ../../..`, et ainsi de suite !
Quelque soit le répertoire actuel, vous pouvez également retourner au répertoire principal en tapant `cd` ou `cd ~`.
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}

* Pour gagner du temps, vous pouvez commencer à écrire le nom du dossier d’intérêt (par exemple `Doc` pour `Documents`), puis appuyer sur la touche de **tabulation** : le système complétera automatiquement le nom du dossier.
* Si vous n'avez encore rien écrit ou s’il y a plusieurs possibilités, appuyez **deux fois sur Tab** pour afficher les options disponibles.

{{< /callout >}}

### mkdir

La commande `mkdir Dossier` permet de **créer le dossier `Dossier` dans l'emplacement courant.**

Essayons de créer le dossier `Dossier_2` dans le répertoire `Documents` :

```bash {title="Terminal"}
mowibox@chroma:~$ cd Documents
mowibox@chroma:~/Documents$ mkdir Dossier_2
mowibox@chroma:~/Documents$ ls
Dossier_1  Dossier_2  file.txt
```

On peut aussi créer plusieurs dossiers à la fois. Par exemple, créons les dossiers `Dossier_3` et `Dossiers_4` :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ mkdir Dossier_3 Dossier_4
mowibox@chroma:~/Documents$ ls
Dossier_1  Dossier_2  Dossier_3  Dossier_4  file.txt
```

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Avec cette commande, on voit **l'importance de ne pas mettre d'espaces dans les noms de ses fichiers/dossiers.** Que se serait-il passé, si on avait voulu créer `Dossier 5` ? :
{{< /callout >}}

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ mkdir Dossier 5
mowibox@chroma:~/Documents$ ls
5  Dossier  Dossier_1  Dossier_2  Dossier_3  Dossier_4  file.txt
```

Ce sont finalement les dossiers `5` et `Dossier` qui ont été créés. C'est pour cela qu'en règle générale, on utilise des tirets simples ('-') ou des tirets-bas ('_') à la place des espaces.

### rmdir

Bon, on a montré que ce n'est pas bien de mettre des espaces, mais on se retrouve avec des dossiers dont on n'a pas besoin, si seulement on pouvait les supprimer... Oh mais en fait, on peut !

La commande `rmdir` permet de **supprimer un répertoire vide.** Avec ceci, supprimons les dossiers en trop :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
5  Dossier  Dossier_1  Dossier_2  Dossier_3  Dossier_4  file.txt
mowibox@chroma:~/Documents$ rmdir 5 Dossier Dossier_3
Dossier_1  Dossier_2  Dossier_4  file.txt
```

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Vous pouvez également supprimer un dossier qui n'est pas vide avec la commande `rm -r nom_du_dossier`, voire `rm -rf` pour forcer la suppression d'un dossier protégé. Et puisque l'on parle de `rm`, utilisons-le dans la section suivante !
{{< /callout >}}

### rm

La commande `rm fichier.extension` permet de **supprimer le fichier `fichier`.** Pour la tester, il nous faut des fichiers, alors nous allons en créer.

Sur Linux, on peut créer un fichier avec la commande `touch`. Nous détaillerons son utilisation dans une [section suivante](#touch). Pour le moment, nous allons simplement le créer à la main.

On crée le fichier texte `aurevoir.txt`, que l'on supprime méchamment juste après (_ce n'est qu'un au revoir_) :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
Dossier_1  Dossier_2  Dossier_4  file.txt  aurevoir.txt
mowibox@chroma:~/Documents$ rm aurevoir.txt
mowibox@chroma:~/Documents$ ls
Dossier_1  Dossier_2  Dossier_4  file.txt
```

### mv

La commande `mv` permet de **déplacer un dossier/fichier à un endroit différent ou de le renommer.** Regardons les différentes manières de l'utiliser :

* `mv Dossier_4/ Dossier_3` Renomme le dossier `Dossier_4` en `Dossier_3` (car `Dossier_3` n'existait pas au sein du répertoire courant).

  ```bash {title="Terminal"}
  mowibox@chroma:~/Documents$ ls
  Dossier_1  Dossier_2  Dossier_4  file.txt
  mowibox@chroma:~/Documents$ mv Dossier_4/ Dossier_3
  mowibox@chroma:~/Documents$ ls
  Dossier_1  Dossier_2  Dossier_3  file.txt
  ```

* `mv Dossier_3/ Dossier_1` déplace le `Dossier_3` dans le `Dossier_1` (car `Dossier_1` existe au sein du répertoire courant).

  ```bash {title="Terminal"}
  mowibox@chroma:~/Documents$ ls
  Dossier_1  Dossier_2  Dossier_3  file.txt
  mowibox@chroma:~/Documents$ mv Dossier_3/ Dossier_1
  mowibox@chroma:~/Documents$ ls
  Dossier_1  Dossier_2  file.txt
  mowibox@chroma:~/Documents$ ls Dossier_1
  Dossier_3
  ```

* `mv Dossier_2/ Dossier_1/Dossier_4` déplace le `Dossier_2` dans le `Dossier_1` et le renomme en `Dossier_4` (car `Dossier_4` n'existait pas au sein du `Dossier_1`).

  ```bash {title="Terminal"}
  mowibox@chroma:~/Documents$ ls
  Dossier_1  Dossier_2  file.txt
  mowibox@chroma:~/Documents$ mv Dossier_2/ Dossier_1/Dossier_4
  mowibox@chroma:~/Documents$ ls
  Dossier_1  file.txt
  mowibox@chroma:~/Documents$ ls Dossier_1
  Dossier_3  Dossier_4
  ```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Si le dossier `Dossier_4` existait déjà au sein du `Dossier_1`, le système vous aurait d'abord **demandé la confirmation pour effacer l'ancien dossier.**
{{< /callout >}}

### cp

La commande `cp` permet de **copier un fichier/dossier.** Comme avec `mv`, il y a plusieurs manières de s'en servir :

* `cp file.txt file_copy.txt` crée une copie du fichier `file.txt` nommée `file_copy.txt` dans le même répertoire.

* `cp file.txt Dossier_1/file_copy.txt` crée une copie de `file.txt` nommée `file_copy.txt` dans le dossier `Dossier_1`. Écrire `cp file.txt Dossier_1` permet de garder le nom d'origine pour la copie.

* `cp -r Dossier_1/ Dossier_copy` crée une copie du dossier `Dossier_1` nommée `Dossier_copy`.

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls
Dossier_1  file.txt
mowibox@chroma:~/Documents$ ls Dossier_1
Dossier_3  Dossier_4
mowibox@chroma:~/Documents$ cp -r Dossier_1/ Dossier_copy
mowibox@chroma:~/Documents$ ls
Dossier_1  Dossier_copy  file.txt
mowibox@chroma:~/Documents$ ls Dossier_copy
Dossier_3  Dossier_4
```

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Si le fichier ou le dossier de destination existe déjà, il sera **écrasé sans confirmation** !
{{< /callout >}}

### cat

La commande `cat`, permet **d'afficher le contenu d'un fichier dans le terminal.** Regardons par exemple le contenu du fichier `file.txt` qui attend son heure de gloire depuis le début de ce tutoriel :

```txt {title="file.txt"}
Bonjour Chroma !

J'aime taper des commandes dans un terminal !
```

On peut ainsi utiliser `cat` pour afficher son contenu :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ cat file.txt
Bonjour Chroma !

J'aime taper des commandes dans un terminal !
```

## Quelques commandes exclusives au terminal Linux

La suite du tutoriel illustre quelques commandes **exclusives à Linux** qui peuvent s'avérer utiles. Des équivalents sur le Windows Powershell sont donnés s'ils existent.

### touch

La commande `touch` permet de **créer un fichier.** Il peut être de l'extension de notre choix : fichier texte (.txt), Python (.py), Markdown (.md)...

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ touch file_2.txt
mowibox@chroma:~/Documents$ ls
Dossier_1  Dossier_copy  file.txt file_2.txt
```

### which

La commande `which` permet **d'afficher le chemin d'un programme installé.** Cherchons par exemple où se situe le programme `python3` :

```bash {title="Terminal"}
mowibox@chroma:~$ which python3
/usr/bin/python3
```

L'équivalent de la commande `which` sur le Powershell Windows est `Get-Command`.

### find

La commande `find` permet de **rechercher des fichiers/dossiers dans l'arborescence.**

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ find . -name "file.txt"
./file.txt
```

Ici on cherche dans le répertoire courant (`.`) tous les fichiers appelés exactement `file.txt`.

L'équivalent de la commande `find` sur le Powershell Windows est `Get-ChildItem` (ou `gci`).

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Pour ne pas faire de distinction entre majuscules/minuscules ("File", "FILE", "FiLE", etc. on dit que c'est **insensible la casse**) on peut remplacer l'option `name` par `-iname`.
{{< /callout >}}

### grep

La commande `grep` permet de **rechercher un mot ou un motif dans un fichier.** Recherchons le terme "Chroma" dans le fichier précédent :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ grep "Chroma" file.txt
Bonjour Chroma !
```

Le système affiche alors la ligne d'intérêt et indique en surbrillance le mot trouvé.

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Plusieurs options très utiles sont cumulables avec la commande `grep`, en voici quelques unes :

* `-i` : Fait une recherche insensible à la casse
* `-r` : Fait une recherche dans tous les sous-dossiers du répertoire courant
* `-n` : Affiche le numéro de ligne des occurences trouvées.

Voilà un exemple combinant les 3 :
{{< /callout >}}

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ grep -irn "chRoMA !"
file.txt:1:Bonjour Chroma !
```

L'équivalent de la commande `grep` sur le Powershell Windows est `Select-String`.

## Droits d'accès

Chaque fichier/dossier possède des **droits d'accès** définissant qui peut le lire, le modifier, ou l'exécuter. Ces droits s'appliquent à trois types d'utilisateurs :

* **user :** Le propriétaire du fichier
* **group :** Les membres du groupe associé au fichier
* **other :** Tous les autres utilisateurs

Il existe en tout trois types de droits :

* **Le droit en lecture (`r` pour read) :** permet de lire un fichier mais pas de le modifier.
* **Le droit en écriture (`w` pour write) :** permet de modifier le fichier.
* **Le droit d'exécution (`x` pour execute) :** permet de lancer un programme ou d'entrer dans un dossier.

Sous Linux, vous pouvez rajouter l'option `-l` à la commande `ls` pour **visualiser les droits :**

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ ls -l
total 4
drwxrwxr-x 2 mowibox mowibox 4096 Jun 30 10:19 Dossier_1
-rw-rw-r-- 1 mowibox mowibox    0 Jun 30 10:19 file.txt
```

Dans :

* Dossier_1/, `drwxrwxr-x` signifie que :
  * `d` : c’est un dossier.
  * `rwx` : le propriétaire a tous les droits (lecture, écriture, exécution).
  * `rwx` : le groupe a également tous les droits.
  * `r-x` : les autres utilisateurs peuvent lire et entrer dans le dossier, mais pas le modifier.

* file.txt, `-rw-rw-r--` signifie que :
  * `-` : C'est un fichier.
  * `rw-` : le propriétaire peut lire et modifier le fichier (un fichier texte ne peut pas être lancé comme un programme, d'où l'absence du `x`).
  * `rw-` : le groupe peut également lire et modifier.
  * `r--` : les autres utilisateurs peuvent seulement lire le fichier.

### chmod

La commande `chmod` permet de **modifier les droits d'accès d'un fichier ou d'un dossier.**

Pour l'écrire, il existe deux notations :

#### La notation symbolique

| Lettre | Signification               |
|--------|-----------------------------|
| u      | user                        |
| g      | group                       |
| o      | other                       |
| a      | all (tout le monde)         |
| +      | Ajoute des droits           |
| -      | Retire des droits           |
| =      | Remplace les droits         |

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ chmod u+x file.txt    # ajoute le droit d'exécution au propriétaire
mowibox@chroma:~/Documents$ chmod g-w file.txt    # retire le droit d’écriture au groupe
mowibox@chroma:~/Documents$ chmod o+r file.txt    # donne le droit de lecture aux autres
```

#### La notation numérique

| Chiffre | Droits |
|---------|--------|
| 7       | rwx    |
| 6       | rw-    |
| 5       | r-x    |
| 4       | r--    |
| 3       | -wx    |
| 2       | -w-    |
| 1       | --x    |
| 0       | ---    |

Exemple :

```bash {title="Terminal"}
mowibox@chroma:~/Documents$ chmod 744 file.txt    # u=rwx, g=r--, o=r--
mowibox@chroma:~/Documents$ chmod 655 file.txt    # u=rw-, g=r-x, o=r-x
mowibox@chroma:~/Documents$ chmod 520 file.txt    # u=r-x, g=-w-, o=---
```

{{< callout context="tip" title="Le saviez-vous?" icon="outline/message-dots" >}}
Si vous êtes à l'aise pour compter en binaire, vous aurez remarqué que chacun des triplets peut être décrit par un **nombre binaire compris entre 000 (aucun droit) et 111 (tous les droits).**
{{< /callout >}}

## Tableau récapitulatif des commandes

Cette section fait office **d'aide-mémoire** en résumant l'ensemble des commandes que nous venons de voir au cours de ce tutoriel. **En espérant que ça vous sera utile !**

| Commande          | Description                           | Exemple d'utilisation            | Exclusivité Linux ? |
| ----------------- | ------------------------------------- | -------------------------------- | ------------------- |
| [`pwd`](#pwd)     | Affiche le répertoire courant         | `pwd`                            | Non                 |
| [`ls`](#ls)       | Liste le contenu du répertoire        | `ls Documents/`                  | Non                 |
| [`cd`](#cd)       | Change de répertoire                  | `cd Documents/`                  | Non                 |
| [`mkdir`](#mkdir) | Crée un dossier                       | `mkdir Dossier_2`                | Non                 |
| [`rmdir`](#rmdir) | Supprime un dossier vide              | `rmdir Dossier_2`                | Non                 |
| [`rm`](#rm)       | Supprime un fichier                   | `rm goodbye.txt`                 | Non                 |
| [`mv`](#mv)       | Déplace ou renomme un fichier/dossier | `mv Dossier_4/ Dossier_3`        | Non                 |
| [`cp`](#cp)       | Copie un fichier ou dossier           | `cp -r Dossier_1/ Dossier_copy/` | Non                 |
| [`cat`](#cat)     | Affiche le contenu d'un fichier       | `cat file.txt`                   | Non                 |
| [`touch`](#touch) | Crée un fichier vide                  | `touch file_2.txt`               | Oui                 |
| [`which`](#which) | Affiche le chemin d’un programme      | `which python3`                  | Oui                 |
| [`find`](#find)   | Recherche des fichiers/dossiers       | `find . -name "file.txt"`        | Oui                 |
| [`grep`](#grep)   | Recherche un motif dans un fichier    | `grep "Chroma" file.txt`         | Oui                 |
| [`chmod`](#chmod) | Modifie les droits d’accès            | `chmod 744 file.txt`             | Oui                 |

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Septembre 2025
* **Relecteur :** [Gauthier BIEHLER](https://github.com/Minorzar)
