# ASI2 - Cards game 

Notre application est un jeu de cartes permettant à des joueurs de s'affronter en 1 contre 1.
Un utilisateur inscrit sur notre application peut:
 - acheter et vendre des cartes
 - affronter des joueurs avec les cartes qu'il possède (1 carte VS 1 carte)
 - discuter avec les utilisateurs connectés
 - augmenter son capital en remportant des parties et acheter encore plus de cartes

## Auteurs
 - Martin Thénot 
 - Fabien Dalla-Valle
 - Maxime Delahodde
 - Thibault Caussanel 

## [Dossier sur GitHub](http://github.com/fabiendv/asi-cards-game) 
 
## Activités réalisées

 - Thibault :
	- Composants React pour les pages Buy/Sell et Play
	- Module backend Springboot communicant par un bus avec une application indépendante
	- Backend Node.js associant 2 joueurs dans une partie
	- Historique du chat dans Springboot en utilisant Activemq

 - Martin : 
	- Composants React (et enfants) menu, navbar, user
	- Réalisation de l'identité visuelle (CSS + JS)
	- Participation au déroulement du game
	- Participation au développement du chat

 - Fabien :
	- Composants React pour les pages Login et Signup (User view)
	- Assemblage de toutes les parties du front-end pour l'atelier 1 (en utilisant directement le projet SpringBoot)
	- Implementation du composant du chat
	- Creation et implementation du deroulement d'une partie (front-end et back-end)

 - Maxime :
	- Réalisation du chat
	- Participation à la réalisation du composant User
	- Participation du composant Play
	- Vérification de l'organisation générale - Debugage

## Eléments réalisés

 - Diagramme de classe de l'architecture monolithique
 - Tableau récapitulatif des bus de communication les plus répandus
 - Tableau comparatif des principaux Framework FrontEnd existants
 - Découpage du FrontEnd en composant REACTJS
 - Application REACTJS avec interaction avec le BackEnd
 - Module permettant à notre BackEnd SpringBoot de mettre à jour les propriétés d’un utilisateur par un BUS de communication
 - Application indépendante permettant de tester la mise à jour d’un utilisateur par Bus de Communication
 - Avantages/inconvénients de node.js pour le projet
 - Backend Node.js indépendant permettant de créer un chat entre deux utilisateurs
 - BackEnd Node.js indépendant permettant d’associer les utilisateurs souhaitant jouer entre eux.
 - Frontend React d'une partie de jeux
 - Diagramme de séquence expliquant les interactions entre Node.js et le FrontEnd lors d’un jeu entre deux joueurs
 - Backend Node.js d'une partie de jeu
 - Sauvegarde de l’historique des conversations du Chat en envoyant les données du BackEnd Node.js vers le BackEnd Springboot

## Eléments non réalisés

 - Informer le BackEnd SpringBoot gérant les utilisateurs et les cartes du résultats du jeu par Bus de communication
 - Mise en place d'un proxy permettant de rediriger les requêtes http entre les 2 backends
 - Gestion des cas particuliers suivant : 
	- Lorsqu'un joueur quitte la partie en cours avec le bouton home:
		* Comportement actuel: la partie reste bloqué, le joueur restant doit retourner dans home
		* Comportement attendu: le joueur restant gagne la partie 

	- Lorsqu'un joueur quitte la waiting page:
		* Comportement actuel: le joueur retourne sur le home mais le serveur considère le joueur toujours en waiting page.
		* Comportement attendu: le joueur retourne sur le home et le serveur est informé que le joueur n'attend plus de partie

## Architecture

 - Le dossier backEnd contient l'architecture monolitique avec un service d'historique de chat par connexion ActiveMq et un service consumer communicant par ActiveMq avec le backendSendQ pour la mise à jour d'un utilisateur
 - Le dossier backEnd-SendQ contient une application Springboot connecté au bus de communication, qui met à jour un utilisateur
 - Le dossier documentation rassemble les fichiers complementaires pour le rendu.
 - Le dossier nodeJs rassemble 2 dossiers (chat et game) pour nos 2 serveurs qui gèrent notre application. Ces dossiers contiennent des fichiers front-end seulement utilisés pour tester le chat et le game de façon indépendante sur leurs ports.
 - Le dossier reactJs contient notre application principale pour le côté front-end.
 - Les scripts `install.sh` et `start.sh` s'occupent de l'installation des npm packages et s'occupent du démarage. Sinon, les indications sont décrites en dessous.

## Installation & Run

 Les commandes sont realisées depuis le dossier asi-cards-game.

 Lancer application : ./start.sh
 Installer tous les paquets: ./install.sh

### Application principale - ReactJS

 ````
 cd /reactJs
 npm install
 npm start
 ````

### Serveur pour le chat - NodeJS

 ````
 cd /nodeJs/chat
 npm install
 npm start
 ````

### Serveur pour le game - NodeJS

 ````
 cd /nodeJs/game
 npm install
 npm start
 ````

### Serveur - SpringBoot

Importer le dossier backEnd et executer en tant qu'application SpringBoot App.
