# ASI2 - Cards game 

## Auteurs
 - Martin Thénot 
 - Fabien Dalla-Valle
 - Maxime Delahodde
 - Thibault Caussanel 

## [Dossier sur GitHub](http://github.com/fabiendv/asi-atelier1) 
 
## Activités réalisées

 - Thibault :
	- Composants React pour les pages Buy/Sell et Play
	- Module backend Springboot communicant par un bus avec une application indépendante
	- Backend Node.js associant 2 joueurs dans une partie

 - Martin : 
	- TODO

 - Fabien :
	- Composants React pour les pages Login et Signup (User view)
	- Assemblage de toutes les parties du front-end pour l'atelier 1 (en utilisant directement le projet SpringBoot)
	- Implementation du composant du chat
	- Creation et implementation du deroulement d'une partie (front-end et back-end)

 - Maxime :
	- TODO

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

 ## Installation & Run

 Les commandes sont realisées depuis le dossier asi-atelier1.

 ### Application principale - ReactJS

 ````
 cd /frontEnd/reactjs
 npm install
 npm start
 ````

### Serveur pour le chat - NodeJS

 ````
 cd /chat
 npm install
 npm start
 ````

### Serveur pour le game - NodeJS

 ````
 cd /NodeJs
 npm install
 npm start
 ````

### Serveur - SpringBoot

Importer le dossier backEnd et executer en tant qu'application SpringBoot App.
