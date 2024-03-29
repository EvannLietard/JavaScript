
# Gestion de Spectacles

## Introduction

Ce projet vise à créer une application permettant la gestion de spectacles et la réservation de tickets par les utilisateurs. L'application est divisée en deux parties : une pour l'administration et une pour les utilisateurs.

## Fonctionnalités

### Partie Administration

- **Création de Spectacles** : Permet de créer un spectacle en fournissant une description et le nombre de places disponibles.
- **Visualisation des Spectacles** : Permet de voir la liste des spectacles déjà créés.
- **Suppression de Spectacles** : Supprime un spectacle et les tickets réservés par les clients associés.

### Partie Utilisateur

- **Consultation des Spectacles** : Permet aux utilisateurs de consulter la liste des spectacles disponibles.
- **Réservation de Tickets** : Permet aux utilisateurs de réserver des tickets pour un spectacle.
- **Visualisation des Tickets Réservés** : Affiche la liste des tickets réservés par l'utilisateur.
- **Annulation des Réservations** : Permet aux utilisateurs d'annuler leurs réservations pour un spectacle.

### Authentification

- Les utilisateurs peuvent s'authentifier, avec les noms d'utilisateurs uniques.
- Un utilisateur avec le nom "admin" obtient le rôle administrateur.

## Simplifications

- La gestion des stocks de tickets n'est pas prise en compte.
- Les actions des utilisateurs/administrateurs ne sont pas immédiatement reflétées dans les vues des autres utilisateurs/administrateurs.

## Configuration du Projet

### Prérequis

- Node.js
- MongoDB

### Installation

1. Cloner le dépôt : `git clone `
2. Installer les dépendances : `npm install`

### Configuration de la Base de Données

- Lancer MongoDB : `mongod --dbpath data/`
- L'application se connectera automatiquement à la base de données définie dans `config/db.js`.

## Utilisation

1. Lancer le serveur : `nodemon`
2. Accéder à l'application depuis un navigateur : `http://localhost:3000`

## API

L'API côté serveur comprend les routes suivantes :

- **POST /shows** : Crée un nouveau spectacle.
- **GET /shows** : Récupère tous les spectacles.
- **DELETE /shows/:id** : Supprime un spectacle par son ID.
- **PUT /user/takeTicket/:showId** : Réserve un ticket pour un spectacle.
- **GET /user/tickets** : Récupère la liste des tickets réservés par l'utilisateur.
- **PUT /user/cancelTicket/:ticketId** : Annule une réservation de ticket par son ID.


