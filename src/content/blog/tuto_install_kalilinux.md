---
title: "Installation d'une machine virtuelle Kali Linux sur Proxmox."
description: "Cette procédure décrit les étapes pour installer et configurer une machine virtuelle Kali Linux sur l’hyperviseur Proxmox, afin de disposer d’un environnement sécurisé pour les tests et expérimentations."
pubDate: "Sep 04 2025"
image: <img width="1536" height="1024" alt="2027a5cd-d096-4cb2-916c-c8c959d3b316" src="https://github.com/user-attachments/assets/709ba9f9-6039-4f02-bbd7-fec34e1ead80" />
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

<img width="816" height="351" alt="1" src="https://github.com/user-attachments/assets/4114c8a1-2e6c-4139-ae8f-acda5182349a" />
<img width="604" height="294" alt="2" src="https://github.com/user-attachments/assets/a35ceb5b-7b58-4f85-bef0-e1236f21d8ff" />
<img width="844" height="525" alt="3" src="https://github.com/user-attachments/assets/e6a6482f-8e6c-4a6c-aad7-681a0c2a0092" />
<img width="380" height="354" alt="4" src="https://github.com/user-attachments/assets/4ce514c8-b36b-4d6b-9720-18c96d435a99" />
<img width="724" height="540" alt="5" src="https://github.com/user-attachments/assets/a2b1c80c-4309-4b46-8576-bf55ea8bac14" />
<img width="721" height="538" alt="6" src="https://github.com/user-attachments/assets/7b5fca35-bcb6-4dc7-9d8e-4e0afa777150" />
<img width="723" height="540" alt="7" src="https://github.com/user-attachments/assets/d9cb91d3-e2f6-4319-833b-3e03abbfc40d" />
<img width="721" height="537" alt="8" src="https://github.com/user-attachments/assets/4480317c-ac64-4496-869e-d0c76bd92dff" />
<img width="721" height="544" alt="9" src="https://github.com/user-attachments/assets/d372150b-238b-432d-ae1c-e4f30a091aed" />
<img width="723" height="540" alt="10" src="https://github.com/user-attachments/assets/2eef930b-60c9-415f-885e-88bba0696425" />
<img width="722" height="538" alt="11" src="https://github.com/user-attachments/assets/578b2d56-9fd1-4b38-9dfa-dc342ca860d7" />
<img width="722" height="547" alt="12" src="https://github.com/user-attachments/assets/df1bcd94-e882-45ad-a914-401deda6c720" />
<img width="1378" height="554" alt="13" src="https://github.com/user-attachments/assets/49be76ec-b85e-4c82-a28b-417f79a2e488" />
<img width="892" height="674" alt="14" src="https://github.com/user-attachments/assets/16a42fe2-05cd-439f-8e62-6a7069bac755" />
<img width="1067" height="663" alt="15" src="https://github.com/user-attachments/assets/0f4dd860-490e-4ce1-9ab4-6f38ae16a5a9" />
<img width="1064" height="665" alt="16" src="https://github.com/user-attachments/assets/29661d9c-ed9d-4c9d-a85a-be462320828f" />
<img width="1063" height="664" alt="17" src="https://github.com/user-attachments/assets/42203be0-ef84-4418-9b0d-e9c6b19c9fff" />
<img width="1065" height="666" alt="18" src="https://github.com/user-attachments/assets/1f542a0e-54b6-4b0e-9091-0722b473f830" />
<img width="1063" height="662" alt="19" src="https://github.com/user-attachments/assets/b752c1e3-226e-40d7-898f-382d777a71f3" />
<img width="1061" height="664" alt="20" src="https://github.com/user-attachments/assets/69c5a856-74ee-44b0-87db-48a9ae29ea4e" />
<img width="1061" height="663" alt="21" src="https://github.com/user-attachments/assets/b1447021-7d44-42c7-a268-12e5e50d6aba" />
<img width="1064" height="663" alt="22" src="https://github.com/user-attachments/assets/7efffae0-0072-4506-b2b2-0652a50c6a9e" />
<img width="1064" height="663" alt="23" src="https://github.com/user-attachments/assets/cf65e3ce-974a-4069-b41c-8095f9e16f9e" />
<img width="1061" height="664" alt="24" src="https://github.com/user-attachments/assets/eee97bfc-632d-4a4b-9c02-76accb2083ea" />
<img width="1065" height="663" alt="25" src="https://github.com/user-attachments/assets/42204fd0-fcc3-484d-b8dd-539460c5b943" />
<img width="1063" height="662" alt="26" src="https://github.com/user-attachments/assets/7284f6f2-7193-47e4-a1e6-a6db5e6444ae" />
<img width="1059" height="660" alt="27" src="https://github.com/user-attachments/assets/2631ce2e-2780-46e1-8694-483d7a4b3ff7" />
<img width="1066" height="665" alt="28" src="https://github.com/user-attachments/assets/2bc87993-871f-445c-a1e6-020c610c1631" />
<img width="1059" height="660" alt="29" src="https://github.com/user-attachments/assets/062ab277-11c1-4db9-ae8f-68d3ae386016" />
<img width="1065" height="666" alt="30" src="https://github.com/user-attachments/assets/4b467670-d890-40d4-9b33-06748742281c" />
<img width="1059" height="662" alt="31" src="https://github.com/user-attachments/assets/00435595-72e7-472b-8253-8a10753f071c" />

