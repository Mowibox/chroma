---
title: "Configurer une Raspberry Pi sans écran"
summary: Avec le protocole SSH
weight: 4002
icon: "chip"
---

<p align="center">
    <img src="/chroma/images/headless1.png" alt="Raspberry Pi Zero 2 W" class="w-full h-auto" />
</p>

Souvent, on configure une Raspberry Pi en y branchant un écran, un clavier et une souris. Mais peut-être que vous n’avez pas ce matériel sous la main — ou simplement que vous n’en avez pas besoin pour l’usage que vous souhaitez en faire. Par exemple, si votre projet n’utilise pas d’interface graphique, il est plus économe en ressources de se passer d’un écran.

Ce tutoriel vous propose une alternative de configuration de votre Raspberry Pi sans périphériques externes, en installant Ubuntu Server et en y accédant à distance grâce au protocole SSH.

## Prérequis

* Une Raspberry Pi : Ce tutoriel est réalisé avec une [Raspberry Pi Zero 2W](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/), mais vous pouvez très bien l'adapter à d'autres cartes comme une Raspberry Pi 4, 5, etc.
* Une alimentation pour votre Raspberry Pi.
* Un ordinateur sous système d'exploitation Linux : par exemple Ubuntu.
* Le logiciel [Raspberry Pi Imager](https://www.raspberrypi.com/software/).
* Une carte SD : la taille dépendra de ce que vous allez faire avec votre Pi plus tard, une carte de 8-16 Go me paraît être un juste minimum pour commencer.
* Un lecteur de carte SD : il peut être [externe](/chroma/images/_sdcardreader.jpg), mais certains ordinateurs disposent déjà d'un tel port.

## Configuration de la carte SD

Voici la liste des différentes étapes à suivre pour préparer la carte SD à l'emploi :

* Connectez la carte SD à votre ordinateur et lancez le logiciel Raspberry Pi Imager. Vous devriez obtenir une interface similaire à celle ci-dessous :

<p align="center">
    <img src="/chroma/images/headless2.png" alt="Raspberry Pi Imager" class="w-full h-auto" />
</p>

* Commencez par sélectionner le modèle de Raspberry Pi dont vous disposez en cliquant sur "Choosing Device" :

<p align="center">
    <img src="/chroma/images/headless3.png" alt="Choosing Device" class="w-full h-auto" />
</p>

* Cliquez sur "Choosing OS" pour choisir le système d'exploitation que vous allez flasher sur la carte SD. Cliquez sur "Other general-purpose OS" :

<p align="center">
    <img src="/chroma/images/headless4.png" alt="Choosing OS" class="w-full h-auto" />
</p>

* Parmi les différentes versions d'Ubuntu, sélectionnez une version "Server" : dans ces versions, les paquets et dépendances dédiés à l'interface graphique sont absents, ce qui est idéal dans notre situation où aucun écran n'est utilisé :

<p align="center">
    <img src="/chroma/images/headless5.png" alt="Choosing Ubuntu Server 24.04" class="w-full h-auto" />
</p>

* Sélectionnez ensuite l'emplacement de stockage de l'image. Si vous n'avez connecté que votre carte SD à votre ordinateur, cela devrait être facile de la retrouver.

<p align="center">
    <img src="/chroma/images/headless6.png" alt="Choosing Storage" class="w-full h-auto" />
</p>

* En cliquant sur "Next" le logiciel vous demandera si vous souhaitez appliquer des paramètres spécifiques sur votre OS avant de flasher la carte SD. Cliquez alors sur "Edit Settings".

<p align="center">
    <img src="/chroma/images/headless7.png" alt="Editing Settings" class="w-full h-auto" />
</p>

* Vous devriez obtenir une interface similaire à celle-ci dessous :

<p align="center">
    <img src="/chroma/images/headless8.png" alt="General Settings" class="w-full h-auto" />
</p>

* Modifiez les paramètres suivants en fonction de vos besoins :
  * Le nom d'hôte : Vous pouvez laisser le nom défini par défaut.
  * Le nom d'utilisateur et le mot de passe pour se connecter à la Pi.
  * Le Wi-Fi auquel la Pi cherchera à se connecter à chaque fois.
  * Les paramètres locaux et la langue de votre clavier.

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Plutôt que de connecter la Pi au Wi-Fi de votre box par exemple, vous pouvez configurer la Pi pour se connecter au partage Wi-Fi de votre téléphone. Ainsi, vous pourrez utiliser la Pi n'importe où !
{{< /callout >}}

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Quelque soit le réseau que vous choisissez, soyez sûrs qu'il est possible de l'utiliser en bande 2,4 GHz : Les Raspberry Pi ne peuvent pas se connecter à des réseaux de bande 5 GHz.
{{< /callout >}}

* Enfin, sélectionnez la section "Services" et cochez la case "Enable SSH" pour activer le service SSH. Laissez la sélection sur "Use password authentication".

<p align="center">
    <img src="/chroma/images/headless9.png" alt="Enabling SSH" class="w-full h-auto" />
</p>

* Cliquez sur "Save", puis sur "Yes" pour lancer l'écriture de l'OS sur la carte SD. Une fois l'écriture terminée, vous pouvez retirer votre carte SD de votre ordinateur pour l'insérer dans votre Raspberry Pi.

* Branchez la Pi à une alimentation. Vous devriez voir un voyant vert clignoter. Essayons maintenant d'y accéder via notre ordinateur.

## Connexion en SSH

### La connexion SSH

Le SSH (Secure Shell) est un protocole sécurisé qui permet de se connecter et d'envoyer des commandes à un autre ordinateur à distance. C’est grâce à ce protocole que vous allez pouvoir prendre le contrôle de votre Raspberry Pi depuis votre ordinateur, sans avoir besoin d’écran ni de clavier. Mais pour pouvoir l'utiliser, il vous faudra trouver l'adresse IP de votre Raspberry Pi.

### Trouver l'adresse IP de la Raspberry Pi

Si vous avez suivi l'astuce d'utiliser votre point d'accès mobile pour connecter la Pi au Wi-Fi, alors vous pouvez directement trouver l'adresse dans les paramètres du hotspot : Il suffit de cliquer sur le nom d'hôte de votre Pi dans la liste des périphériques connectés.

_Si vous ne trouvez pas le nom d'hôte de votre Pi dans la liste, vérifiez que vous avez bien configuré votre hotspot Wi-Fi en bande 2,4 GHz._

Si vous avez l'adresse IP, vous pouvez directement passer à la [section suivante](#connexion-à-la-raspberry-pi). Sinon, continuez la lecture.

<p align="center">
    <img src="/chroma/images/headless10_fr.png" alt="Hotspot tip" class="w-full h-auto" />
</p>

* Sur votre ordinateur, installez le paquet de contrôle réseau `net-tools` :

``` bash {frame=none}
sudo apt install net-tools
```

* Toujours avec votre ordinateur, connectez-vous au même réseau Wi-Fi que celui enregistré lors de la configuration de la Pi. Utilisez ensuite la commande ci-dessous pour afficher les informations réseau de votre ordinateur :

``` bash {frame=none}
ifconfig
```

Vous devriez tomber sur une ligne semblable à celle ci :

```bash {title="Terminal", hl_lines=[2]}
wlp0s20f3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet x.x.x.x  netmask 255.255.255.0  broadcast x.x.x.255
```

Repérez l'interface correspondant à votre connexion réseau (souvent `wlp...` pour le Wi-Fi ou `eth0` pour Ethernet).

À côté de `inet` vous trouverez l'adresse IP locale de votre ordinateur au format `x.x.x.x`. Utilisons la pour trouver l'adresse IP de la Pi.

* Installez l'outil `nmap`:

```bash {frame=none}
sudo apt install nmap
```

* Lancez un scan réseau avec la commande ci-dessous, en remplaçant `x.x.x.x` par votre adresse IP.

```bash {frame=none}
nmap -p 22 x.x.x.x/24
```

{{< callout context="note" title="Que fait cette ligne ?" icon="outline/info-circle" >}}
`nmap` est un outil qui permet d'explorer les réseaux.

* L'argument `-p 22` indique que l'on ne s'intéresse qu'au port 22, qui correspond au service SSH.

* Le suffixe `/24` après l'adresse IP signifie qu'on scanne toutes les adresses de `x.x.x.1` à `x.x.x.254`. C'est ce qu'on appelle un ["masque de sous-réseau".](https://fr.wikipedia.org/wiki/Sous-r%C3%A9seau)

Autrement dit, cette commande va lister tous les appareils actifs sur le réseau local qui ont le port SSH ouvert — ce qui permet d'identifier facilement la Raspberry Pi.
{{< /callout >}}

Voici un exemple typique de sortie donnée par cette ligne de commande :

```bash {title="Terminal", hl_lines=[8,9,10,11,12]}
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-07-12 01:20 CEST
Nmap scan report for _gateway (z.z.z.z)
Host is up (0.023s latency).

PORT   STATE  SERVICE
22/tcp closed ssh

Nmap scan report for y.y.y.y
Host is up (0.071s latency).

PORT   STATE SERVICE
22/tcp open  ssh

Nmap scan report for mowibox-HP-EliteBook (x.x.x.x)
Host is up (0.00011s latency).

PORT   STATE  SERVICE
22/tcp closed ssh

Nmap done: 256 IP addresses (3 hosts up) scanned in 5.26 seconds
```

* Cherchez une adresse IP avec le port 22 en état `open`. Dans l'exemple du dessus, l'adresse IP de la Raspberry Pi serait `y.y.y.y`.

### Connexion à la Raspberry Pi

Une fois l'adresse IP de votre Pi récupérée, vous pouvez vous y connecter avec la commande :

```bash {frame=none}
ssh chromapi@x.x.x.x
```

Remplacez `chromapi` par le nom d'utilisateur que vous avez défini dans Raspberry Pi Imager, et `x.x.x.x` par l’adresse IP de votre Raspberry Pi.

Lors de la première connexion, le système vous demandera de confirmer l'authenticité de la machine. Répondez "oui" (`yes`/`y`) à la question de connexion, puis entrez le mot de passe que vous avez configuré avec Raspberry Pi Imager.

Si tout s'est bien passé, vous devriez voir un message d'accueil similaire à celui-ci :

```bash {title="chromapi@chroma~"}
Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 6.8.0-1018-raspi aarch64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Sat Jul 12 01:27:32 CEST 2025

  System load:  0.26              Temperature:            38.6 C
  Usage of /:   7.4% of 28.69GB   Processes:              139
  Memory usage: 47%               Users logged in:        0
  Swap usage:   0%                IPv4 address for wlan0: x.x.x.x

Expanded Security Maintenance for Applications is not enabled.

218 updates can be applied immediately.
113 of these updates are standard security updates.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

-bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

chromapi@chroma:~$
```

Félicitations ! Vous êtes maintenant connecté à votre Raspberry Pi. Il reste encore quelques configurations à réaliser pour qu'elle soit prête à l'usage.

### Configuration du système

* Mettez à jour les paquets Ubuntu (ça peut prendre un petit moment) :

```bash {frame=none}
sudo apt update
sudo apt upgrade
```

Ubuntu ne possède pas nativement l'outil de configuration `raspi-config` présent dans Raspberry Pi OS, vous devez donc l'installer manuellement :

```bash {frame=none}
sudo apt install raspi-config
sudo raspi-config
```

Cela vous amènera sur un menu de configuration qui vous permettra d'activer ou désactiver des paramètres spécifiques à la Pi.

Voici quelques options que j'active souvent :

* Interface options > Legacy camera
* Interface options > SPI
* Interface options > I2C
* Interface options > Serial Port
* Interface options > Remote GPIO
* Performance options > GPU Memory > 128 MB

Sauvegardez vos modifications et redémarrez votre Pi.

Et voilà ! Votre Raspberry Pi est maintenant prête à être utilisée sans écran !

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Juillet 2025
* **Relecteur :**
