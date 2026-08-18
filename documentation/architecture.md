# Architecture du projet petr-peps

Ce document décrit l'architecture et le fonctionnement de l'application **PETR-PEPS**, un annuaire d'organisations sociales et médico-sociales (Bourgogne), déployé avec **SEMAPPS / Archipelago**.

> ⚠️ Aucun secret (mots de passe, clés, IP, credentials) n'est consigné ici. Pour toute valeur d'environnement, se référer aux fichiers de déploiement (docker-compose, `.env`) qui ne sont pas commités.

## Vue d'ensemble

L'application est un déploiement **Archipelago** (plateforme SEMAPPS) composé de plusieurs conteneurs Docker :

| Conteneur | Rôle |
|---|---|
| **middleware** | API backend (Moleculer + SEMAPPS) : LDP, WebACL, triplestore, auth OIDC |
| **frontend** | Application React-admin (build statique servi via `serve`) |
| **fuseki** | Base de données RDF (Apache Jena Fuseki) avec extensions WebACL |
| **redis** | Cache (cacher Moleculer) |
| **traefik** | Reverse proxy + TLS |

Deux sous-domaines publics :
- `data.*` → middleware (API)
- `app.*` → frontend

## Structure du dépôt

```
petr-peps/
├── addOn/
│   ├── middleware/        # Surcharge/customisation du middleware SEMAPPS
│   │   ├── config/
│   │   │   ├── config.js        # Lecture des variables d'environnement
│   │   │   ├── containers.js    # Définition des conteneurs LDP (/organizations, /users, /themes, /datasources, /sectors, /needs...)
│   │   │   └── ontologies.json  # Ontologies chargées (pair, peps...)
│   │   ├── services/            # Services Moleculer custom (core, auth, inference, backup, healthcheck)
│   │   └── public/              # context.json, ontology.ttl
│   └── frontend/            # Surcharge/customisation du frontend React-admin
│       └── src/
│           ├── App.js            # Config du dataProvider
│           ├── config/           # dataProvider, ontologies
│           ├── resources/        # Écrans par ressource (Organization, Person, Concept...)
│           └── common/           # Composants réutilisés
├── documentation/          # Cette documentation
├── docker-compose.yaml     # Déploiement local
├── docker-compose-link.yaml
└── Makefile                # Commandes start/stop/logs/compact
```

## Fonctionnement technique

### Stack middleware (SEMAPPS 0.4)

Le middleware est un service **Moleculer** utilisant les packages `@semapps/*` :
- `@semapps/ldp` : gestion des ressources et conteneurs LDP (`ldp.container`, `ldp.resource`, `ldp.registry`)
- `@semapps/webacl` : contrôle d'accès (ACL WAC), incluant le `WebAclMiddleware` (middleware Moleculer)
- `@semapps/triplestore` : communication avec Fuseki
- `@semapps/auth` : authentification OIDC (JWT signé localement, clé `jwtRS256.key`)
- `@semapps/inference` : inférence RDF

### Base de données : Fuseki + WebACL

Fuseki héberge le dataset principal (`localData`) avec des **extensions de permissions** (`jena-fuseki-webacl`). Toute requête doit être authentifiée :
- Header `X-SemappsUser` : valeur `system` (bypass complet) ou l'URI webId d'un utilisateur.
- Le serveur Java (`semapps-jena-permissions`) vérifie chaque triplet via `ShiroEvaluator`.

Les ACL sont stockées dans le graphe nommé `http://semapps.org/webacl` (fichiers `_acl/...`).

### Modèle de permissions (WebACL) — point crucial

La résolution des droits d'une ressource **sans ACL individuelle** se fait en remontant les conteneurs parents (`ldp:contains`) :

1. ACL `acl:accessTo` / `acl:agent` / `acl:agentGroup` sur la ressource elle-même.
2. Puis, pour chaque conteneur parent : **uniquement les ACL `acl:default`** (le serveur **n'utilise pas** `acl:accessTo` du conteneur pour la remontée).

Conséquences importantes :
- Un conteneur configuré avec `acl:accessTo` (ex. `Write` pour `AuthenticatedAgent`) **n'est pas pris en compte** pour les ressources qu'il contient.
- Seules les ACL `acl:default` des conteneurs parents comptent pour les ressources sans ACL propre.
- Le groupe `superadmins` dispose d'ACL `default` (`Read`/`Write`/`Control`) sur le conteneur racine `/` → **seuls les superAdmins peuvent écrire** sur les ressources sans ACL individuelle (orgas notamment).
- La **lecture** est ouverte à tous via l'ACL `accessTo Read` (public/authentifié) du conteneur `organizations`, rendue effective par la remontée `ldp:contains`.

Les superAdmins sont définis dans `addOn/middleware/services/core.service.js` → `settings.webacl.superAdmins`.

### Droits par défaut

- Les conteneurs reçoivent leurs ACL au démarrage via `@semapps/webacl/defaultRights.js` (`defaultContainerRights`), sauf si un champ `permissions` est défini dans `containers.js`.
- Une ressource **créée via l'API LDP** reçoit une ACL individuelle via `newResourcesPermissions` (`ldp/registry/defaultOptions.js`), sauf si la configuration en définit autrement. **En prod, on constate qu'aucune orga n'a d'ACL individuelle** (le comportement observé est donc le fallback vers les conteneurs).

### Métadonnées automatiques (`dcterms`)

Le middleware inclut le mixin **`DocumentTaggerMixin`** (`@semapps/ldp/mixins/document-tagger.js`), monté par défaut dans le `CoreService` :

- **À la création** (`ldp.resource.created`) : ajoute `dcterms:created`, `dcterms:modified` (date courante) et `dcterms:creator` (le webId qui crée) si absents.
- **À l'update** (`ldp.resource.updated`/`patched`) : ne met à jour que `dcterms:modified`, **et uniquement si une valeur existe déjà** (bug, voir la documentation des bugs).

> L'injection des données initiales (source ARS/ROR) a été réalisée via l'API LDP (création) → les métadonnées `dcterms` ont été écrites par le middleware, pas par l'ETL.

## Processus de développement

### Démarrage local

```bash
make start           # docker-compose up -d --force-recreate
make logs            # suivre les logs
make stop
```

- Frontend : http://localhost:4000/
- Middleware : http://localhost:3000/
- Fuseki : http://localhost:3030

### Customisation

Toute surcharge se fait dans `addOn/middleware` et `addOn/frontend`, qui sont copiés par-dessus l'image de base au démarrage des conteneurs.

## Points d'attention / pièges connus

- **Ne jamais écrire directement en base de prod** : les données de prod sont précieuses et certaines manipulations directes (INSERT/DELETE SPARQL) peuvent bloquer des verrous Fuseki. Utiliser l'API du middleware autant que possible.
- Le **cache Redis** (`webacl.resource.hasRights`) peut servir des droits périmés : après une modification manuelle d'ACL ou de rattachement, purger le cache Redis.
- Les requêtes de listing (ex. `GET /organizations`) peuvent être **très lentes** en prod (plusieurs minutes) à cause de la vérification ACL par ressource.
- L'édition des orgas est **restreinte aux superAdmins** (voir bugs).
