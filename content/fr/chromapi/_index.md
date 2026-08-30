---
title: "Chromapi"
description: "Un robot quadrupède open-source, construit de zéro."
summary: "Chromapi est un robot quadrupède open-source : PCB personnalisé, firmware STM32, structure imprimée en 3D, locomotion et, à terme, vision et apprentissage par renforcement."
date: 2026-08-29
lastmod: 2026-08-29
draft: false
toc: true
icon: "robot"
weight: 20

seo:
   title: ""
   description: "Chromapi est un robot quadrupède open-source : PCB, firmware STM32, structure imprimée en 3D, locomotion et, à terme, vision et RL."
   canonical: "https://mowibox.github.io/chroma/fr/chromapi/"
   noindex: false
   robots: "index, follow"
---

<p align="center">
    <img src="/chroma/images/chromapi/chromapi_logo.png" alt="Logo Chromapi" width="300" class="chromapi-logo" />
</p>

**Chromapi** est un robot quadrupède que je conçois, construis et documente de zéro, en allant de la conception électronique au développement logiciel, en passant par la modélisation 3D et l'intelligence artificielle. Je l'ai pensé comme une plateforme de recherche qui permet d'explorer les concepts fondamentaux en robotique, comme la locomotion, l'apprentissage par renforcement et l'interaction homme-machine.

<p align="center">
    <img src="/chroma/gifs/chromapi.gif" alt="Chromapi Dance" />
</p>

Tout ce qui est présenté ici est voulu **open source**: l’idée est de partager ce que j’apprends et construis au fil du développement de Chromapi, afin que chacun puisse s’en inspirer, expérimenter avec, ou aller plus loin. La seule limite est votre imagination (et peut-être le hardware) !

## Par où commencer?

| Je veux... | Aller à |
| :--- | :--- |
| Savoir ce qu'il y a dedans (MCU, servos, capteurs, alimentation) | [Spécifications]({{< relref "chromapi/specifications/" >}}) |
| Me procurer les pièces pour en construire un | [Listes de matériel]({{< relref "chromapi/bom/" >}}) |
| Flasher le firmware, envoyer des commandes, comprendre le protocole | [Documentation]({{< relref "chromapi/documentation/" >}}) |
| Comprendre *pourquoi* Chromapi est construit ainsi | [Notes de conception]({{< relref "chromapi/design/" >}}) |

## Les différents repos associés au projet

<div class="space-y-6" style="text-align: left;">
  <article class="cardbox rounded-lg overflow-hidden">
    <a href="https://github.com/Mowibox/chromapi" class="block" target="_blank" rel="noopener">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-2" style="display:flex; align-items:center;">
          <h2 class="text-xl font-semibold m-0 p-0">chromapi</h2>
        </div>
        <p class="text-gray-400 text-sm">Code source principal du robot quadrupède : contrôle, locomotion et outils logiciels.</p>
      </div>
    </a>
  </article>
  <article class="cardbox rounded-lg overflow-hidden">
    <a href="https://github.com/Mowibox/chromapi_motherboard" class="block" target="_blank" rel="noopener">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-2" style="display:flex; align-items:center;">
          <h2 class="text-xl font-semibold m-0 p-0">chromapi_motherboard</h2>
        </div>
        <p class="text-gray-400 text-sm">Conception électronique et firmware de la carte mère de Chromapi.</p>
      </div>
    </a>
  </article>
</div>

## Feuille de route

La feuille de route permet de présenter la progression actuelle des étapes de conception de Chromapi ainsi que les étapes futures à venir.

