---
title: "Tutoriel de génération de signaux PWM"
summary: Avec le logiciel STM32 Cube IDE
weight: 2005
icon: "wave-square"
---

<p align="center">
    <img src="/chroma/images/pwm1.png" alt="PWM tutorial" class="w-full h-auto" />
</p>

Dans ce tutoriel, vous apprendrez à générer un signal PWM sur STM32 Cube IDE, afin de faire tourner un servomoteur.

## Prérequis

* Le logiciel [STM32 Cube IDE](https://www.st.com/en/development-tools/stm32cubeide.html)
* [Une carte de développement STM32](https://www.st.com/en/evaluation-tools/stm32-nucleo-boards.html)
* [Des câbles de prototypage](/chroma/images/_cables.png)
* Un servomoteur

## Un signal PWM : Qu'est ce que c'est ?

La Modulation à Largeur d'Impulsion (MLI) ou en anglais Pulse Width Modulation (PWM) est une technique de modulation utilisée pour contrôler la puissance délivrée à un dispositif électrique.

Dans la plupart des systèmes numériques, il n'existe que deux niveaux de tension : un état haut (1) et un état bas (0). Il n'y a donc pas de niveaux intermédiaires permettant de faire varier la tension (comme 0,5). Pour pallier à cela, l'idée du PWM consiste à faire varier la durée pendant laquelle le signal est à l'état haut, tout en maintenant la fréquence constante.

<p align="center">
    <img src="/chroma/images/pwm2.png" alt="Duty cycle" class="w-full h-auto" />
</p>

Sur une période donnée, la proportion de temps passée à l'état haut est appelée le rapport cyclique (souvent noté {{< math >}}$\alpha${{< /math >}}). En modifiant ce rapport cyclique, on modifie la valeur moyenne de la tension appliquée au composant, ce qui nous permet de contrôler un composant avec une puissance variable.

C'est avec ce principe que beaucoup de composants sont commandés, comme par exemple, les LEDs RGB, les drivers de moteurs, etc.

Dans le contexte de manipulation d'un servomoteur, le signal PWM est utilisé pour définir la position angulaire du servomoteur. Ainsi, en ajustant la largeur de l'impulsion, on peut contrôler l'orientation du servomoteur.

## Montage et configuration

Pour illustrer ce tutoriel, je vais utiliser une carte [NUCLEO-L476RG](https://www.st.com/en/evaluation-tools/nucleo-l476rg.html). Les branchements pour faire fonctionner un servomoteur sont les suivants :

<p align="center">
    <img src="/chroma/images/pwm4.png" alt="Wiring" class="w-full h-auto" />
</p>

* Deux câbles respectivement connectés au +5V et au GND du servomoteur (généralement, rouge pour l'alimentation et marron ou noir pour la masse).
* Le troisième câble doit être connecté sur une des broches de la carte pouvant délivrer un signal PWM (c'est indiqué sur la plupart des broches). Dans mon cas, je branche ce câble sur la broche D5.

La suite se passe sur CubeIDE : Créez un nouveau projet et ouvrez CubeMX (pour avoir la fenêtre avec le .ioc).

Identifiez à quelle broche correspond D5. Les analogies entre les broches "Dx" et "PAx" peuvent être déterminées en cherchant en ligne la [configuration des broches](https://os.mbed.com/platforms/ST-Nucleo-L476RG/#pins-legend) de la NUCLEO L476RG. Dans mon cas, j'y trouve que D5 ↔ PB4.

Configurez ensuite la broche avec un timer et son channel disponible (de la forme "TIMx_CHx"). Pour la NUCLEO L476RG, la seule configuration disponible sur D5 est TIM3_CH1.

<p align="center">
    <img src="/chroma/images/pwm5.png" alt="PWM pin assignment" class="w-full h-auto" />
</p>

Dans l'onglet à gauche, définissez les paramètres suivants :

* Dans la section **"System Core"**, sélectionnez **RCC**.
  * Définissez **High Speed Clock (HSE)** sur **Crystal/Ceramic Resonator**.
  <p align="center">
    <img src="/chroma/images/pwm6.png" alt="System core" class="w-full h-auto" />
  </p>

* Dans la section **"Timers"**, sélectionnez le timer que vous avez configuré.
  * Définissez **Clock Source** sur **Internal Clock**.
  * Définissez le channel que vous avez choisi sur **PWM Generation CHx** (ici PWM Generation CH1).
  <p align="center">
    <img src="/chroma/images/pwm7.png" alt="Timer configuration" class="w-full h-auto" />
  </p>

## Paramètres fréquentiels

En se rendant dans l'onglet supérieur "Clock configuration", il est possible de voir les différentes fréquences auxquelles fonctionnent les timers du microcontrôleur, en l'occurence 80 MHz pour la NUCLEO L476RG.

<p align="center">
    <img src="/chroma/images/pwm8.png" alt="Clock configuration" class="w-full h-auto" />
</p>

Or, en se basant sur la [documentation d'un servomoteur standard](http://www.ee.ic.ac.uk/pcheung/teaching/DE1_EE/stores/sg90_datasheet.pdf), la fréquence du signal doit être d'environ 50 Hz. À priori, je suis bien loin des 50 Hz que je suis censé atteindre, pour que le servomoteur tourne sans accros ! Mais comme la vie est bien faite, il est possible de diviser la fréquence d'un timer afin d'atteindre la fréquence voulue.

Pour ce faire la formule suivante est utilisée :

{{< math class=text-center >}}
$$
f_{TIM} = \frac{f_{APB}}{(PSC+1)(ARR+1)}
$$
{{< /math >}}

où :

* {{< math >}}$f_{TIM}${{< /math >}} correspond à la fréquence du timer.
* {{< math >}}$f_{APB}${{< /math >}} correspond à la fréquence du bus alimentant le timer (ici 80 MHz).
* {{< math >}}$PSC${{< /math >}} (prescaler) est un registre qui divise la fréquence d'entrée du timer.
* {{< math >}}$ARR${{< /math >}} (auto-reload register) est un registre définissant la valeur maximale du compteur.

Comme {{< math >}}$f_{APB}${{< /math >}} est connu, il suffit donc de trouver une combinaison de PSC et ARR qui donne {{< math >}}$f_{TIM} = 50 Hz${{< /math >}}. Le calcul peut se faire à la main ou via des [calculateurs](https://deepbluembedded.com/stm32-timer-calculator/) déjà préfaits en ligne.

Dans mon cas, j'obtiens une combinaison convenable avec {{< math >}}$PSC = 159${{< /math >}} et {{< math >}}$ARR = 9999${{< /math >}}.

{{< callout context="tip" title="Le saviez-vous ?" icon="outline/message-dots" >}}
Plusieurs combinaisons peuvent fonctionner pour atteindre une fréquence de 50 Hz. Retenez que plus la valeur de {{< math >}}$ARR${{< /math >}} est elevée, plus la résolution du signal PWM sera élevée.
{{< /callout >}}

Une fois les valeurs de {{< math >}}$PSC${{< /math >}} et {{< math >}}$ARR${{< /math >}} déterminées, retournez dans les paramètres de TIM3 pour y intégrer leurs valeurs dans la section "Parameter Settings" :

<p align="center">
    <img src="/chroma/images/pwm9.png" alt="PSC & ARR assignment" class="w-full h-auto" />
</p>

## Le rapport cyclique

## Intégration dans le code

Avant de faire tourner le servomoteur, il faut écrire quelques lignes de codes dans le fichier `main.c`. Dans la fonction `int main(void){}`, ajoutez la ligne ci-dessous :

``` c {title="main.c", lineNos=true lineNoStart=94, hl_lines=[4]}
MX_USART2_UART_Init();
MX_TIM3_Init();
/* USER CODE BEGIN 2 */
HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
/* USER CODE END 2 */

/* Infinite loop */
```

`HAL_TIM_PWM_Start(&htimX, TIM_CHANNEL_X);` permet de démarrer le signal PWM (en remplaçant les "X" par les valeurs de timer et de channel utilisées).

{{< callout context="danger" title="Attention" icon="outline/alert-square-rounded" >}}
Écrivez bien votre code entre les balises "/\* USER CODE BEGIN \*/" et "/\* USER CODE END \*/". Sinon votre code sera effacé si vous regénérez vos fichiers !
{{< /callout >}}

Si vous compilez et téléversez le code sur la carte, vous remarqurez que le servomoteur... ne tourne pas ! Car le servomoteur est maintenu à la position qui a été définie avec le rapport cyclique, il faudrait donc le faire varier pour espérer le voir tourner.

{{< details "Bonus" >}}
Si vous possédez un oscilloscope, vous pouvez quand même observer le signal PWM dessus :

<p align="center">
    <img src="/chroma/images/pwm11.png" alt="Oscilloscope display" class="w-full h-auto" />
</p>

Grâce aux carreaux de l'affichage, on remarque bien que la période du signal est de 20 ms (soit, 50 Hz). Le rapport cyclique est de {{< math >}}$\frac{1}{2}${{< /math >}}.
{{< /details >}}

## Modification du rapport cyclique

Plutôt que de se faire du mal à modifier la valeur du registre Pulse à la main en modifiant le .ioc, il est possible de directement modifier dynamiquement dans le code la largeur de l'impulsion.

La fonction `_HAL_TIM_SET_COMPARE()`

Voilà un test dans la boucle `while(1){}` qui change la position angulaire du servomoteur toutes les secondes :

---

## Crédits

* **Rédacteur :** [Ousmane THIONGANE](https://mowibox.github.io/)
* **Dernière mise à jour :** Décembre 2025
* **Relecteurs :**
