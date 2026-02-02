---
title: "Réaliser un dual-boot avec Windows"
summary: Pour avoir Ubuntu et Windows sur une même machine
weight: 4002
icon: "laptop"
---

<p align="center">
    <img src="/chroma/images/dual_boot.jpeg" alt="dual-boot" class="w-full h-auto" />
</p>

Un **dual-boot** est une méthode permettant d'installer deux systèmes d'exploitation au sein d'un même ordinateur, et de choisir l'un d'entre eux au démarage. Dans ce tutoriel, vous allez apprendre pas à pas à réaliser un dual-boot afin de pouvoir profiter des fonctionnalités de deux systèmes d'exploitation : Windows et Ubuntu.

## Pourquoi Ubuntu ?

**Linux** est un ensemble de systèmes d'exploitation (distributions) **open source** : c'est-à-dire que les développeurs peuvent consulter et modifier le code source. **Ubuntu** est l'une des distributions Linux les plus connues et plus utilisées. Par rapport à Windows, Ubuntu est **plus léger, plus stable** et dans certains cas **plus rapide**, notamment sur les vieilles machines.
Les distributions Linux sont très appréciées des développeurs car elles **supportent nativement de nombreux langages de programmation.** À titre d'exemple, c'est sur Ubuntu que sont réalisés la majorité des tutoriels de ce site. Donc si vous voulez vous lancer dans la programmation, Ubuntu constitue un environnement idéal pour débuter.

### Et pourquoi un dual-boot ?

Un **dual-boot** permet de découvrir les fonctionnalités de Linux tout en conservant Windows. Cela permet notamment de profiter du potentiel des deux systèmes d'exploitation sur une seule machine. Par exemple, Ubuntu est plus adapté à au développement informatique, tandis que certaines applications et jeux ont une meilleure compatibilité sur Windows, voire ne sont disponibles que sur cet OS. L'idée est donc de trouver un équilibre entre les deux environnements, sans tomber dans le piège d’en installer deux pour finalement n’en utiliser qu’un seul.

## Prérequis

* Un ordinateur sous Windows 11.
* Une clé USB d'au moins 8 Go.
* Un utilitaire de création de médias d'installation USB, par exemple [Rufus.](https://rufus.ie/fr/)
* L'image de disque [Ubuntu](https://www.ubuntu-fr.org/download/). _Privilégiez une version soutenue à long terme : LTS (pour Long Term Support)_

## Création de la clé USB d'installation Ubuntu

Dans un premier temps, il faut commencer par créer une clé USB d'installation. Branchée à l'ordinateur, il sera possible de lancer un démarrage à partir de la clé et ainsi débuter l'installation d'Ubuntu.

* Commencez par ouvrir votre utilitaire de création de médias USB. L'exemple ici est donné avec Rufus :
  * Vérifiez que votre clé est bien sélectionnée dans la section **"Périphérique"**
  * Dans **"Type de démarrage"**, cliquez sur le bouton **"SÉLECTION"** afin de choisir votre ISO d'Ubuntu fraîchement téléchargée.
  * Les autres paramètres peuvent être laissés tels quels comme sur l'image ci-dessous :

  <p align="center">
    <img src="/chroma/images/dual_boot_2_fr.png" alt="Rufus setup" class="w-full h-auto" />
  </p>

  * Appuyez sur **"DÉMARRER"**, puis sélectionnez l'option recommandée **"Écrire en mode Image ISO"** et validez. À la fin du processus, vous obtiendrez une clé d'installation prête à l'emploi !

## Création d'une image disque de restauration

<p align="center">
    <img src="/chroma/images/dual_boot_3_fr.png" alt="Recovery Drive" class="w-full h-auto" />
</p>

Avant de commencer à réaliser des manipulations sur le disque, i**l est recommandé de créer une image disque du système d'exploitation de votre ordinateur**. Cela vous permettra notamment d'avoir un point de retour en arrière en cas de problèmes durant l'installation. Le détail de la démarche est spécifié sur le [site web officiel de Microsoft.](https://support.microsoft.com/fr-fr/windows/lecteur-de-r%C3%A9cup%C3%A9ration-abb4691b-5324-6d4a-8766-73fab304c246)

