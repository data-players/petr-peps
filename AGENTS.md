# AGENTS.md — Guide pour les agents de développement

Ce fichier donne le **contexte essentiel** pour travailler sur ce dépôt. Les détails d'architecture et les bugs documentés se trouvent dans [`documentation/`](documentation/) — ne pas dupliquer ici.

## Références de documentation

- **Architecture du projet** : [`documentation/architecture.md`](documentation/architecture.md) — stack, fonctionnement SEMAPPS/WebACL, structure du dépôt, pièges.
- **Bugs connus** :
  - Impossibilité d'éditer une organisation (403) : [`documentation/bugs/organization-edit-forbidden.md`](documentation/bugs/organization-edit-forbidden.md)

> ⚠️ Lire au minimum `documentation/architecture.md` avant toute modification. Ne pas commiter de secrets (mots de passe, IP, credentials) : les valeurs d'environnement ne sont pas commitées.

## En bref

- **Projet** : annuaire d'organisations sociales/médico-sociales (PETR-PEPS), basé sur **SEMAPPS / Archipelago** (React-admin + middleware Moleculer + Fuseki RDF + Redis + Traefik).
- **Repo de prod** : la production est déployée depuis un dépôt séparé (`petr-peps-prod`, docker-compose de déploiement). Ce dépôt contient le code applicatif (`addOn`) + le déploiement local.

## Ce que fait l'agent « opencode » sur ce projet

- Le **middleware** tourne avec les packages `@semapps/*` (version 0.4) dans l'image `archipelago-middleware`. Le code du addOn (`addOn/middleware`) est **copié par-dessus** l'image au démarrage.
- Le **frontend** est du React-admin avec le dataProvider `@semapps/semantic-data-provider` (image `archipelago-frontend`).
- Toute logique métier custom se trouve dans `addOn/`.

## Commandes utiles

```bash
make start          # lancer l'application localement (docker-compose up -d)
make logs           # suivre les logs
make stop           # arrêter
```

- Fuseki local : http://localhost:3030 (console admin accessible)
- Middleware local : http://localhost:3000/
- Frontend local : http://localhost:4000/

## Pièges / règles à respecter

1. **Ne pas écrire directement dans la base de prod** (SPARQL INSERT/DELETE manuel) : risque de bloquer des verrous Fuseki. Préférer l'API du middleware. Si un accès direct est indispensable, être extrêmement prudent et toujours vérifier l'état après.
2. **Ne jamais laisser d'orga/ressource de test en base** : toujours nettoyer après un test.
3. **Le cache Redis** (`webacl.resource.hasRights`) peut servir des droits périmés → purger le cache après une manipulation manuelle d'ACL/rattachement.
4. **Édition des orgas restreinte aux superAdmins** : les non-superAdmins ne peuvent ni créer ni éditer (bug documenté). Ne pas chercher à « débloquer » via des insertions manuelles.
5. Les **logs de prod** se consultent via `docker-compose logs` dans le dépôt de déploiement (accès restreint, pas de secrets ici).

## Lancer des tests sur une orga

La création/édition d'une orga de test nécessite un **token JWT** signé avec la clé privée du middleware (`jwtRS256.key`, montée dans `middleware/jwt`), payload `{ webId: "<uri user>" }`. Voir le bug documenté pour la procédure de reproduction.

> Un test réel passe par l'API du middleware (`POST`/`PUT`), pas par insertion directe en base, afin de déclencher les événements (`ldp.resource.created`/`updated`) et le `DocumentTaggerMixin`.
