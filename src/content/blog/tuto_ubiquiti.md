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

**HAMEL VINCENT**

# **Table des matières** {#table-des-matières .TOC-Heading}

[Introduction [4](#introduction)](#introduction)

[Installation DOCKER [4](#installation-docker)](#installation-docker)

[Installation de l'image UniFI Contrôleur [5](#installation-de-limage-unifi-contrôleur)](#installation-de-limage-unifi-contrôleur)

[Installation du Conteneur UniFi Controller [6](#installation-du-conteneur-unifi-controller)](#installation-du-conteneur-unifi-controller)

[Configuration du Contrôleur Wi-Fi [9](#configuration-du-contrôleur-wi-fi)](#configuration-du-contrôleur-wi-fi)

[Migration borne Wi-Fi [12](#migration-borne-wi-fi)](#migration-borne-wi-fi)

# Introduction

Cette procédure détaille la mise en œuvre d'un contrôleur Wi-Fi UniFi
sur un NAS Synologie en plusieurs étapes. Tout d'abord, l'installation
de DOCKER sur le NAS synologie puis l'installation de l'image, la
configuration du conteneur du contrôleur Wi-Fi et pour finir la
configuration du contrôleur Wi-Fi et l'adoption des bornes.

# Installation DOCKER

Tout d'abord aller dans le « centre de paquets » et dans « « Tous les
paquets » et rechercher « docker » et vous pourrez installer l'image
Docker.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image1.png){width="6.3in" height="3.1381944444444443in"}

# 

# Installation de l'image UniFI Contrôleur 

Pour l'installation du conteneur lancer docker puis sélectionner
« Registre » et rechercher « unifi » et double-cliquer sur l'image
« jacobalberty/unifi » pour l'installer.

![](/image/tuto_ubiquiti/Image2.png){width="6.243055555555555in" height="3.5416666666666665in"}

# Installation du Conteneur UniFi Controller 

Pour la configuration du conteneur rendez-vous dans « Image » puis
double cliqué sur « jacobalberty/unifi » normalement une nouvelle
fenêtre apparaîtra.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image3.png){width="6.3in" height="1.9861111111111112in"}

Sur cette nouvelle fenêtre cliquée sur « Utiliser le même réseau que
Docker Host » et sur « Suivant »

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image4.png){width="4.430064523184602in" height="2.509002624671916in"}

Ensuite, vous pouvez limiter les ressources utilisées par le conteneur
pour l'occurrence ici on sélectionne 512 MB. Pour ce faire cocher
« Activer la limitation des ressources » et mettre la « Limite de la
mémoire » sur 512 MB puis cliquer sur « Paramètres avancés ». 

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image5.png){width="4.451071741032371in" height="2.538073053368329in"}

Laissée de coté pour l'instant la nouvelle fenêtre qui vient de s'ouvrir
et rendez-vous dans le « File Station » puis dans le dossier « docker »
dans ce dernier créer le dossier « unifi » et les sous-dossiers « data »
et « log » comme ci-dessous.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image6.png){width="6.3in" height="3.5875in"}

Revenez ensuite sur la fenêtre ouverte précédemment et changer la
variable DATADIR et LOGDIR pour les faire correspondre au fichier
précédemment créé.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image7.png){width="4.751153762029746in" height="4.020206692913386in"}

Puis changer les variables « BIND_PRIV » et « RUNAS_UID0 » avec la
valeur « false » et cliqué sur « Sauvegarder » et « Suivant ».

![](/image/tuto_ubiquiti/Image8.png){width="4.063867016622922in" height="3.4412062554680665in"}

![](/image/tuto_ubiquiti/Image9.png){width="3.0555555555555554in" height="2.78125in"}
![](/image/tuto_ubiquiti/Image10.png){width="3.111111111111111in" height="2.8354166666666667in"} 
Pour finir cliquer sur « Suivant » et « Effectué »

Le conteneur se lancera automatiquement et vous pourrez vous connecter
après 1 ou 2 min d'attente et vous pourrez accéder au contrôleur via
l'adresse suivant : de votre NAS\>:8080 ou bien de votre NAS\>:8443 .

# Configuration du Contrôleur Wi-Fi

Pour la partie configuration nommé le contrôleur Wi-Fi celons votre
nomenclature et cocher la case ci-dessous et cliquer sur « NEXT ».

![](/image/tuto_ubiquiti/Image11.png){width="6.3in" height="2.9625in"}

Ensuite ignorer les champs à remplir et passer la configuration en mode
avancé « Switch to Advanced Setup »  

![](/image/tuto_ubiquiti/Image12.png){width="5.539514435695538in" height="2.633591426071741in"}

Reproduisez ce qui vous est demandé à la première étape.

![](/image/tuto_ubiquiti/Image13.png){width="5.140391513560805in" height="2.5758606736657916in"}

Ensuite, Décocher les deux cases et créer votre utilisateur local.

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image14.png){width="6.3in" height="2.94375in"}

Ensuite cliquer sur « Next ».

![](/image/tuto_ubiquiti/Image15.png){width="5.677985564304462in" height="2.837115048118985in"}

Sur cette étape vous pouvez passer cette étape car vous pourrez adopter
vos bornes plus tard.

![](/image/tuto_ubiquiti/Image16.png){width="5.303448162729659in" height="2.6482163167104114in"}

Ici vous pouvez configurer le SSID dans « Wi-Fi Name » et son Password
dans « Wi-Fi Password » et cliquer sur « Next » ou « Skip » si vous
voulez le configurer plus tard.

![](/image/tuto_ubiquiti/Image17.png){width="6.3in" height="3.1319444444444446in"}

Pour finir, vous pouvez cliquer sur « Finish ».

![](/image/tuto_ubiquiti/Image18.png){width="6.3in" height="3.1430555555555557in"}

# Migration borne Wi-Fi

Tous d'abord sur l'ancien contrôleur wifi vous devrez vous rendre dans
la partie « Equipements » puis sélectionner la borne que vous souhaitez
migrer et se rendre dans « Gérer l'appareil » :

![](/image/tuto_ubiquiti/Image19.png){width="6.3in" height="3.0208333333333335in"}

Puis descendez pour arriver dans la partie « Oublier cet appareil » et
cliquer sur « oublier » pour faire oublier vos bornes elle se
réinitialiserons toute seul à la suite de cette manipulation :

![Une image contenant capture d'écran.](/image/tuto_ubiquiti/Image20.png){width="6.3in" height="3.0548611111111112in"}

Maintenant pour adopter vos borne sur le nouveau contrôleur wifi vous
devez vous rendre sur le nouveau contrôleur suite a la manipulation
précédente dans la partie « Equipements » vous devriez voir remonter
votre borne wifi cliquer dessus et cliquer sur « Adopt device » la borne
vas être adopter et mise à jour.

![](/image/tuto_ubiquiti/Image21.png){width="5.096755249343832in" height="1.5902777777777777in"}
