---
title: "Tutoriel d'utilisation de l'ADC"
summary: Avec le logiciel STM32 Cube IDE
weight: 2004
icon: "wave-square"
---

<p align="center">
    <img src="/chroma/images/adc1.png" alt="ADC" class="w-full h-auto" />
</p>

Dans ce tutoriel, vous apprendrez à utiliser l'ADC sur STM32 Cube IDE.

## Prérequis

* Le logiciel [STM32 Cube IDE](https://www.st.com/en/development-tools/stm32cubeide.html)
* [Une carte de développement STM32](https://www.st.com/en/evaluation-tools/stm32-nucleo-boards.html)
* [Deux câbles de prototypage](/chroma/images/_cables.png)

## ADC ? C'est comme le groupe AC/DC ?

Le Convertisseur Analogique Numérique (CAN) ou en anglais Analog Digital Converter (ADC), est un système qui, comme son nom l'indique, permet de convertir un signal analogique en signal numérique. Le processus inverse s'effectue avec un Convertisseur Numérique Analogique (CNA, en anglais DAC). On peut ainsi transformer des tensions dans un format que le microcontrôleur pourra traiter et analyser. C'est avec ce principe, par exemple, que vous pouvez lire les valeurs d'un potentiomètre, d'un micro, d'un capteur de luminosité... Si vous voulez davantage explorer le fonctionnement de cette technologie, je vous invite à jeter un coup d'œil à cette [page web](https://dewesoft.com/fr/blog/c-quoi-convertisseur-can) qui explique les convertisseurs A/N plus en profondeur (et non, je ne suis pas sponsorisé !).

## Étapes de fonctionnement

<p align="center">
    <img src="/chroma/images/adc2.png" alt="Analog/Digital signal" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Signal rouge : Signal Analogique, Signal Bleu : Signal Numérique</em>
</p>

1. **Échantillonnage :** Le signal analogique est prélevé à des intervalles de temps réguliers (fréquence d'échantillonnage).
2. **Quantification :** Chaque échantillon récupéré est quantifié, c'est-à-dire qu'il est approximé à la valeur discrète la plus proche dans sa plage de valeurs binaires possibles.
3. **Codage :** Les valeurs quantifiées sont ensuite codées en une séquence de bits. La résolution du CAN, exprimée en bits, détermine le nombre de niveaux de quantification possibles. Si on note {{< math >}}$n${{< /math >}} le nombre de bits du CAN, alors on peut déterminer le nombre de niveaux de quantification avec la formule suivante :

{{< math class=text-center >}}
$$
\text{resolution} = 2^n
$$
{{< /math >}}

Par exemple, sur la carte STM32 que je vais utiliser pour ce tutoriel (la [NUCLEO H7A3ZI-Q](https://www.st.com/en/evaluation-tools/nucleo-h7a3zi-q.html)), il s'agit d'un CAN de 12 bits : il peut représenter {{< math >}}$2^{12} = 4096${{< /math >}} niveaux différents (de 0 à 4095).

## Configuration

Sur une carte de développement comme celle utilisée ici, ce sont généralement les broches de A0 à A5 qui disposent un ADC (mais ça ne coûte rien de jeter un œil à la datasheet !). Nous allons réaliser un test simple qui va nous permettre de vérifier les niveaux minimal et maximal de l'ADC.

Pour ce faire, je vais relier l'une des broches analogiques au +5V (ici A0) et une autre au GND (ici A1) :

<p align="center">
    <img src="/chroma/images/adc3.png" alt="Wiring" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Montage</em>
</p>

La suite des aventures se passe sur CubeIDE :

* Créez un nouveau projet et ouvrez CubeMX (fenêtre .ioc).
* Identifiez à quelles broches correspondent A0 et A1. Vous pouvez trouver les analogies entre les broches "Ax" ↔ "PAx" en cherchant en ligne la [configuration des broches](https://os.mbed.com/platforms/ST-Nucleo-H7A3ZI-Q/#board-pinout) de la carte que vous utilisez. Dans mon cas j'y trouve que A0 ↔ PA3 et A1 ↔ PC0.
* Configurez ensuite la broche avec un ADC (de la forme "ADCx_INPx"). Voici les configurations que j'ai sélectionnées :

* PA3 : ADC1_INP15
* PC0 : ADC2_INP10

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Notez que pour une broche, plusieurs ADC sont parfois disponibles. J'aurais pu inverser l'ADC1 et l'ADC2 de broches si j'avais envie, ou même utiliser l'ADC3. Mais dans mon exemple, il ne faut surtout pas configurer 2 fois le même ADC sur les 2 broches !
{{< /callout >}}

Dans l'onglet "ADC" sur la gauche, sélectionnez ADC1 et définissez les paramètres suivants :

<p align="center">
    <img src="/chroma/images/adc4.png" alt="Configuration" class="w-full h-auto" />
    </br>
</p>

* Cocher IN15 Single-ended
* Résolution paramétrée sur ADC 12-bit resolution

{{< callout context="caution" title="Astuce" icon="outline/bulb" >}}
Si vous obtenez des erreurs de fréquences, il faudra que vous basculiez dans l'onglet "Clock configuration" pour régler les erreurs en jouant avec les valeurs de DIVM2, DIVN2 et DIVP2.
{{< /callout >}}

Faites de même pour ADC2.

## Programmation

Voici un moyen de programmer l'ADC1 dans un fichier .c :

_Note: Cela va de soi que la programmation pour l'ADC2 ou tout autre ADC disponible se fera de manière similaire._

Pour démarrer la conversion ADC, ajoutez les 2 lignes ci-dessous dans votre fichier `main.c` (qui est dans le dossier "Core/Src") :

Dans la section des variables privées :

```c {title="main.c", lineNos=true lineNoStart=43, hl_lines=[6]}
/* Private variables ---------------------------------------------------------*/

UART_HandleTypeDef huart2;

/* USER CODE BEGIN PV */
int value_a0;
/* USER CODE END PV */
```

Dans la fonction `int main(void){}` :

```c {title="main.c", lineNos=true lineNoStart=65, hl_lines=[4]}
int main(void)
{
  /* USER CODE BEGIN 1 */
  HAL_ADC_Start(&hadc1);
  /* USER CODE END 1 */
```

`HAL_ADC_Start(&hadc1);` vous permettra d'activer la conversion pour l'ADC1, tandis que l'entier défini par `int value_a0` vous servira à stocker les valeurs lues sur la broche 10.

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Écrivez bien votre code entre les balises "/\* USER CODE BEGIN \*/" et "/\* USER CODE END \*/". Sinon votre code sera effacé à la compilation du code !
{{< /callout >}}

Dans une boucle (Par exemple la boucle `while(1){}` dejà présente dans le fichier), on pourra ajouter les deux lignes suivantes :

* `HAL_ADC_PollForConversion(&hadc, 1);`, cela nous permettra d'attendre la fin de la conversion ADC.
* `value_a0 = HAL_ADC_GetValue(&hadc1);`, c'est la fonction qui nous permettra de récupérer la valeur de l'ADC après conversion, cette dernière étant stockée dans la variable entière `value_a0`.

``` c {title="main.c", lineNos=true lineNoStart=99, hl_lines=[5,6]}
/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
  HAL_ADC_PollForConversion(&hadc, 1);
  value_a0 = HAL_ADC_GetValue(&hadc1);
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
}
```

Après compilation du code et téléversement du code sur la carte, si j'affiche les valeurs des broches A0 (stockées dans `value_a0`) et A1 (stockées par exemple dans `value_a1`) avec la méthode décrite ci-dessus, j'obtiendrai `value_a0 = 4095` et `value_a1 = 0`, ce qui est cohérent avec la résolution choisie. En poussant le code un peu plus loin, il est aussi possible d'envoyer ces valeurs à un traceur série pour afficher les valeurs :

<p align="center">
    <img src="/chroma/images/adc5.png" alt="Serial plotter" class="w-full h-auto" />
    </br>
    <em style="font-size: 0.95em;">Signal bleu : A0, Signal orange : A1</em>
</p>

Pour aller plus loin, vous pouvez essayer de brancher d'autres composants à ces broches, comme c'est présenté avec un potentiomètre dans [l'initiation à la programmation embarquée.]({{< relref "tutorials/electronics/introduction_to_embedded_prog/">}})

## Interpréter des valeurs connues avec la sensitivité

Si vous souhaitez récupérer des valeurs de l'ADC humainement compréhensibles plutôt qu'en LSB [(Least Significant Bit)](https://fr.wikipedia.org/wiki/Bit_de_poids_faible#Signal_num%C3%A9ris%C3%A9), vous devrez connaître la sensitivité de votre ADC. dont la formule est :

{{< math class=text-center >}}
$$
\text{sensitivity} = \frac{\text{range}}{(2^{\text{resolution}}-1)}
$$
{{< /math >}}

Avec :

* range : La plage de vos valeurs en volts
* resolution : La résolution de votre ADC en bits

Dans mon cas, mes valeurs de tensions vont de 0 à 5V pour un ADC de 12 bits, donc range = 5 et resolution = 12, ce qui donne :

{{< math class=text-center >}}
$$
\text{sensitivity} = \frac{\text{5}}{(2^{12}-1)} = 0,0012210012 \space V.LSB^{-1}
$$
{{< /math >}}

Il vous suffit, ensuite, de multiplier la sensitivité à votre valeur de sortie de l'ADC pour la tension correspondante.

* Pour 0 LSB : {{< math >}}$0\times sensitivity = 0 \space V${{< /math >}}
* Pour 4095 LSB : {{< math >}}$4095\times sensitivity = 5 \space V${{< /math >}}
* Pour 1024 LSB : {{< math >}}$1024\times sensitivity = 1,25 \space V${{< /math >}}

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://github.com/Mowibox)
* **Dernière mise à jour :** Juin 2025
* **Relecteur :** [Gauthier BIEHLER](https://github.com/Minorzar), Loubna LATRECHE
