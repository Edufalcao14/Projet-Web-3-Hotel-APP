
# [AG Chart](https://www.ag-grid.com/charts/) , [AG Grids](https://www.ag-grid.com/) et [Tailwindcss](https://tailwindcss.com/)

### Groupe ( 09 ) 

## Application de gestion d'hôtel avec [AG Chart](https://www.ag-grid.com/charts/) , [AG Grids](https://www.ag-grid.com/) et [Tailwindcss](https://tailwindcss.com/)

### Membres

- Sampaio Falcao Eduardo
- Simonis Tom
- Ciborowski Dawid
- Demir Ahmet Kusay 
- Koubai Omar 


## Objectif

Vinci Hotel Manager est une application BI conçue pour explorer et démontrer les capacités maximales de [AG Chart](https://www.ag-grid.com/charts/) et [AG Grids](https://www.ag-grid.com/) en utilisant une base de données contenant plus de 12 000 données pour générer nos graphiques et tableaux tout en maintenant un site web rapide, efficace et dynamique. 

Le frontend a été conçu pour explorer les capacités de [Tailwindcss](https://tailwindcss.com/) afin de construire une interface moderne, dynamique, esthétique et responsive.


## Guide d'installation

1. Télécharger directement via le [répertoire GitHub](https://github.com/Edufalcao14/Projet-Web-3-Hotel-APP) ou cloner le projet :

```bash

git clone https://github.com/Edufalcao14/Projet-Web-3-Hotel-APP.git

```

2. Accédez d'abord au répertoire de l'API en utilisant la commande suivante :
   
```bash

cd api

```
3. Installer les dépendances nécessaires :
   
```bash

npm i

```
4. Lancez l'API :
   
```bash

npm start

```
5. Ensuite, accédez au répertoire fronted : Vinci-Hotel avec la commande suivante :
   
```bash
cd ..
cd vinci-hotel

```
6. Installer les dépendances nécessaires :
   
```bash

npm i

```
7. Lancez le frontend :
   
```bash

npm run dev

```


8. Lancer le serveur sur le navigateur (de préférence [Chrome](https://www.google.com/chrome/) ou [Firefox](https://www.mozilla.org/en-US/firefox/new/) via : http://localhost:3000.

## Architecture de l'application

 **Notre application repose sur une architecture headless, assurant une distinction nette entre le front-end et le back-end, lesquels interagissent par d'appels API**
 
## API : 

 **Notre API utilise une architecture MVC (Model-View-Controller)**

**db/** : Contient les fichiers d'initialisation SQL ( [PostgresSQL](https://www.postgresql.org/l) ) utilisés pour générer notre base de données.

**models/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des données et des opérations CRUD (Create, Read, Update, Delete) sur notre base de données.

**routes/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des routes de l'application.

**requests/** : Contient les fichiers HTTPS pour tester les routes de notre application.

**app.js** : Point d'entrée de l'application. Configure le serveur [Express](https://expressjs.com), les middlewares ainsi que les routes.

## Frontend : 

 **Notre frontend utilise une architecture MPA hybride combinant SSR, SSG, et CSR, selon les besoins de chaque page ou composant.**

**app/** : Contient toutes les pages de l'application. Avec [Next.js](https://nextjs.org/), ce dossier est également utilisé pour générer automatiquement les routes associées, facilitant ainsi l'organisation et la navigation dans l'application.

components/ : Regroupe tous les composants réutilisables de l'application, notamment les graphiques AG Charts. Ce dossier centralise les éléments de l'interface utilisateur (UI) pour en faciliter la gestion et leur réutilisation dans le projet.

**routes/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des routes de l'application.

public/ : Contient toutes les images et icons directement dans l'application.

**services/api/** : Regroupe toutes les fonctions utilisées pour effectuer les requêtes (fetch) vers notre API et récupérer les données. Ce dossier centralise la logique de communication avec l'API, rendant le code plus structuré et maintenable.



## Technologies utilisées

## API : 

- [Node.js](https://nodejs.org/docs/latest/api/) : Pour les packages npm et express.
- [Express](https://expressjs.com) :  Pour la structure de l'API et la gestion des routes.
- [Python](https://www.python.org/) : Utilisé pour le genérer des données pour notre base de données.
- [PostgresSQL](https://www.json.org/json-en.html) : Base de données pour stocker nos données.
  
## Frontend : 

- [Next.js](https://nextjs.org/) : Pour la gestion des pages frontend, la gestion des routes, ainsi que pour la génération des pages JavaScript et HTML. Permet de créer l'applications web en offrant des fonctionnalités comme le rendu côté serveur (SSR), la génération de pages statiques (SSG), et la gestion automatique des routes basée sur le système de fichiers.

## Outils et bibliothèques

- [AG Chart](https://www.ag-grid.com/charts/)  : Utilisé pour générer des graphiques dynamiques et interactifs.
- [AG Grids](https://www.ag-grid.com/) :  Utilisé pour générer des tableaux interactifs à partir de données.
- [Tailwindcss](https://tailwindcss.com/) : Framework CSS utilitaire permettant de styliser rapidement le frontend.
- [React](https://react.dev/) : Permet de construire des composants réutilisables et gère leur état à l'aide du "Virtual DOM".
- [npm](https://docs.npmjs.com) : Gestionnaire de paquets pour [Node.js](https://nodejs.org/fr).
