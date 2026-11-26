---
title: "Installation du logiciel"
slug: "installation"
description: "Flasher l'image Chromapi OS sur la carte SD avec Raspberry Pi Imager."
summary: "Flasher l'image Chromapi OS sur la carte SD avec Raspberry Pi Imager."
date: 2026-11-12
lastmod: 2026-11-13
draft: false
weight: 20
toc: true
icon: "download"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Installez le logiciel de Chromapi : flashez pas à pas l'image Chromapi OS sur la carte SD du robot avec Raspberry Pi Imager."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

Le logiciel de Chromapi, "**Chromapi OS**" est distribué sous forme d'image. L'image est basée sur Ubuntu Server 24.04 (LTS) avec le SDK de Chromapi, l'application web et la configuration du Raspberry Pi déjà préparée.

## Prérequis

* La carte SD du robot (16 Go minimum recommandés).
* Un lecteur de cartes SD, ce dernier peut-être [externe](/chroma/images/_sdcardreader.jpg), mais certains ordinateurs disposent d'un tel port.
* [Raspberry Pi Imager](https://www.raspberrypi.com/software/) en version 2.0.
* Le nom et le mot de passe de votre réseau Wi-Fi.

## Flasher l'image sur la carte

### 1. Ajouter Chromapi OS à Raspberry Pi Imager

{{< steps >}}
{{< step >}}
Ouvrez Raspberry Pi Imager et cliquez sur **App Options**.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation1.png" alt="Raspberry Pi Imager App Options" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
Dans la section **Content Repository**, choisissez **Use custom URL** et l'adresse ci-dessous :

```text
https://github.com/Mowibox/chromapi/releases/latest/download/os_list.json
```

<p align="center">
 {{< img src="images/chromapi/chromapi_installation2.png" alt="Custom repository URL" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
Une fois validée, Chromapi OS sera chargé dans la liste de Raspberry Pi Imager.
{{< /step >}}
{{< /steps >}}

{{< callout context="note" title="Alternative" icon="outline/info-circle" >}}
Si l'adresse n'est pas fonctionnelle, téléchargez le fichier `os_list.json` depuis la [dernière release](https://github.com/Mowibox/chromapi/releases/latest), puis utilisez-le avec **Use custom file** à la place.
{{< /callout >}}

### 2. Choix des options de configuration

{{< steps >}}
{{< step >}}
Dans **Device**, choisissez **Raspberry Pi 4**.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation3.png" alt="Device selection" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
Dans **OS**, choisissez **Chromapi OS**.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation4.png" alt="Chromapi OS selection" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< step >}}
Dans **Storage** : sélectionnez votre carte SD.

<p align="center">
 {{< img src="images/chromapi/chromapi_installation5.png" alt="Storage selection" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>
{{< /step >}}
{{< /steps >}}

### 3. Personnalisation de l'OS et écriture de la carte SD

Afin de personnaliser votre OS, complétez les différents champs indiqués comme suit :

| Réglage | Quoi mettre |
| :--- | :--- |
| Nom d'hôte (hostname) | Le nom de votre robot sur le réseau, par exemple `chromapi-salon`. Laissez `chromapi` pour qu'il se renomme automatiquement (au format `chromapi-xxxx`). |
| Localisation | Choissisez votre ville/pays, votre fuseau horaire ainsi que la disposition de votre clavier. |
| Utilisateur (User) | Gardez le nom `chromapi` et choisissez un mot de passe si vous comptez programmer avec le robot (utilisé pour la connexion SSH). |
| Wi-Fi | Le nom et le mot de passe de votre réseau. Il est conseillé dans un premier temps de le connecter à son partage de connexion mobile (en 2,4 GHz) pour que l'utilisation de Chromapi ne soit pas limitée à un seul endroit. |
| SSH (Remote Access) | Activez l'authentification par mot de passe si vous comptez programmer le robot. Si vous possédez une clé SSH publique, vous pouvez également la spécifier avec l'option "use public key authentication". |

{{< callout context="caution" title="Important" icon="outline/alert-triangle" >}}
Le nom d'utilisateur doit rester `chromapi` : c'est le compte déjà présent dans l'image, et le mot de passe choisi ici lui est donné au premier démarrage. L'image ne contient aucun mot de passe par défaut.
{{< /callout >}}

<p align="center">
    {{< img src="images/chromapi/chromapi_installation6.png" alt="Write summary" sizes="(max-width: 800px) 100vw, 800px" >}}
</p>

Une fois vos paramètres configurés, vérifiez une dernière fois la configuration de la carte puis lancez l'écriture de la carte SD (Write). À la fin de l'étape de vérification, vous pouvez retirer la carte SD.

## Premier démarrage

Le robot n'a pas besoin d'être entièrment monté pour cette partie : le Raspberry Pi branché sur la carte mère et les batteries suffisent.

{{< steps >}}
{{< step >}}
Insérez la carte SD dans le Raspberry Pi.
{{< /step >}}
{{< step >}}
Allumez la carte mère avec son interrupteur.
{{< /step >}}
{{< step >}}
Patientez quelques minutes : au premier démarrage, le système se configure (réseau, nom, clés).
{{< /step >}}
{{< /steps >}}

Le Raspberry Pi est prêt lorsque son application web répond. Depuis un téléphone ou un ordinateur **sur le même réseau Wi-Fi que configuré dans Raspberry Pi Imager**, vous pourrez accéder à l'applicaiton web via l'adresse suivante :

```text
https://chromapi.local:5000
```

Le nom d'hôte que vous avez spécifié fonctionne également, par exemple si c'est `chromapi-salon` vous pouvez directement ouvrir l'adresse :

```text
https://chromapi-salon.local:5000
```

Les prochaines étapes sont spécifiées dans la page [Premier démarrage]({{< relref "chromapi/getting-started/first-start/" >}}).

## Retrouver Chromapi sur le réseau

* **S'il n'y a qu'un seul robot sur le réseau** : utiliser le nom d'hôte `chromapi.local` est suffisant.
* **S'il y a deux ou plusieurs robots sur le réseau** : Chaque robot répond à son propre nom, `chromapi-xxxx.local`, où `xxxx` sont les quatre derniers caractères du numéro de série de son Raspberry Pi. Comme indiqué précédemment, il peut également être défini par l'utilisateur.
* **Pour retrouver son nom** : Si vous ne retrouvez pas le nom associé à votre Chromapi, éteignez le robot, insérez sa carte SD dans un ordinateur et ouvrez le fichier `chromapi-name.txt` de la partition `system-boot`. Le nom y est écrit après le premier démarrage.

## Ajouter manuellemnt des réseaux Wi-Fi

Il est possible de configurer plusieurs réseaux Wi-Fi afin que le robot puisse s'y connecter. Pour ce faire :

{{< steps >}}
{{< step >}}
Éteignez le Chromapi et insérez sa carte dans un ordinateur.
{{< /step >}}
{{< step >}}
Sur la partition `system-boot`, ouvrez le fichier `network-config.yaml` avec un éditeur de texte.
{{< /step >}}
{{< step >}}
Ajoutez ou remplacez votre réseau, en modifiant la section `access-points` :

```yaml
network:
  version: 2
  wifis:
    wlan0:
      dhcp4: true
      optional: true
      access-points:
        "nom du reseau 1":
          password: "mot de passe 1"
        "nom du reseau 2":
          password: "mot de passe 2"
```

{{< /step >}}
{{< step >}}
Remettez la carte dans le robot. Les modifications seront appliquées au démarrage.
{{< /step >}}
{{< /steps >}}

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Il est également possible de modifier ce fichier avec le robot allumé en se connectant dessus via SSH (Mode développeur).
{{< /callout >}}

## Installation manuelle

Si vous préférez partir d'un Ubuntu Server 24.04 que vous avez installé vous-même sur le Raspberry Pi, la configuration du système de Chromapi peut se faire manuellement via un script d'installation. Lorsque vous êtes connecté en SSH sur Chromapi, exécutez la ligne suivante :

```bash
git clone https://github.com/Mowibox/chromapi.git && ./chromapi/deploy/setup_rpi.sh && sudo reboot
```

Cette dernière vous permettra de cloner le dossier contenant le code de Chromapi et de lancer le script d'exécution. Le script `setup_rpi.sh` installe les paquets, configure les périphériques du Raspberry Pi (port série, caméra, son, ventilateur), crée l'environnement Python et active les services nécessaires. Il peut être relancé plusieurs fois sans risque. Contrairement à l'installation sur ordinateur (`pip install chromapi`), le robot a besoin du dépôt complet : le dossier `deploy/` contient les services et la configuration système, qui ne font pas partie du paquet pip.