<div class="chromapi-roadmap">
<div class="timeline">
  <div class="container left">
    <div class="content">
      <h2>⚡ Électronique</h2>
      <p>La conception du PCB, schémas électroniques, et l'intégration des composants.</p>
      <p class="status status-done">🟢 Terminé</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>💻 Firmware</h2>
      <p>Firmware embarqué en C, communication avec le Raspberry Pi et contrôle des actionneurs.</p>
      <p class="status status-done">🟢 Terminé</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>📐 Modélisation 3D &amp; CAO</h2>
      <p>Modèles 3D du robot, conception des pièces et fichiers de fabrication.</p>
      <p class="status status-done">🟠 V1 terminée, V2 en cours</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>🦿 Locomotion</h2>
      <p>Contrôle du mouvement, génération des trajectoires et maintien de l'équilibre.</p>
      <p class="status status-progress">🟠 En cours</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>🧠 Apprentissage par renforcement</h2>
      <p>Environnement d'expérimentation pour l'entraînement de politiques.</p>
      <p class="status status-planned">🔵 Prévu</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>👁️ Vision</h2>
      <p>Perception de l'environnement par caméra, vision par ordinateur et deep learning.</p>
      <p class="status status-planned">🔵 Prévu</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>🎙️ Traitement audio</h2>
      <p>Perception et traitement des signaux audio.</p>
      <p class="status status-planned">🔵 Prévu</p>
    </div>
  </div>
  <div class="container right">
    <div class="content">
      <h2>🤖 Tout en un</h2>
      <p>Création d'un modèle pour interagir avec l'homme et son environnement.</p>
      <p class="status status-planned">🔵 Prévu</p>
    </div>
  </div>
  <div class="container left">
    <div class="content">
      <h2>🏖️ Vacances</h2>
      <p>J'aimerais bien...</p>
      <p class="status status-none">🔴 Non prévu</p>
    </div>
  </div>
</div>
</div>

<style>
.chromapi-roadmap {
  margin: 2rem 0;
}
.chromapi-roadmap .timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}
.chromapi-roadmap .timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: var(--bs-border-color);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -2px;
}
.chromapi-roadmap .container {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  max-width: none;
  margin: 0;
}
.chromapi-roadmap .container::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  right: -11px;
  background-color: var(--bs-primary);
  border: 4px solid var(--bs-body-bg);
  top: 18px;
  border-radius: 50%;
  z-index: 1;
}
.chromapi-roadmap .left {
  left: 0;
}
.chromapi-roadmap .right {
  left: 50%;
}
.chromapi-roadmap .right::after {
  left: -11px;
}
.chromapi-roadmap .left::before {
  content: ' ';
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid var(--bs-tertiary-bg);
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent var(--bs-tertiary-bg);
}
.chromapi-roadmap .right::before {
  content: ' ';
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid var(--bs-tertiary-bg);
  border-width: 10px 10px 10px 0;
  border-color: transparent var(--bs-tertiary-bg) transparent transparent;
}
.chromapi-roadmap .content {
  padding: 0.9rem 1.25rem;
  background-color: var(--bs-tertiary-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 0.5rem;
  position: relative;
  text-align: left;
}
.chromapi-roadmap .content h2 {
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}
.chromapi-roadmap .content p {
  margin-bottom: 0.4rem;
}
.chromapi-roadmap .content p:last-child {
  margin-bottom: 0;
}
.chromapi-roadmap .status {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.85;
}
@media screen and (max-width: 767px) {
  .chromapi-roadmap .timeline::after {
    left: 20px;
  }
  .chromapi-roadmap .container {
    width: 100%;
    padding-left: 50px;
    padding-right: 15px;
  }
  .chromapi-roadmap .container::after {
    left: 9px;
  }
  .chromapi-roadmap .right::after {
    left: 9px;
  }
  .chromapi-roadmap .left::before,
  .chromapi-roadmap .right::before {
    left: 8px;
    right: auto;
    border-width: 10px 10px 10px 0;
    border-color: transparent var(--bs-tertiary-bg) transparent transparent;
  }
  .chromapi-roadmap .right {
    left: 0%;
  }
}
</style>

## Rejoignez la communauté !

Les questions, retours et contributions seront toujours la bienvenue ! N'hésitez pas à ouvrir
une [issue](https://github.com/Mowibox/chromapi/issues) sur l'un des repository, ou à venir
en discuter directement sur le [Discord](https://discord.gg/SUQTs6QV3M) de Chroma.

<p align="center">
    <img src="/chroma/images/chroma_discord.png" alt="Chroma Discord" />
</p>