## Démarrage à partir de la clé USB

Clé en main, vous pouvez redémarrer l'ordinateur pour réaliser l'installation d'Ubuntu. Pour ce faire, ouvrez les paramètres Windows :

* Sélectionnez **"Système"**, puis **"Récupération"**, vous devriez y trouver une option de démarrage avancé comme ci-dessous :

<p align="center">
    <img src="/chroma/images/dual_boot_4_fr.png" alt="Advanced startup settings" class="w-full h-auto" />
</p>

* Cliquez sur **"Redémarrer maintenant"**. L'ordinateur va alors redémarrer (logique vous me direz !) et vous afficher la fenêtre des options de démarrage avancé :

<p align="center">
    <img src="/chroma/images/dual_boot_5_fr.jpg" alt="Choose an option" class="w-full h-auto" />
</p>

* Choisissez **"Utiliser un périphérique"** et identifiez votre clé USB parmi les propositions listées.

* Lorsque vous cliquerez sur le bon média d'installation, l'ordinateur va démarrer sur Ubuntu en vous affichant un écran noir avec différentes options :

<p align="center">
    <img src="/chroma/images/dual_boot_6.jpeg" alt="Ubuntu menu" class="w-full h-auto" />
</p>

* Choisissez alors l'option **"Try or install Ubuntu"** en appuyant sur **"Entrée".**

## Installation d'Ubuntu

L'installation d'Ubuntu se fait ensuite en suivant les différentes étapes de l'utilitaire :

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Notez que si vous fermez l'utilitaire d'installation, vous aurez accès à un environnement Ubuntu que vous allez pouvoir entièrement explorer. Pratique pour tester le système avant de vous décider de réellement réaliser le dual-boot ou non !
{{< /callout >}}

* Commencez par choisir la langue de votre système d'exploitation, puis passez à l'étape suivante :

<p align="center">
    <img src="/chroma/images/dual_boot_7_fr.png" alt="Os Language" class="w-full h-auto" />
</p>

* Choisissez ensuite la disposition de votre clavier :

<p align="center">
    <img src="/chroma/images/dual_boot_8_fr.png" alt="Keyboard layout" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Ubuntu vous propose l'option **"Détecter"** pour trouver votre configuration de manière interactive. N'hésitez pas à entrer du texte dans l'espace dédié pour vérifier la configuration !
{{< /callout >}}

* L'utilitaire vous propose ensuite de vous connecter à Internet. Vous pouvez alors vous connecter à un réseau Ethernet ou Wi-Fi, mais ce n'est pas non plus obligatoire pour la suite de l'installation :

<p align="center">
    <img src="/chroma/images/dual_boot_9_fr.png" alt="Internet connection" class="w-full h-auto" />
</p>

* Sélectionnez **"Installer Ubuntu"**, puis **"Installation Interactive"** :

<p align="center">
    <img src="/chroma/images/dual_boot_10_fr.png" alt="Try or install Ubuntu" class="w-full h-auto" />
</p>

<p align="center">
    <img src="/chroma/images/dual_boot_11_fr.png" alt="Type of installation" class="w-full h-auto" />
</p>

* Ici, vous pouvez choisir de réaliser une **"Installation par défaut"** ou une **"Installation complète"** :

<p align="center">
    <img src="/chroma/images/dual_boot_12_fr.png" alt="Application" class="w-full h-auto" />
</p>

  1. **L'installation par défaut** installe Ubuntu avec les paramètres recommandés : un environnement de bureau complet, les logiciels et paquets essentiels, etc. C'est généralement le choix le plus simple et le plus rapide.
  2. **L'installation complète** inclut des logiciels supplémentaires tels que des utilitaires multimédias, des jeux, etc. Elle prend plus de place sur le disque et peut être légèrement plus longue à installer, mais elle offre une expérience plus riche dès le départ.

* Cochez au choix l'installation des logiciels supplémentaires pour améliorer les performances de votre système :

<p align="center">
    <img src="/chroma/images/dual_boot_13_fr.png" alt="Optimise you computer" class="w-full h-auto" />
</p>

