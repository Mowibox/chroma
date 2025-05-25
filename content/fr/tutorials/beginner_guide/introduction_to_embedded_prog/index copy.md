---
title: "Initiation à la programmation embarquée"
summary: Avec le logiciel Arduino
weight: 1
icon: "laptop"
---

# Introduction


## Prérequis





## Les missions

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Pour chaque niveau, un montage sera proposé sous la forme ci-dessous :
{{< /callout >}}


{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Un aide-mémoire est à votre disposition blabla
{{< /callout >}}


### Niveau 1 - Clignotant

#### Montage


#### Mission :

{{< callout context="tip" title="Le saviez-vous ?" icon="outline/message-dots" >}}
Le langage de programmation
utilisé pour coder sur Arduino est le C++. Il est souvent utilisé pour coder des applications mobiles, des jeux vidéo, des logiciels de bureautique, en robotique...
{{< /callout >}}

### Niveau 2 - Tricolore

#### Montage


#### Misison :

### Niveau 3 - Jour, Nuit, Jour...

#### Montage


#### Misison :

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Peut-être que pout connaître l’état du bouton, une fonction existe pour lire l’état d’une broche numérique... Peut-être même qu’elle est dans l’aide-mémoire. La vie est bien faite non ?
{{< /callout >}}


### Niveau 4 - Jour, Nuit, version soft

#### Montage


#### Misison :


{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
La broche du potentiomètre est connectée à un port analogique. Hmm... Analogique, analogique, analog...
{{< /callout >}}


### Niveau 5 - ♪ Joyeux anniversaire ♪

#### Montage


#### Misison :

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

```cpp
if (x < 3) {
    printf("x est inférieur à 3");
} else {
    printf("x est supérieur ou égal à 3");
}

```

### Boucles

```cpp
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

```cpp
// Inclusion d’une bibliothèque, ici servo
#include <servo.h>

// Définition de constantes
#define N 7
#define SIZE 3
#define SIZE2 6
```

### Les tableaux

```cpp
int tab[SIZE] = {1, 9, 0, 1};
char tabchar[SIZE2] = {'c', 'h', 'r', 'o', 'm', 'a'};

// Initialisation d'un tableau à 0
for (int i = 0; i < SIZE; i++) {
    tab[i] = 0;
}
```

## Fonctions Arduino

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
| `map(val, Imin, Imax, Omin, Omax)`     | Changement d’échelle. Réajuste les valeurs de val ∈
 [`Imin`; `Imax`] pour [`Omin`; `Omax`]                       |
| `tone(pin, frequency)`                 | Jouer une fréquence sonore sur un buzzer de fréquence `frequency`            |
| `noTone(pin)`                          | Arrêter le son du buzzer                             |
| `Servo monServo`                       | Créer un objet pour contrôler un servomoteur         |
| `monServo.attach(pin)`                 | Attacher la broche `pin` à l'objet `monServo`        |
| `monServo.write(90)`                   | Définir la position du servomoteur (ici 90°)         |



## Corrections des missions

### Niveau 1 - Clignotant

```cpp

```

### Niveau 2 - Tricolore

```cpp

```

### Niveau 3 - Jour, Nuit, Jour...

```cpp

```

### Niveau 4 - Jour, Nuit, version soft

```cpp

```

### Niveau 5 - ♪ Joyeux anniversaire ♪

```cpp

```
