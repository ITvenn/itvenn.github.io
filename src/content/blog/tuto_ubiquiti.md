---
title: "Installation d'un contrôleur UniFi sur NAS Synology avec DOCKER"
description: " Mise en œuvre d'un contrôleur Wi-Fi UniFi sur un NAS Synologie avec Docker / Container Manager"
pubDate: "Sep 03 2025"
image: /image/tuto_ubiquiti/miniature.png
categories:
  - Documentation
tags:
  - Docker
  - Synology
  - Unifi
  - Ubiquiti
  - Wi-Fi
badge: Pin
---

**Installation contrôleur Wi-Fi UniFi sur NAS Synologie avec l'utilisation de DOCKER**

**Auteur : HAMEL VINCENT**

# Table des matières

- [Introduction](#introduction)
- [Installation Docker](#installation-docker)
- [Installation de l'image UniFi Contrôleur](#installation-de-limage-unifi-contrôleur)
- [Installation du Conteneur UniFi Controller](#installation-du-conteneur-unifi-controller)
- [Configuration du Contrôleur Wi-Fi](#configuration-du-contrôleur-wi-fi)
- [Migration borne Wi-Fi](#migration-borne-wi-fi)

# Introduction

Cette procédure détaille la mise en œuvre d'un contrôleur Wi-Fi UniFi sur un NAS Synologie en plusieurs étapes. Tout d'abord, l'installation de DOCKER sur le NAS synologie puis l'installation de l'image, la configuration du conteneur du contrôleur Wi-Fi et pour finir la configuration du contrôleur Wi-Fi et l'adoption des bornes.

# Installation DOCKER

Commencez par ouvrir le « Centre de paquets », accédez à « Tous les paquets », puis recherchez « Docker » afin d’installer le paquet Docker sur votre NAS.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image1.png)

# 

# Installation de l'image UniFI Contrôleur 

Pour installer l'image du contrôleur UniFi, ouvrez Docker puis accédez à l’onglet « Registre ». Dans la barre de recherche, tapez « unifi » et sélectionnez l’image « jacobalberty/unifi ». Double-cliquez sur cette image pour lancer le téléchargement et l’installation. Patientez jusqu’à la fin du téléchargement avant de passer à la création du conteneur.

![](/image/tuto_ubiquiti/Image2.png)

# Installation du Conteneur UniFi Controller 

Pour configurer le conteneur, ouvrez l’onglet « Image » dans Docker, puis double-cliquez sur « jacobalberty/unifi ». Une nouvelle fenêtre de création de conteneur s’ouvrira automatiquement. Vérifiez que vous sélectionnez la bonne image, puis cliquez sur « Suivant » pour passer à l’étape de configuration réseau et ressources.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image3.png)

Dans la nouvelle fenêtre de configuration réseau, sélectionnez l’option « Utiliser le même réseau que Docker Host ». Cette configuration permet au conteneur UniFi Controller d’accéder directement au réseau local du NAS, facilitant la découverte et la gestion des équipements UniFi. Cliquez ensuite sur « Suivant » pour poursuivre la configuration.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image4.png)

Ensuite, il est recommandé de limiter les ressources allouées au conteneur afin d’optimiser les performances du NAS et éviter toute surcharge. Pour cela, cochez l’option « Activer la limitation des ressources ». Dans le champ « Limite de la mémoire », saisissez 512 MB pour restreindre la quantité de mémoire utilisable par le conteneur UniFi Controller. Cette valeur est généralement suffisante pour une utilisation standard. Cliquez ensuite sur « Paramètres avancés » pour accéder aux options supplémentaires de configuration du conteneur.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image5.png)

Laissez de côté pour l’instant la nouvelle fenêtre de création du conteneur qui vient de s’ouvrir. Ouvrez « File Station » sur votre NAS Synology, puis accédez au dossier « docker ». À l’intérieur de ce dossier, créez un nouveau dossier nommé « unifi ». Dans ce dossier « unifi », créez deux sous-dossiers : « data » et « log ». Ces dossiers serviront respectivement à stocker les données du contrôleur UniFi et les fichiers de logs générés par le conteneur. Cette organisation permet de faciliter la gestion, la sauvegarde et la restauration des données du contrôleur UniFi.

Exemple de structure de dossiers :

```
docker/
└── unifi/
  ├── data/
  └── log/
```

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image6.png)

Revenez ensuite sur la fenêtre de création du conteneur laissée ouverte précédemment. Dans la section des variables d’environnement, modifiez les variables `DATADIR` et `LOGDIR` afin qu’elles pointent vers les dossiers que vous venez de créer dans « docker/unifi ». Par exemple :

- Pour `DATADIR`, indiquez le chemin du dossier « data » : `/unifi/data`
- Pour `LOGDIR`, indiquez le chemin du dossier « log » : `/unifi/log`

Cela permet au conteneur UniFi Controller de stocker ses données et ses journaux dans les emplacements appropriés sur votre NAS, facilitant ainsi la sauvegarde et la restauration. Vérifiez bien que les chemins correspondent à la structure de dossiers créée précédemment avant de poursuivre la configuration.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image7.png)

