## PROJET
Evann LIETARD
### Sujet

Accueil (/) : Présente une page d'accueil avec des informations sur les enchères et des liens vers d'autres routes.

À propos (/about) : Informe sur la version de l'application et ses auteurs.

Commissaire-priseur (/auctioneer) : Permet d'accéder à la page du commissaire-priseur. Il peut définir un objet, son prix de départ, et lancer les enchères. Un seul commissaire-priseur à la fois est autorisé.

Enchérisseur (/bidder) : Permet d'accéder à la page de l'enchérisseur. En attente du début d'une nouvelle enchère, l'enchérisseur peut participer aux enchères lorsqu'elles sont lancées, avec des incréments de sommes fixes. Les informations sur la vente et les offres concurrentes sont reçues en temps réel.

###Initialisation

Commencer par cloner le git.
cd encheres/client
npm run build
cd ../server 
nodemon ou node src/server.js

### Commentaire

Mon projet a deux version:

Version sans les Builders (Commit précédent) :

Images chargées avec succès.
Aucun problème d'affichage d'images.

Version avec les Builders (Version actuelle) :

Les images ne s'affichent pas malgré les indications que leur lecture est réussie.(code 200 ainsi que chemin absolu bon).

Excuse moi si le css est moche je n'ai malheuresement pas trop de competence dessus.








