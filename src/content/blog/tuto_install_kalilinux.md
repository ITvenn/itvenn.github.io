---
title: "Installation d'une machine virtuelle Kali Linux sur Proxmox.[En cours]"
description: "Cette procédure décrit les étapes pour installer et configurer une machine virtuelle Kali Linux sur l’hyperviseur Proxmox, afin de disposer d’un environnement sécurisé pour les tests et expérimentations."
pubDate: "Sep 04 2025"
image: /image/tuto_install_kali/miniature.png
categories:
  - Documentation
tags:
  - Proxmox
  - Securité
  - Kalilinux
  - Linux
badge: Pin
---

**Installation d'une machine virtuelle Kali Linux sur Proxmox.**

**Auteur : HAMEL VINCENT**

# Table des matières

- [Introduction](#introduction)
- [Installation de la VM sur Proxmox](#installation-de-la-vm-sur-proxmox)


# Introduction

Proxmox est une solution de virtualisation puissante et flexible, permettant de gérer efficacement des machines virtuelles et des conteneurs. Kali Linux, quant à lui, est une distribution spécialisée dans les tests de sécurité et l’audit informatique. Installer Kali Linux sur Proxmox permet de créer un environnement isolé et sécurisé, idéal pour réaliser des expérimentations et des tests sans impacter le système principal. Ce guide présente les étapes nécessaires pour déployer correctement une machine virtuelle Kali Linux sur Proxmox.

Les textes ont été corrigés et reformulés à l’aide d’une intelligence artificielle 🤖✍️.

# Installation de la VM sur Proxmox
Tout d’abord, accédez au datastore de votre serveur Proxmox afin d’y téléverser l’image ISO de Kali Linux.
![](/image/tuto_install_kali/1.png)

Ensuite, après avoir cliqué sur **Download from URL**, vous devrez renseigner plusieurs options :

1. Indiquez le lien de téléchargement de l’ISO depuis le site officiel de Kali Linux.
2. Saisissez un nom pour l’image ISO.
3. Cliquez sur **Advanced** afin d’accéder aux options de sécurité.
4. Sélectionnez l’algorithme de hachage correspondant, tel qu’indiqué sur le site de Kali Linux.
5. Renseignez le **checksum** fourni par Kali Linux.

Ces options permettent de vérifier l’intégrité du fichier et de garantir que l’image ISO téléchargée est authentique et conforme.
![](/image/tuto_install_kali/2.png)
![](/image/tuto_install_kali/3.png)

Nous pouvons maintenant passer à l’étape de création de la machine virtuelle.  
Pour cela, effectuez un clic droit sur votre nœud Proxmox, puis sélectionnez **Create VM**.
![](/image/tuto_install_kali/4.png)

Vous pouvez ensuite configurer les paramètres comme suit :

1. Sélectionnez le nœud par défaut, c’est-à-dire celui sur lequel vous avez effectué le clic droit précédemment.
2. Choisissez l’ID de la VM, un numéro unique attribué à chaque machine virtuelle.
3. Indiquez le nom de votre VM.
4. Cliquez sur **Next** une fois ces informations correctement renseignées.
![](/image/tuto_install_kali/5.png)

À cette étape, nous allons sélectionner l’ISO — et donc le système d’exploitation — que nous souhaitons installer sur la machine virtuelle.  
Dans notre cas, il s’agira de l’image ISO de Kali Linux.

1. **Storage** : emplacement où est stocké votre image ISO.
2. **ISO Image** : sélectionnez l’image ISO que vous avez téléchargée précédemment.
3. Cliquez sur **Next** une fois ces informations correctement renseignées.
![](/image/tuto_install_kali/6.png)

À cette étape, vous pouvez laisser les paramètres par défaut ou sélectionner d’autres options selon vos préférences.
![](/image/tuto_install_kali/7.png)

À cette étape, nous allons configurer l’emplacement où seront stockées votre VM et ses données.

- **Storage** : sélectionnez l’emplacement de stockage destiné à accueillir la machine virtuelle.
- **Disk Size** : définissez l’espace disque à allouer. Il est recommandé de prévoir au minimum 20 Go pour conserver une certaine marge. Toutefois, selon votre utilisation, il peut être judicieux d’allouer davantage d’espace.  
  Par exemple, certaines listes de mots de passe utilisées pour des attaques par dictionnaire peuvent dépasser 20 Go.
![](/image/tuto_install_kali/8.png)

Vous pouvez maintenant configurer le processeur (CPU) de votre machine virtuelle. Plusieurs options sont disponibles :

1. **Sockets** : correspond au nombre de cœurs physiques de votre processeur.
2. **Cores** : correspond au nombre de cœurs virtuels attribués à la VM.
3. **Type** : permet de définir le modèle de CPU émulé.  
   En général, il est recommandé de choisir **host** pour offrir à la VM les meilleures performances en utilisant les capacités réelles du processeur de l’hôte.

**Conseil :** n’hésitez pas à allouer davantage de ressources si vous prévoyez d’utiliser une interface graphique. Une VM avec environnement graphique demandera plus de puissance CPU que dans l’exemple présenté.
![](/image/tuto_install_kali/9.png)


![](/image/tuto_install_kali/10.png)
![](/image/tuto_install_kali/11.png)
![](/image/tuto_install_kali/12.png)
![](/image/tuto_install_kali/13.png)
![](/image/tuto_install_kali/14.png)
![](/image/tuto_install_kali/15.png)
![](/image/tuto_install_kali/16.png)
![](/image/tuto_install_kali/17.png)
![](/image/tuto_install_kali/18.png)
![](/image/tuto_install_kali/19.png)
![](/image/tuto_install_kali/20.png)
![](/image/tuto_install_kali/21.png)
![](/image/tuto_install_kali/22.png)
![](/image/tuto_install_kali/23.png)
![](/image/tuto_install_kali/24.png)
![](/image/tuto_install_kali/25.png)
![](/image/tuto_install_kali/26.png)
![](/image/tuto_install_kali/27.png)
![](/image/tuto_install_kali/28.png)
![](/image/tuto_install_kali/29.png)
![](/image/tuto_install_kali/30.png)
![](/image/tuto_install_kali/31.png)