Ensuite, modifiez les variables d’environnement « BIND_PRIV » et « RUNAS_UID0 » en leur attribuant la valeur « false ». Cela permet d’exécuter le conteneur UniFi Controller sans privilèges élevés, renforçant ainsi la sécurité du système. Après avoir effectué ces modifications, cliquez sur « Sauvegarder » puis sur « Suivant » pour poursuivre la configuration du conteneur.

![](/image/tuto_ubiquiti/Image8.png)
![](/image/tuto_ubiquiti/Image9.png)
![](/image/tuto_ubiquiti/Image10.png)

Pour terminer la configuration, cliquez sur « Suivant » puis sur « Effectué ». Le conteneur UniFi Controller démarrera automatiquement. Patientez environ 1 à 2 minutes le temps que le service soit entièrement opérationnel.

Une fois le conteneur lancé, vous pouvez accéder à l’interface de gestion du contrôleur UniFi depuis un navigateur web en utilisant l’adresse IP de votre NAS Synology :

- Pour l’interface web sécurisée :  
  `https://<ip_nas>:8443`
- Pour l’interface non sécurisée :  
  `http://<ip_nas>:8080`

Remplacez `<ip_nas>` par l’adresse IP locale de votre NAS. Si l’interface ne s’affiche pas immédiatement, attendez quelques instants puis actualisez la page. Vous pourrez alors procéder à la configuration initiale du contrôleur UniFi.

# Configuration du Contrôleur Wi-Fi

Lors de la configuration initiale, attribuez un nom à votre contrôleur Wi-Fi selon la nomenclature utilisée dans votre organisation (par exemple, « Unifi-NAS-Synology » ou tout autre nom pertinent pour faciliter l’identification). Cliquez sur « NEXT » pour poursuivre la configuration.

![](/image/tuto_ubiquiti/Image11.png)

Ensuite, ignorez les champs à remplir et cliquez sur « Switch to Advanced Setup » pour passer la configuration en mode avancé. Cette option permet d’éviter la création ou l’utilisation d’un compte Ubiquiti. En mode avancé, vous pouvez configurer le contrôleur UniFi sans associer votre installation à un compte cloud Ubiquiti, tout en accédant à des paramètres supplémentaires adaptés aux infrastructures réseau complexes ou aux besoins spécifiques. Si vous souhaitez une installation locale et indépendante du cloud Ubiquiti, privilégiez ce mode.

![](/image/tuto_ubiquiti/Image12.png)

À cette étape, il vous suffit de saisir à nouveau le nom que vous souhaitez attribuer au contrôleur, comme indiqué précédemment.

![](/image/tuto_ubiquiti/Image13.png)

