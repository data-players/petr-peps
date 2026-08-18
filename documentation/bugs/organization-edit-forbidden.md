# Bug connu : impossibilité d'éditer une organisation (403 Forbidden)

## Symptômes

Depuis l'interface, un utilisateur ne peut pas enregistrer les modifications d'une organisation (ex. modifier l'adresse). L'appel `PUT /organizations/:id` échoue avec une erreur **403 Forbidden**.

Deux formes d'erreur observées dans les logs du middleware :

1. **Erreur serveur Fuseki (WebACL)** :
```
MoleculerError: Forbidden
Triple permissions violation: http://semapps.org/securedModel... @rdf:type pair#PostalAddress
```
Survenant lors de l'INSERT de nouveaux nœuds imbriqués (`Place`/`PostalAddress`) d'une adresse.

2. **Erreur middleware JS (WebAclMiddleware)** :
```
MoleculerError: Forbidden (ACCESS_DENIED) — throw403 du WebAclMiddleware
```
Survenant sur l'appel `ldp.resource.get` initial du `put.js` (vérification de lecture).

## Cause racine

Les organisations de cette instance n'ont **aucune ACL individuelle**. Leur résolution de droits repose uniquement sur le **fallback vers les conteneurs parents** du serveur WebACL, qui ne considère que les ACL **`acl:default`** :

- L'ACL `Write` du conteneur `/organizations` est définie en **`acl:accessTo`** (et non `acl:default`) → elle est **ignorée** pour les ressources du conteneur.
- La seule ACL `acl:default` `Write` de l'instance est celle du conteneur racine `/`, **réservée au groupe `superadmins`**.

Conséquence : **seuls les superAdmins peuvent créer/éditer les organisations**. Toute tentative par un autre utilisateur (ou une erreur de résolution de droits) échoue en 403.

Ce n'est **pas** lié à l'origine des données (injection externe) mais à la **configuration ACL globale** de l'instance.

## Impact

- Édition impossible des organisations pour tout utilisateur non-superAdmin.
- Même les superAdmins peuvent rencontrer le 403 du middleware JS si le cache Redis `hasRights` sert un résultat périmé (voir « Détail lié au cache »).

## Détail lié au cache Redis

La vérification de lecture (`webacl.resource.hasRights`) est mise en cache dans **Redis**. Si une ressource est modifiée hors du flux normal du middleware (ex. rattachement `ldp:contains` ou ACL insérés manuellement en base), le cache peut continuer de servir un résultat périmé → 403 même pour un superAdmin.

**Contournement immédiat** : purger le cache Redis pour la ressource concernée.

## Détail lié aux métadonnées `dcterms`

L'édition d'une organisation (PUT) avec un payload ne contenant pas les champs `dcterms` (c'est le cas du formulaire frontend) **supprime** `dcterms:created`, `dcterms:modified` et `dcterms:creator` :

- Le diff du `put.js` (`triplesToRemove`) supprime les triplets absents du payload.
- Le `DocumentTaggerMixin.tagUpdatedResource` censé restaurer `dcterms:modified` est **inopérant** : son `WHERE` exige une valeur existante, or elle vient d'être supprimée.

**Conséquence en prod** : sur ~136 orgas de la source ARS/ROR, **60 n'ont plus aucune métadonnée `dcterms`** (celles qui ont été éditées), alors que les 76 jamais éditées les conservent.

## Reproduction (sur orga de test, données non sensibles)

1. Créer une orga via `POST /organizations` (avec un token superAdmin valide) → constater l'ajout automatique de `dcterms:created/modified/creator`.
2. `PUT /organizations/:id` avec un payload ne contenant **pas** les champs `dcterms` → HTTP 204, mais les 3 métadonnées `dcterms` ont **disparu**.
3. Tenter un `PUT` avec un utilisateur non-superAdmin → 403 (verrou WebACL).

## Statut

- **Non corrigé** (bug connu, en cours d'analyse).
- Pistes de correction (non validées) :
  1. Ajouter une ACL `acl:default` `Write` sur le conteneur `/organizations` (pour `AuthenticatedAgent`).
  2. Créer des ACL individuelles sur les orgas pour les utilisateurs concernés.
  3. Corriger `tagUpdatedResource` pour restaurer `dc:modified` même si absent (et préserver `dc:created`/`dc:creator` lors des PUT).

## Fichiers de code concernés

- `addOn/middleware/config/containers.js` (définition du conteneur `/organizations`)
- `addOn/middleware/services/core.service.js` (superAdmins)
- Packages SEMAPPS (image `archipelago-middleware`) :
  - `@semapps/ldp/services/resource/actions/put.js` (diff DELETE/INSERT)
  - `@semapps/ldp/mixins/document-tagger.js` (métadonnées `dcterms`)
  - `@semapps/webacl/middlewares/webacl.js` (contrôle de lecture)
  - Serveur `jena-fuseki-webacl` / `semapps-jena-permissions` (vérification WebACL côté base)
