---
title: "Initiation à la programmation embarquée"
summary: Avec le logiciel Arduino
weight: 2001
icon: "laptop"
---

<p align="center">
  <img src="/chroma/images/arduino.jpeg" alt="IDE" class="w-full h-auto" />
</p>

La programmation embarquée consiste à programmer des microcontrôleurs, qui sont de petits circuits intégrés qui rassemblent les éléments essentiels d'un ordinateur. Les microcontrôleurs sont présents dans divers objets de notre quotidien (robots, ordinateurs, voitures...).

Dans cette initiation, vous apprendrez à prendre en main une carte Arduino et son logiciel associé, afin d'assimiler les bases de la programmation embarquée pour vos futurs projets personnels.

_Pour toute remarque ou question, n'hésitez pas à m'envoyer un mail ([ousmane.thiongane@outlook.com](mailto:ousmane.thiongane@outlook.com))._

## Prérequis

### Software

* Un ordinateur avec le logiciel [Arduino IDE](https://www.arduino.cc/en/software/).

### Hardware

#### Le microcontrôleur

* [Une carte à microcôntroleur Arduino (par exemple une Arduino UNO)](https://store.arduino.cc/products/arduino-uno-rev3)
* [Un câble USB type A-B](https://www.amazon.fr/PremiumCord-Connexion-Scanner-Blindage-Longueur/dp/B07HXSRMGJ/ref=sr_1_7?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&s=computers&sr=1-7)

#### Les composants

Les composants sont assez faciles à retrouver sur les sites de vente en ligne. Ce que je peux vous conseiller, c'est d'acheter des [kits de composants](https://www.amazon.fr/Elegoo-%C3%89lectronique-Breadboard-Potentiom%C3%A8tre-dapprentissage/dp/B01JD43262/ref=sr_1_12?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-12) qui réunissent déjà les composants de la liste ci-dessous, avec quelques composants supplémentaires que vous pourrez tester de votre côté.

* [Trois LEDs de couleur](/chroma/images/_led.jpg)
* [Un bouton poussoir](/chroma/images/_button.jpg)
* [3 résistances de 220 ohms](/chroma/images/_resistor.jpg)
* [1 résistance de 10 kilo-ohms](/chroma/images/_resistor.jpg)
* [Un potentiomètre](/chroma/images/_pot.jpg)
* [Un buzzer à impédance](/chroma/images/_buzzer.jpg)
* [Une plaque de prototypage (breadboard)](/chroma/images/_breadboard.jpg)
* [Quelques câbles de prototypages](/chroma/images/_cables.png)

## Les missions

Pour chaque niveau, un montage sera proposé sous la forme ci-dessous :

<p align="center">
  <img src="/chroma/images/level1.png" alt="Exemple de montage" class="w-full h-auto" />
</p>

Essayez de réaliser le branchement du montage. Une fois fait, vous pourrez brancher votre carte Arduino à votre ordinateur et ouvrir le logiciel Arduino IDE. Explorons rapidement l'interface avec un code permettant d'allumer la LED rouge :

<p align="center">
  <img src="/chroma/images/ide.png" alt="IDE" class="w-full h-auto" />
</p>

* Le bouton de compilation :ballot_box_with_check: permet de vérifier le code pour détecter d’éventuelles erreurs avant de l’envoyer sur la carte.
* Le bouton de téléversement :arrow_right: envoie le code compilé sur la carte Arduino pour qu’il y soit exécuté.

On définit un entier qui correspond à la broche de la carte sur laquelle on a connecté la LED, ici 2 :

```ino
const int ledPin = 2;
```

La LED étant une sortie (c’est-à-dire qu’on envoie du courant depuis la carte Arduino vers la LED pour l’allumer), on configure la broche `ledPin` en tant que telle avec la fonction `pinMode()` :

```ino
pinMode(ledPin, OUTPUT);
```

Dans la fonction `loop()`, on utilise `digitalWrite()` pour mettre la LED à l’état haut (HIGH) et ainsi l'allumer :

```ino
digitalWrite(ledPin, HIGH);
```

Après compilation et téléversement du code sur la carte, tout le code compris dans la fonction `setup` ne se lancera qu’une seule fois (ici la définition de `ledPin` en sortie numérique). Quant au code compris dans la fonction `loop`, il s’exécutera en boucle indéfiniment !

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Quelques conseils pour bien démarrer :

* Un [aide-mémoire](#aide-mémoire) regroupant la syntaxe et les fonctions utiles est à votre disposition plus bas dans la page.
* N'oubliez pas les points virgules ";" à la fin de chaque instruction.
* Vérifiez si le programme est bon avec la coloration syntaxique et le bouton de compilation.
* Faites attention aux minuscules/MAJUSCULES (sensibilité à la casse) dans les noms des variables : violet ≠ Violet.
* Si jamais vous êtes coincés, une solution pour chacune des missions est également proposée.
* Ne frappez pas votre machine (ou qui que ce soit d'autre) si ça ne fonctionne pas !

{{< /callout >}}

### Niveau 1 - Clignotant

#### Montage niveau 1

<p align="center">
  <img src="/chroma/images/level1.png" alt="Niveau 1" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Faire clignoter la LED en changeant son état toutes les secondes.**
{{< /callout >}}

{{< details "Solution Niveau 1 - Clignotant" >}}

_Les codes qui sont écrits dans cette section sont des proposition de correction écrites par mes soins. **Ne voyez pas ces solutions comme des dogmes** : il existe pleins d'autres façons de coder et d'arriver à une solution._

_À vous de trouver celle qui vous plaira !_

```ino {title = "niveau_1.ino", lineNos=true lineNoStart=1}
const int ledPin = 2;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);

  digitalWrite(ledPin, LOW);
  delay(1000);
}
```

{{< /details >}}

---

### Niveau 2 - Tricolore

#### Montage niveau 2

<p align="center">
  <img src="/chroma/images/level2.png" alt="Niveau 2" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Changer de manière successive l’état des 3 LEDs.**
{{< /callout >}}

{{< details "Solution Niveau 2 - Tricolore" >}}

_Les codes qui sont écrits dans cette section sont des proposition de correction écrites par mes soins. **Ne voyez pas ces solutions comme des dogmes** : il existe pleins d'autres façons de coder et d'arriver à une solution._

_À vous de trouver celle qui vous plaira !_

```ino {title = "niveau_2.ino", lineNos=true lineNoStart=1}
const int redLed = 2;
const int yellowLed = 3;
const int greenLed = 4;

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
}

void loop() {
  digitalWrite(redLed, HIGH);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, LOW);
  delay(1000);

  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, HIGH);
  digitalWrite(greenLed, LOW);
  delay(1000);

  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, HIGH);
  delay(1000);
}
```

{{< /details >}}

---

### Niveau 3 - Jour, Nuit, Jour...

#### Montage niveau 3

<p align="center">
  <img src="/chroma/images/level3.png" alt="Niveau 3" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Commander l’allumage de la LED grâce à un bouton.**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}

* Le bouton doit-il être configuré comme une entrée ou une sortie ?
* Peut-être que pour connaître l’état du bouton, une fonction existe pour lire l’état d’une broche numérique... Peut-être même qu’elle est dans [l’aide-mémoire](#fonctions-arduino). La vie est bien faite non ?

{{< /callout >}}

{{< details "Solution Niveau 3 - Jour, Nuit, Jour..." >}}

_Les codes qui sont écrits dans cette section sont des proposition de correction écrites par mes soins. **Ne voyez pas ces solutions comme des dogmes** : il existe pleins d'autres façons de coder et d'arriver à une solution._

_À vous de trouver celle qui vous plaira !_

```ino {title = "niveau_3.ino", lineNos=true lineNoStart=1}
const int ledPin = 2;
const int buttonPin = 4;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH){
    digitalWrite(ledPin, HIGH);
  }
  else{
    digitalWrite(ledPin, LOW);
  }
}
```

{{< /details >}}

---

### Niveau 4 - Jour, Nuit, version soft

#### Montage niveau 4

<p align="center">
  <img src="/chroma/images/level4.png" alt="Niveau 4" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Faire varier l’intensité de la LED émise à l’aide d’un potentiomètre.**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
La broche du potentiomètre est connectée à un port analogique. Hmm... Analogique, analogique, analog, `analog`...
{{< /callout >}}

{{< details "Solution Niveau 4 - Jour, Nuit, version soft" >}}

_Les codes qui sont écrits dans cette section sont des proposition de correction écrites par mes soins. **Ne voyez pas ces solutions comme des dogmes** : il existe pleins d'autres façons de coder et d'arriver à une solution._

_À vous de trouver celle qui vous plaira !_

```ino {title = "niveau_4.ino", lineNos=true lineNoStart=1}
const int ledPin = 3;
const int potPin = A0;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int potValue = analogRead(potPin);
  int brightness = map(potValue, 0, 1023, 0, 255);

  analogWrite(ledPin, brightness);
}
```

{{< /details >}}

---

### Niveau 5 - ♪ Joyeux anniversaire ♪

#### Montage niveau 5

<p align="center">
  <img src="/chroma/images/level5.png" alt="Niveau 5" class="w-full h-auto" />
</p>

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Jouer « Joyeux anniversaire » lorsque le bouton est appuyé.**
{{< /callout >}}

#### Fréquences des notes et partition (très) simplifiée de « Joyeux anniversaire » :

| Note   | Do  | Do# | Ré  | Ré# | Mi  | Fa  | Fa# |
|--------|-----|-----|-----|-----|-----|-----|-----|
| f(Hz)  | 262 | 277 | 294 | 311 | 330 | 349 | 370 |

| Note   | Sol | Sol# | La  | La# | Si  | Do2 |
|--------|-----|------|-----|-----|-----|-----|
| f(Hz)  | 391 | 415  | 440 | 466 | 493 | 523 |

<p align="center">
  <img src="/chroma/images/happybirthday.png" alt="Happy Birthday" class="w-full h-auto" />
</p>

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Il y’a 25 notes jouées dans « Joyeux anniversaire ». On pourrait utiliser la méthode bourrin qui serait d’écrire 25 fois les fonctions `tone()` & `noTone()` pour chaque note, mais je suis sûr qu’il y’a une solution plus astucieuse ! Dans la partition simplifiée, une couleur de note correspond à une durée différente, pensez à varier les délais entre celles-ci.
{{< /callout >}}

{{< details "Solution Niveau 5 - ♪ Joyeux anniversaire ♪" >}}

_Les codes qui sont écrits dans cette section sont des proposition de correction écrites par mes soins. **Ne voyez pas ces solutions comme des dogmes** : il existe pleins d'autres façons de coder et d'arriver à une solution._

_À vous de trouver celle qui vous plaira !_

```ino {title = "niveau_5.ino", lineNos=true lineNoStart=1}
#define DO 262
#define RE 294
#define MI 330
#define FA 349
#define SOL 392
#define LA 440
#define LAd 466
#define DO2 524

#define SIZE 25

const int buzzerPin = 2;
const int buttonPin = 4;

int frequences[SIZE] = {
  DO, DO, RE, DO, FA, MI,
  DO, DO, RE, DO, SOL, FA,
  DO, DO, DO2, LA, FA, MI, RE,
  LAd, LAd, LA, FA, SOL, FA

};

int durations[SIZE] = {
  400, 200, 500, 500, 500, 900,
  400, 200, 500, 500, 500, 900,
  400, 200, 500, 500, 500, 500, 900,
  400, 200, 500, 500, 500, 900
};

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {

  int buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH){
    happyBirthday();
  }
}


void happyBirthday(){
  for (int i = 0; i < SIZE; i++) {
    tone(buzzerPin, frequences[i]);
    delay(durations[i]);
    noTone(buzzerPin);
  }
}
```

{{< /details >}}

---

## Pour aller plus loin

Félicitations si vous êtes arrivés au bout des niveaux ! Si c'était trop facile pour vous vous pouvez essayer de créer un projet à partir de tous les composants que vous possédez. Par exemple pourquoi pas un feu tricolore à luminosité variable qui alerte les piétons d'un son lorsque le feu passe au rouge ? N'hésitez pas à parcourir Internet pour trouver des tutoriels qui pourraient vous intéresser.

<p align="center">
  <img src="/chroma/images/level6.png" alt="Niveau 6" class="w-full h-auto" />
</p>

Arduino est une plateforme idéale pour pouvoir comprendre rapidement les bases de la programmation embarquée et réaliser de petits projets. Mais si vous voulez aller plus loin, il existe des plateformes plus puissantes comme les **microcontrôleurs STM32**. La prise en main est moins intuitive, mais cela permet de réaliser des projets plus complexes, c'est pourquoi il est utilisé au sein de beaucoup d’entreprises.

---

## Aide-mémoire

### Les variables

| Type     | Description                          | Codage     |
|----------|--------------------------------------|------------|
| `int`    | Entier naturel                       | 4 octets   |
| `float`  | Nombre à virgule                     | 4 octets   |
| `char`   | Caractère                            | 1 octet    |
| `double` | Nombre à virgule (double précision)  | 8 octets   |

### Les opérateurs

| Type          | Opérateurs                                       |
|---------------|--------------------------------------------------|
| Arithmétiques | `+`, `-`, `*`, `/`, `%`                          |
| Affectation   | `=`, `+=`, `-=`, `%=`, `\|=`, `^=`, `<<=`, `>>=` |
| Logiques      | `&&`, `\|\|` `<`, `>`, `<=`, `>=`, `==`, `!=`    |

### Condition

```ino
if (x < 3) {
    printf("x est inférieur à 3");
} else {
    printf("x est supérieur ou égal à 3");
}

```

### Boucles

```ino
int x = 0;
while(x < 5){
    printf("Je ne dois pas frapper mon ordinateur.\n");
    x++;
}

int somme = 0;
for(int i = 0; i < 100; i++){
    somme += i;
}

```

### Directives de préprocesseur

```ino
// Inclusion d’une bibliothèque, ici servo
#include <servo.h>

// Définition de constantes
#define N 7
#define SIZE 3
#define SIZE2 6
```

### Les tableaux

```ino
int tab[SIZE] = {1, 8, 0, 5};
char tabchar[SIZE2] = {'c', 'h', 'r', 'o', 'm', 'a'};

// Initialisation d'un tableau à 0
for (int i = 0; i < SIZE; i++) {
    tab[i] = 0;
}
```

### Fonctions Arduino

| Fonction                              | Description                                           |
|---------------------------------------|-------------------------------------------------------|
| `pinMode(int pin, INPUT)`              | Définir le type d’une broche (`INPUT` = entrée/ `OUTPUT` = sortie)         |
| `digitalWrite(int pin, HIGH)`          | Définir l’état d’une broche numérique (`HIGH` = 1, `LOW` = 0)              |
| `digitalRead(int pin)`                 | Lire l’état d’une broche numérique                   |
| `delay(1000)`                          | Attente de 1000 ms (1 seconde)                       |
| `analogWrite(int pin, int dutyCycle)`  | Création d’un signal PWM de rapport cyclique `dutyCycle` ∈ [0; 255]       |
| `analogRead(int pin)`                  | Lire la valeur d’une broche analogique               |
| `Serial.begin(int baud)`               | Initialiser la liaison série (souvent `baud` = 9600)          |
| `Serial.println("Chroma")`              | Afficher “Chroma” sur le port série                    |
| `map(val, Imin, Imax, Omin, Omax)`     | Changement d’échelle. Réajuste les valeurs de val ∈ [`Imin`; `Imax`] pour [`Omin`; `Omax`]                       |
| `tone(pin, frequency)`                 | Jouer une fréquence sonore sur un buzzer de fréquence `frequency`            |
| `noTone(pin)`                          | Arrêter le son du buzzer                             |
| `Servo monServo`                       | Créer un objet pour contrôler un servomoteur         |
| `monServo.attach(pin)`                 | Attacher la broche `pin` à l'objet `monServo`        |
| `monServo.write(90)`                   | Définir la position du servomoteur (ici 90°)         |

{{< callout context="tip" title="Le saviez-vous ?" icon="outline/message-dots" >}}
Le langage de programmation
utilisé pour coder sur Arduino est le C++. Il est souvent utilisé pour coder des applications mobiles, des jeux vidéo, des logiciels de bureautique, en robotique...
{{< /callout >}}

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Mai 2025
* **Relecteurs :** Loubna LATRECHE, Alexandre PETIT