{{< callout context="note" title="Note" icon="outline/info-circle" >}}
Si vous avez choisi de réaliser votre installation sans Wi-Fi, l'option **"Télécharger et installer la prise en charge de formats de multimédias supplémentaires"** ne sera pas disponible. Personnellement, je recommande de cocher les deux options.
{{< /callout >}}

* Et c'est ici que le dual-boot prend tout son sens ! Pour installer Ubuntu en parallèle de votre système Windows, cochez **"Installer Ubuntu à côté de Windows Boot Manager"** :

<p align="center">
    <img src="/chroma/images/dual_boot_14_fr.png" alt="Disk setup" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Tip" icon="outline/bulb" >}}
Remarquez l'option **"Effacer le disque et installer Ubuntu"**. Cette option vous permet de supprimer totalement Windows et d'installer Ubuntu sur votre ordinateur. En d'autres termes, à partir d'ici, vous savez déjà comment installer Ubuntu comme **seul système d'exploitation** sur une machine !
{{< /callout >}}

* La page suivante vous affichera alors un curseur vous permettant d'allouer un certain espace disque à Ubuntu :

<p align="center">
    <img src="/chroma/images/dual_boot_15_fr.png" alt="Ubuntu alongside Windows" class="w-full h-auto" />
</p>

Ici encore, c'est à vous de décider quelle proportion de votre stockage total vous voulez céder à Ubuntu. Par exemple, l'ordinateur utilisé dans ce tutoriel possède 512 Go de stockage. Il serait alors raisonnable de laisser au moins 100 Go à Ubuntu, ici environ 150 Go. Mais peut-être passerez-vous davantage de temps sur Ubuntu, et installerez beaucoup de logiciels lourds par rapport à votre système Windows, la partition Windows serait alors plus petite. À vous de voir !

* Puis, remplissez les informations de votre compte utilisateur : nom, nom d'ordinateur, nom d'utilisateur et mot de passe :

<p align="center">
    <img src="/chroma/images/dual_boot_16_fr.png" alt="Create your account" class="w-full h-auto" />
</p>

* Définissez ensuite votre fuseau horaire en spécifiant votre ville, ou directement en cliquant sur la carte :

<p align="center">
    <img src="/chroma/images/dual_boot_17_fr.png" alt="Select your timezone" class="w-full h-auto" />
</p>

* Vérifiez une dernière fois que les paramètres que vous avez spécifiés tout au long de l'installation vous conviennent. Tout est bon ? Nickel ! Il ne vous reste plus qu'à cliquer sur le bouton **"Installer"** et attendre que tout se termine _(Si vous vous ennuyez, vous pouvez toujours lire les notes d'installation qui défilent au fur et à mesure. Peut-être que vous apprendrez de nouvelles choses sur Ubuntu, qui sait ?)_

<p align="center">
    <img src="/chroma/images/dual_boot_18_fr.png" alt="Ready to install" class="w-full h-auto" />
</p>

Dès que l'installation est terminée, cliquez sur **"Redémarrer maintenant"** pour lancer votre dual-boot. Le système vous demandera de retirer votre clé USB puis d'appuyer sur **"Entrée"** _(en anglais, ça donne : "Please remove the installation medium then press ENTER:")._

## Lancement d'Ubuntu

Une fois que l'ordinateur s'allume de nouveau, vous verrez apparaître **GRUB** : le gestionnaire de démarrage d'Ubuntu :

<p align="center">
    <img src="/chroma/images/dual_boot_19.jpeg" alt="GNU GRUB" class="w-full h-auto" />
</p>

C'est grâce à cette interface que vous allez pouvoir sélectionner si vous voulez démarrer votre ordinateur avec Ubuntu ou Windows (Windows Boot Manager). Si vous attendez pendant 10 secondes sans bouger au démarrage, GRUB lancera Ubuntu par défaut.

Vous n'avez plus qu'à vous connecter à votre compte utilisateur pour bénéficier des fonctionnalités Linux : **Bienvenue dans Ubuntu !**

<p align="center">
    <img src="/chroma/images/dual_boot_20_fr.png" alt="Ubuntu desktop" class="w-full h-auto" />
</p>

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Relecteur :** Loubna LATRECHE
