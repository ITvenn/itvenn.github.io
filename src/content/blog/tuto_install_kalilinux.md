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

Dans l’onglet **Memory**, vous pouvez définir la quantité de RAM à allouer à votre machine virtuelle.  
Ajustez cette valeur en fonction de l’usage prévu. Par exemple, pour effectuer des analyses de vulnérabilités avec des outils comme OpenVAS, il est recommandé d’allouer au minimum 8 Go de RAM.
![](/image/tuto_install_kali/10.png)

Dans cet onglet, vous allez configurer la mise en réseau de votre machine virtuelle :

1. **Bridge** : correspond à l’interface réseau à laquelle votre VM sera reliée.
2. **VLAN Tag** : permet d’associer un numéro de VLAN à la VM. Laissez cette valeur par défaut si aucun VLAN n’est configuré sur votre infrastructure.

**Recommandation :**  
En environnement de **production**, il est fortement conseillé d’éviter de laisser une VM Kali Linux accessible librement sur le réseau.  
Idéalement, placez-la sur un réseau isolé, ou éteignez-la (voire supprimez-la) après chaque utilisation.  
Vous pouvez également mettre en place un système de supervision afin d’être alerté en cas de démarrage ou de connexion inattendue de la VM.
![](/image/tuto_install_kali/11.png)

Vérifiez ensuite que toutes vos options sont correctement configurées dans le récapitulatif, puis cliquez sur **Finish**.
![](/image/tuto_install_kali/12.png)

Félicitations, vous venez de créer votre machine virtuelle Kali Linux.  

---

# Installation de l'OS

Nous pouvons maintenant commencer l’installation du système :

1. Cliquez sur la VM que vous venez de créer.
2. Ouvrez l’onglet **Console**.
3. Démarrez ensuite la machine virtuelle en cliquant sur **Start Now**.
![](/image/tuto_install_kali/13.png)

Vous pouvez ensuite choisir le type d’installation que vous souhaitez.  
Que vous sélectionniez le mode graphique ou non, cela n’aura aucune influence sur la présence de l’interface graphique une fois l’installation terminée.
![](/image/tuto_install_kali/14.png)

Choisissez la langue de votre système :  
![](/image/tuto_install_kali/15.png)

Sélectionnez ensuite votre situation géographique :  
![](/image/tuto_install_kali/16.png)

Choisissez le type de clavier correspondant à votre disposition :  
![](/image/tuto_install_kali/17.png)

Si votre infrastructure ne dispose pas de serveur DHCP, vous devrez configurer l’adresse réseau manuellement via l’interface graphique, comme indiqué ci‑dessous :
![](/image/tuto_install_kali/18.png)

Cliquez sur **Configurer vous‑même le réseau** :  
![](/image/tuto_install_kali/19.png)

Saisissez ensuite l’adresse IP de votre machine ainsi que son masque de sous‑réseau :  
![](/image/tuto_install_kali/20.png)

Renseignez ensuite la passerelle de votre réseau, généralement la gateway de votre box, de votre routeur ou de votre firewall :  
![](/image/tuto_install_kali/21.png)

Configurez enfin le serveur DNS.  
Vous pouvez utiliser, par exemple, **8.8.8.8** (Google) ou **1.1.1.1** (Cloudflare), ou bien votre propre serveur DNS :  
![](/image/tuto_install_kali/22.png)

Indiquez ensuite le nom de votre machine virtuelle :  
![](/image/tuto_install_kali/23.png)

Laissez le champ suivant vide ou renseignez le domaine de votre infrastructure si vous en utilisez un :  
![](/image/tuto_install_kali/24.png)

Créez ensuite l’utilisateur en commençant par saisir son **nom complet** :  
![](/image/tuto_install_kali/25.png)

Puis indiquez son **identifiant**, celui qui servira à la connexion :  
![](/image/tuto_install_kali/26.png)

Enfin, saisissez le mot de passe de l’utilisateur à deux reprises afin de le confirmer :  
![](/image/tuto_install_kali/27.png)

Pour la partie stockage, sélectionnez l’option **Assisté**, puis choisissez **Utiliser tout un disque avec LVM chiffré**.  
Cette option permet :

- de chiffrer entièrement votre disque, ce qui protège vos données en cas de vol ou d’accès non autorisé ;
- d’utiliser LVM, un système de gestion de volumes flexible permettant d’ajuster plus facilement la taille des partitions par la suite.

![](/image/tuto_install_kali/28.png)

Choisissez ensuite le disque virtuel de votre VM :  
![](/image/tuto_install_kali/29.png)

Sélectionnez ensuite le mode de partitionnement.  
Il est recommandé de séparer les répertoires **/home**, **/var** et **/tmp** afin d’améliorer la sécurité et la gestion de l’espace disque :

- `/home` : données des utilisateurs  
- `/var` : journaux, bases de données, fichiers temporaires d’applications  
- `/tmp` : fichiers temporaires du système et des programmes  
![](/image/tuto_install_kali/30.png)

Confirmez ensuite le partitionnement :  
![](/image/tuto_install_kali/31.png)

Sélectionnez ensuite les différents environnements et outils à installer.  
Si vous ne souhaitez **pas** d’interface graphique, décochez les options **Desktop environment** et **XFCE** :  
![](/image/tuto_install_kali/32.png)

Installez ensuite **GRUB**, indispensable pour pouvoir démarrer votre système :  
![](/image/tuto_install_kali/33.png)

Choisissez le disque sur lequel vous souhaitez installer GRUB :  
![](/image/tuto_install_kali/35.png)

Cliquez ensuite sur **Continue** pour redémarrer la VM et finaliser l’installation :  
![](/image/tuto_install_kali/34.png)

Une fois le système démarré, vous pouvez vous connecter avec les identifiants que vous avez créés :  
![](/image/tuto_install_kali/37.png)


