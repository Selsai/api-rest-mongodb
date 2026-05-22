# API REST Pokémon avec MongoDB

Ce projet est une API REST réalisée avec Node.js, Express et MongoDB.

## Objectif

L'objectif est de conteneuriser entièrement l'application avec Docker afin de pouvoir lancer le projet sans installer Node.js ni MongoDB localement.

## Services Docker

Le fichier `docker-compose.yml` lance trois services :

- `app` : l'application Node.js / Express
- `db` : la base de données MongoDB
- `mongo-express` : une interface web pour visualiser la base MongoDB

## Lancement du projet

À la racine du projet, lancer la commande suivante :

```bash
docker compose up --build
```

## Accès aux services

Une fois les conteneurs lancés, l'API est disponible à l'adresse suivante :

```txt
http://localhost:3000
```

Mongo Express est disponible à l'adresse suivante :

```txt
http://localhost:8081
```

Identifiants Mongo Express :

```txt
admin / admin
```

## Configuration Docker

L'application utilise les variables d'environnement suivantes dans le fichier `docker-compose.yml` :

```txt
MONGODB_URI=mongodb://db:27017/PokemonDB
PORT=3000
```

Le nom `db` correspond au service MongoDB défini dans `docker-compose.yml`.

## Routes principales

Connexion :

```http
POST /api/login
```

Liste des Pokémon :

```http
GET /api/pokemons
```

Détail d'un Pokémon :

```http
GET /api/pokemons/:id
```

Création d'un Pokémon :

```http
POST /api/pokemons
```

Modification d'un Pokémon :

```http
PUT /api/pokemons/:id
```

Suppression d'un Pokémon :

```http
DELETE /api/pokemons/:id
```

## Test de l'API

Les routes peuvent être testées avec Postman, Insomnia ou un autre outil de test d'API.

Pour accéder aux routes protégées, il faut d'abord se connecter avec la route :

```http
POST /api/login
```

Puis utiliser le token JWT retourné pour appeler les routes Pokémon.