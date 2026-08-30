---
title: "Protocole de communication"
description: "Comment le Raspberry Pi et le STM32 se parlent."
summary: "Le protocole de bridge UART entre le Raspberry Pi et la carte mère STM32, et le protocole de bus servo Feetech qu'il relaie."
date: 2026-08-29
lastmod: 2026-08-30
draft: false
weight: 20
toc: true
icon: "network"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Le protocole de bridge UART entre le Raspberry Pi et la carte mère STM32, et le protocole de bus servo Feetech qu'il relaie."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/documentation/protocol/"
   noindex: false
   robots: "index, follow"
---

Coming soon!

<script type="text/plain" hidden>
Le Raspberry Pi et le STM32 de la carte mère communiquent ensemble via un protocole personnalisé, à **1 Mbps** (J'aurais bien appelé ce protocole **chromaping**, tiens...)

L'implémentation de référence se trouve dans les fichiers [`bridge.h`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Inc/bridge.h) & [`bridge.c`](https://github.com/Mowibox/chromapi_motherboard/blob/main/firmware/chromapi_stm32_core/Core/Src/bridge.c) côté firmware, et
[`motherboard_bridge.py`](https://github.com/Mowibox/chromapi/blob/main/src/chromapi/hardware/motherboard_bridge.py)
côté Python.

## Vue d'ensemble

{{</* kroki type="mermaid" title="Aperçu du bridge Chromapi" */>}}
sequenceDiagram
    participant RPi as Raspberry Pi
    participant MCU as STM32G431KBT6

    RPi->>MCU: SYNC(0x55,0xAA) · LEN · CMD · PAYLOAD · CRC
    MCU-->>RPi: SYNC(0x55,0xAA) · LEN · REPONSE · PAYLOAD · CRC

    Note over RPi,MCU: UART1 · 1 Mbps
{{</* /kroki */>}}

La communication suit strictement un modèle **question-réponse** : le Raspberry Pi est
toujours celui qui demande, et le STM32 ne s'exprime qu'en réponse à une trame qu'il vient de
recevoir. En d'autres termes, il n'envoie jamais de données s'il n'a pas été sollicité. La même règle
s'applique un niveau plus bas, entre le STM32 et les servomoteurs.

## Format de trame

```text
[ SYNC_1 ][ SYNC_2 ][ LONGUEUR ][ CMD ][ PAYLOAD... ][ CRC ]
   0x55      0xAA        N+1     1 o.      N octets     1 o.
```

* **SYNC_1 / SYNC_2**: octets de synchronisation fixes `0x55 0xAA`, utilisés pour repérer
  le début d'une trame.
* **LONGUEUR**: nombre d'octets qui suivent jusqu'à CMD inclus, soit `len(payload) + 1`.
* **CMD**: Le code de commande dans une requête sur un octet (voir
  [Commandes](#commandes)), ou le code de réponse dans une réponse (voir
  [Réponses](#réponses)).
* **PAYLOAD**: spécifique à la commande, 0 octet ou plus. Il correspond à la partie d'un message ou d'une transmission de données contenant les informations essentielles destinées à l'utilisateur final
* **CRC**: Le XOR de chaque octet depuis LONGUEUR jusqu'à la fin du PAYLOAD, sur un octet.

### Checksum

Le checksum est un calcul réalisé sur un bloc de données pour vérifier que les données n'ont pas été altérées ou corrompues. Ici, l'opération est:

```text
CRC = LONGUEUR ^ CMD ^ PAYLOAD[0] ^ PAYLOAD[1] ^ ... ^ PAYLOAD[N-1]
```

où `^` correspond à l'opération [XOR](https://fr.wikipedia.org/wiki/Fonction_logique_OU_exclusif).

**Exemple:** PING_BRIDGE (0x01), sans payload :

| En-tête | Longueur | CMD | CRC |
| :--- | :--- | :--- | :--- |
| 0x55 0xAA | 0x01 | 0x01 | 0x01 ^ 0x01 = 0x00 |

Trame d'instruction : 55 AA 01 01 00.

Le STM32 acquitte avec `OK` (0x80), de longueur 0x01, soit CRC 0x01 ^ 0x80 = 0x81 : 55 AA 01 80 81.

Ainsi, une trame dont le dernier octet ne correspond pas au CRC recalculé est ignorée. Voir [Gestion des erreurs](#gestion-des-erreurs).

## Commandes

| Code | Commande | Payload | Réponse typique |
| :--- | :--- | :--- | :--- |
| 0x01 | PING_BRIDGE | — | `OK` |
| 0x02 | SET_POSITIONS | Positions cibles des 12 servomoteurs | `OK` |
| 0x03 | STATE_FEEDBACK | — | `STATE_SNAPSHOT` (servos, IMU, alimentation, microinterrupteurs) |
| 0x04 | PING_SERVO | ID du servo | `OK` / `ERROR` |
| 0x05 | GET_SERVO_INFO | ID du servo | Informations du servo |
| 0x06 | SET_SERVO_ID | ID actuel, nouvel ID | `OK` |
| 0x07 | SET_LED_COLOR | Cible (0x01 toutes / 0x02 une seule) + Valeur RGB (+ index) | `OK` |
| 0x08 | SET_LED_RING_BULK | Valeurs RGB des 18 LEDs | `OK` |
| 0x09 | GET_POWER | — | `POWER_READING` |
| 0x0A | WRITE_SERVO_REGISTER | ID du servo, registre, valeur | `OK` |
| 0x0B | READ_SERVO_REGISTER | ID du servo, registre, taille | `SERVO_REG_VALUE` |

### Exemple : GET_POWER

#### Requête 

* Header: 55 AA
* Longueur: 0x01,
* CMD: 0x09,
* CRC: 0x01 ^ 0x09 = 0x08

Ce qui donne comme commande complète :

```text
55 AA 01 09 08
```

#### Réponse

`POWER_READING` (0x82) transportant trois champs `int32` (tension du bus, courant, puissance), par exemple avec 12,000000 V, 0,500000 A, 6,000000 W :

```text
55 AA 0D 82  00 1B B7 00  20 A1 07 00  80 8D 5B 00 F3
            └──bus_uV──┘ └current_uA┘ └─power_uW─┘
```

## Réponses

| Code | Nom | Signification |
| :--- | :--- | :--- |
| `0x80` | `OK` | Commande acquittée |
| `0x81` | `ERROR` | Commande échouée ou mal formée |
| `0x82` | `POWER_READING` | Réponse à `GET_POWER`. Renvoie la tension, le courant, et la puissance actuelle. |
| `0x83` | `STATE_SNAPSHOT` | Réponse à `STATE_FEEDBACK`, Renvoie l'état du robot (position des servos, orientation, etc.) |
| `0x84` | `SERVO_REG_VALUE` | Réponse à `READ_SERVO_REGISTER`. Renvoie les valeurs du registre du servomoteur |

## Gestion des erreurs

* **`ERROR` (`0x81`)**: Le STM32 a compris la trame mais n'a pas pu l'exécuter (par exemple un ID de servo ou un registre inconnu). Le payload spécifique à la commande est alors vide.
* **CRC invalide**: Le client recalcule le CRC sur les octets `LONGUEUR + CMD + PAYLOAD` reçus; Si le CRC est incorrect, la trame est abandonée et une exception est levée.
* **Timeout**: Si les deux octets de synchronisation, ou les `LONGUEUR + 1` octets annoncés qui doivent suivre, n'arrivent pas à temps, la lecture expire au lieu de bloquer indéfiniment.

## Structures des payloads

Agencement des octets pour chaque commande à payload de format fixe. Tous les champs
multi-octets sont en [little-endian](https://fr.wikipedia.org/wiki/Boutisme).

**`SET_POSITIONS`** (`0x02`, requête) — 24 octets, 12 × `uint16` :

| Champ | Type | Notes |
| :--- | :--- | :--- |
| `positions[12]` | `uint16` | Position cible brute (pas moteur), une par servo, dans l'ordre des index |

**`GET_POWER`** (`0x09`) → **`POWER_READING`** (`0x82`, réponse) — 12 octets :

| Champ | Type | Notes |
| :--- | :--- | :--- |
| `bus_uV` | `int32` | Tension du bus, µV |
| `current_uA` | `int32` | Courant consommé, µA |
| `power_uW` | `int32` | Puissance, µW |

**`STATE_FEEDBACK`** (`0x03`) → **`STATE_SNAPSHOT`** (`0x83`, réponse) — 129 octets :

| Champ | Type | Notes |
| :--- | :--- | :--- |
| `bus_uV` | `int32` | Tension du bus, µV |
| `current_uA` | `int32` | Courant consommé, µA |
| `power_uW` | `int32` | Puissance, µW |
| `servos[12]` | struct | Par servo : `position` (`uint16`), `speed` (`int16`), `load` (`int16`), `temperature` (`uint8`), `voltage` (`uint8`) |
| `imu_acc[3]` | `int16` | Accéléromètre, 3 axes |
| `imu_gyro[3]` | `int16` | Gyroscope, 3 axes |
| `imu_quat[4]` | `int16` | Quaternion d'orientation |
| `switches_mask` | `uint8` | Bitmask des contacteurs de pied (TL, TR, BL, BR) |

**`SET_LED_COLOR`** (`0x07`, requête) :

| Cible | Payload | Notes |
| :--- | :--- | :--- |
| `0x01` `LED_RING_ALL` | `0x01 R G B` | Toutes les LEDs reçoivent la même valeur RGB |
| `0x02` `LED_RING_SINGLE` | `0x02 index R G B` | Une seule LED, par index |

**`SET_LED_RING_BULK`** (`0x08`, requête) — 54 octets, 18 × (`R`, `G`, `B`).

**`WRITE_SERVO_REGISTER`** (`0x0A`, requête) — 4 ou 5 octets selon la largeur du registre :

| Champ | Type | Notes |
| :--- | :--- | :--- |
| `servo_id` | `uint8` | Servo cible |
| `register` | `uint8` | Adresse dans la table de contrôle |
| `size` | `uint8` | `1` ou `2` |
| `value` | `uint8` ou `uint16` | `size` octets, little-endian |

**`READ_SERVO_REGISTER`** (`0x0B`, requête) — 3 octets :

| Champ | Type | Notes |
| :--- | :--- | :--- |
| `servo_id` | `uint8` | Servo cible |
| `register` | `uint8` | Adresse dans la table de contrôle |
| `size` | `uint8` | `1` ou `2` |

**`SERVO_REG_VALUE`** (`0x84`, réponse) — `size` octets : un simple `uint8`, ou un `uint16`
little-endian.

## Protocole du bus servo

`PING_SERVO`, `SET_SERVO_ID`, `WRITE_SERVO_REGISTER` et `READ_SERVO_REGISTER` ne s'arrêtent
pas au STM32 — il les réencode en trames du protocole **Feetech STS3215** et les relaie sur
le bus servo RS485 half-duplex (USART2, 1 Mbps — voir les
[spécifications des actionneurs]({{</* relref "chromapi/specifications/actuators/" */>}})). Ce protocole utilise un
format de trame et une somme de contrôle différents de ceux du bridge décrit plus haut :

```text
[ 0xFF ][ 0xFF ][ ID ][ LONGUEUR ][ INSTRUCTION ][ PARAMS... ][ CHECKSUM ]
```

* **ID** — l'adresse du servo cible (`0x00`–`0xFD`), ou `0xFE` pour diffuser à tous les
  servos du bus (une trame diffusée ne reçoit aucune réponse).
* **LONGUEUR** — `N + 2`, où `N` est le nombre de paramètres (instruction et checksum
  inclus).
* **CHECKSUM** — `~(ID + LONGUEUR + INSTRUCTION + PARAM_1 + ... + PARAM_N) & 0xFF`, soit le
  complément à un de l'octet de poids faible de la somme.
* Sur le STS3215, les valeurs de registre multi-octets sont transmises **octet faible
  d'abord** (c'est un servo à encodage magnétique, pas à potentiomètre — les deux familles
  ne s'accordent pas sur l'ordre des octets).

Le bridge de Chromapi ne relaie que trois des instructions prises en charge par les servos
Feetech :

| Code | Instruction | Utilisée par |
| :--- | :--- | :--- |
| `0x01` | `PING` | `PING_SERVO` |
| `0x02` | `READ DATA` | `READ_SERVO_REGISTER` |
| `0x03` | `WRITE DATA` | `WRITE_SERVO_REGISTER`, `SET_SERVO_ID` |

Le jeu d'instructions Feetech complet comprend aussi `REG WRITE` + `ACTION` (écritures
bufferisées et synchronisées), `SYNC READ` / `SYNC WRITE` (une trame adressant plusieurs
servos à la fois) et `RESET` — aucune n'est actuellement exposée par le bridge.

**Aller-retour complet** — `READ_SERVO_REGISTER(servo_id=1, register=0x38, size=2)`, qui lit
la position courante du servo 1 :

| Saut | Trame | Signification |
| :--- | :--- | :--- |
| RPi → STM32 | `55 AA 04 0B 01 38 02 34` | `READ_SERVO_REGISTER(id=1, reg=0x38, size=2)` |
| STM32 → Servo 1 | `FF FF 01 04 02 38 02 BE` | `READ DATA` Feetech, registre `0x38`, 2 octets |
| Servo 1 → STM32 | `FF FF 01 04 00 18 05 DD` | `ERROR=0`, position `0x0518` (1304) |
| STM32 → RPi | `55 AA 03 84 18 05 9A` | `SERVO_REG_VALUE` = 1304 |

`WRITE DATA` suit le même schéma. Changer l'ID du servo 1 en 2 — adresse `0x05` dans la
table de contrôle, un octet — s'envoie directement au servo 1 (jamais en diffusion pour un
changement d'ID, sinon tous les servos partageant le bus adopteraient le même nouvel ID) :

```text
FF FF 01 04 03 05 02 F0
```
</script>
