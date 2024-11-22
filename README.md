# projet-web3 : [AG Chart](https://www.ag-grid.com/charts/) , [AG Grids](https://www.ag-grid.com/) et [Tailwindcss](https://tailwindcss.com/)  (Groupe 9)

## Application de gestion d'hôtel avec [AG Chart](https://www.ag-grid.com/charts/) , [AG Grids](https://www.ag-grid.com/) et [Tailwindcss](https://tailwindcss.com/)

#### Membres

- Sampaio Falcao Eduardo
- Simonis Tom
- Ciborowski Dawid
- Demir Ahmet Kusay 
- Koubai Omar 

---

## Objectif

Vinci Hotel Manager est une application BI conçu pour explorer et démontrer les capacités maximales de [AG Chart](https://www.ag-grid.com/charts/) et [AG Grids](https://www.ag-grid.com/) en utilisant une base de données avec + de 12 000 données pour generer nos graphiques et tableaux des données en gardent toujours une site web rapide , efficaces et dynamique. 

Le frontend à etait conçu pour explorer les capacités de [Tailwindcss](https://tailwindcss.com/) pour construire une interface très moderne , dynamique , belle et responsive .


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
5.Ensuite, accédez au répertoire fronted : Vinci-Hotel avec la commande suivante :
   
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


8. Lancer le serveur sur le navigateur (de préférence [Chrome](https://www.google.com/chrome/) ou [Firefox](https://www.mozilla.org/en-US/firefox/new/)) via : http://localhost:3000.

## Architecture de l'application

 **Notre application repose sur une architecture headless, assurant une distinction nette entre le front-end et le back-end, lesquels interagissent par d'appels API**
 
## API : 

 **Notre API utilise une architecture MVC (Model-View-Controller)**

**db/** : Contient les fichiers init SQL ( [PostgresSQL](https://www.postgresql.org/l) ) utilisés pour generer nos base de donnée.

**models/** : Contient les fichiers [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) pour la gestion des données et des opérations _CRUD_ (_Create, Read, Update, Delete_) sur les tâches et les listes.

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

- [Next.js](https://nodejs.org/docs/latest/api/) : Framework utilisé .
- [Express](https://expressjs.com) :  Pour la structure de l'API et la gestion des routes.
- [Python](https://www.python.org/) : Utilisé pour le genérer des données pour notre base de données.
- [PostgresSQL](https://www.json.org/json-en.html) : Base de données pour stocker nos données.

## Outils et bibliothèques

- [AG Chart](https://www.ag-grid.com/charts/)  : Pour generer les graphiques de façon dynamique .
- [AG Grids](https://www.ag-grid.com/) :  Pour generer avec nos données des tableaux
- [Tailwindcss](https://tailwindcss.com/) :  Pour le style du frontend
- [npm](https://docs.npmjs.com) : Gestionnaire de paquets pour [Node.js](https://nodejs.org/fr).
