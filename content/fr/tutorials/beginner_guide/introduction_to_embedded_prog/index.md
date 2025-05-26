---
title: "Initiation à la programmation embarquée"
summary: Avec le logiciel Arduino
weight: 1
icon: "laptop"
---



## Prérequis

## Les missions

Pour chaque niveau, un montage sera proposé sous la forme ci-dessous :

{{< figure src="level1.png" alt="Exemple de montage" class="w-full h-auto" >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Un [aide-mémoire](#aide-mémoire) est à votre disposition plus bas dans la page. Si jamais vous êtes coincés, une [solution](#solutions-des-missions) pour chacune des missions est également proposée
{{< /callout >}}

### Niveau 1 - Clignotant

#### Montage niveau 1

{{< figure src="level1.png" alt="Montage niveau 1" class="w-full h-auto" >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Faire clignoter la LED en changeant son état toutes les secondes.**
{{< /callout >}}

_[Solution](#solution-niveau-1---clignotant)_

---

### Niveau 2 - Tricolore

#### Montage niveau 2

{{< figure src="level2.png" alt="Montage niveau 2" class="w-full h-auto" >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Changer de manière successive l’état des 3 LEDs.**
{{< /callout >}}

_[Solution](#solution-niveau-2---tricolore)_

---

### Niveau 3 - Jour, Nuit, Jour...

#### Montage niveau 3

{{< figure src="level3.png" alt="Montage niveau 3" class="w-full h-auto" >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Commander l’allumage de la LED grâce à un bouton.**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Peut-être que pout connaître l’état du bouton, une fonction existe pour lire l’état d’une broche numérique... Peut-être même qu’elle est dans [l’aide-mémoire](#fonctions-arduino). La vie est bien faite non ?
{{< /callout >}}

_[Solution](#solution-niveau-3---jour-nuit-jour)_

---

### Niveau 4 - Jour, Nuit, version soft

#### Montage niveau 4

{{< figure src="level4.png" alt="Montage niveau 4" class="w-full h-auto" >}}

{{< callout context="note" title="Mission" icon="outline/target-arrow" >}}
**Faire varier l’intensité de la LED émise à l’aide d’un potentiomètre.**
{{< /callout >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
La broche du potentiomètre est connectée à un port analogique. Hmm... Analogique, analogique, analog, `analog`...
{{< /callout >}}

---

_[Solution](#solution-niveau-4---jour-nuit-version-soft)_

### Niveau 5 - ♪ Joyeux anniversaire ♪

#### Montage niveau 5

{{< figure src="level5.png" alt="Montage niveau 5" class="w-full h-auto" >}}

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

{{< figure src="happybirthday.png" alt="Happy Birthday" class="w-full h-auto" >}}

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Il y’a 25 notes jouées dans « Joyeux anniversaire ». On pourrait utiliser la méthode bourrin qui serait d’écrire 25 fois les fonctions `tone()` & `noTone()` pour chaque note, mais je suis sûr qu’il y’a une solution plus astucieuse ! Dans la partition simplifiée, une couleur de note correspond à une durée différente, pensez à varier les délais entre celles-ci.
{{< /callout >}}

_[Solution](#solution-niveau-5----joyeux-anniversaire-)_

---

## Pour aller plus loin

{{< figure src="level6.png" alt="Montage niveau 6" class="w-full h-auto" >}}

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
int tab[SIZE] = {1, 9, 0, 1};
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

## Solutions des missions

Les codes qui sont écrits dans cette section sont des proposition de correction écrites par mes soins. **Ne voyez pas ces solutions comme des dogmes** : il existe pleins d'autres façons de coder et d'arriver à une solution.

À vous de trouver celle qui vous plaira !

### Solution niveau 1 - Clignotant

```ino
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

_[Retour à la mission](#niveau-1---clignotant)_

---

### Solution niveau 2 - Tricolore

```ino
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

_[Retour à la mission](#niveau-2---tricolore)_

---

### Solution niveau 3 - Jour, Nuit, Jour...

```ino
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

_[Retour à la mission](#niveau-3---jour-nuit-jour)_

---

### Solution niveau 4 - Jour, Nuit, version soft

```ino
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

_[Retour à la mission](#niveau-4---jour-nuit-version-soft)_

---

### Solution niveau 5 - ♪ Joyeux anniversaire ♪

```ino
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

_[Retour à la mission](#niveau-5----joyeux-anniversaire-)_