Ensuite, décochez les deux cases proposées afin de désactiver la création d’un compte Ubiquiti et la connexion à distance. Cela permet de garantir que votre contrôleur UniFi reste en mode local, sans dépendance à un compte externe. Créez ensuite votre utilisateur local en renseignant un nom d’utilisateur et un mot de passe, qui serviront à accéder à l’interface d’administration du contrôleur. Veillez à choisir un mot de passe robuste pour renforcer la sécurité de votre installation.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image14.png)

Laissez l’option « Enable auto backup » activée afin d’assurer la sauvegarde automatique de la configuration du contrôleur, puis cliquez sur « Next ».

![](/image/tuto_ubiquiti/Image15.png)

À cette étape, vous pouvez choisir d’ignorer la configuration immédiate des bornes Wi-Fi. Il n’est pas nécessaire d’adopter vos équipements UniFi dès maintenant, car cette opération pourra être réalisée ultérieurement depuis l’interface du contrôleur. Cela vous laisse le temps de finaliser la configuration générale avant d’intégrer vos bornes au nouveau contrôleur.

![](/image/tuto_ubiquiti/Image16.png)

À cette étape, vous pouvez définir le nom du réseau Wi-Fi (SSID) dans le champ « Wi-Fi Name » et choisir le mot de passe associé dans « Wi-Fi Password ». Il est recommandé d’utiliser un nom explicite pour le SSID afin de faciliter l’identification du réseau, ainsi qu’un mot de passe complexe pour renforcer la sécurité. Une fois ces informations renseignées, cliquez sur « Next » pour poursuivre la configuration, ou sur « Skip » si vous préférez configurer ces paramètres ultérieurement depuis l’interface du contrôleur UniFi.

![](/image/tuto_ubiquiti/Image17.png)

Pour finir, vous pouvez cliquer sur « Finish ».

![](/image/tuto_ubiquiti/Image18.png)

# Migration borne Wi-Fi

Tout d’abord, sur l’ancien contrôleur UniFi, accédez à la section « Équipements » et sélectionnez la borne Wi-Fi que vous souhaitez migrer. Cliquez ensuite sur « Gérer l’appareil » pour afficher les options de gestion.  
Dans cette interface, vous pourrez consulter les informations détaillées de la borne, vérifier son état et préparer sa migration. Cette étape est essentielle pour dissocier proprement la borne de l’ancien contrôleur avant de l’adopter sur le nouveau.  
Assurez-vous que la borne est bien connectée et en ligne afin d’éviter tout problème lors de la procédure de migration.

![](/image/tuto_ubiquiti/Image19.png)

Ensuite, faites défiler la page jusqu'à la section « Oublier cet appareil ». Cliquez sur le bouton « Oublier » pour dissocier la borne Wi-Fi de l'ancien contrôleur. Cette action déclenche automatiquement la réinitialisation de la borne, la ramenant à ses paramètres d'usine. Attendez quelques instants que la procédure soit terminée : la borne sera alors prête à être adoptée par le nouveau contrôleur UniFi. Assurez-vous que la borne reste alimentée et connectée au réseau pendant toute la durée de la réinitialisation.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image20.png)

Pour adopter vos bornes Wi-Fi sur le nouveau contrôleur, accédez à l’interface du contrôleur UniFi, puis rendez-vous dans la section « Équipements ». Après la réinitialisation effectuée précédemment, votre borne Wi-Fi devrait apparaître dans la liste des équipements disponibles avec le statut « À adopter ». Sélectionnez la borne, puis cliquez sur « Adopter l’appareil » (« Adopt device »). Le contrôleur va alors lancer la procédure d’adoption et mettre à jour automatiquement le firmware de la borne si nécessaire. Patientez quelques instants le temps que l’opération se termine : une fois l’adoption réussie, la borne sera pleinement gérée par le nouveau contrôleur UniFi et vous pourrez procéder à sa configuration selon vos besoins.

![](/image/tuto_ubiquiti/Image21.png)
