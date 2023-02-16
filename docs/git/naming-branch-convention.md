---
sidebar_position: 1
---

# Convention de nommage des branches

En termes simple, une stratégie de branche, est un ensemble de règles, conventions, qui aident les membres de l'équipe de développement.<br />
La responsabilité de chacun est de suivre ces règles afin que la stratégie soit respectée par tout et pour tous.
Ne pas utiliser de nom approprié au but de la branche mènera les développeurs à la confusion.

**Sommaire**

- [Convention de nommage des branches](#convention-de-nommage-des-branches)
  - [De manière générale](#de-manière-générale)
  - [Les branches communes](#les-branches-communes)
  - [Les branches Temporaire](#les-branches-temporaire)
    - [Feature](#feature)
    - [Bug fix](#bug-fix)
    - [Hot fix](#hot-fix)
    - [Experintal](#experintal)
    - [Build](#build)
    - [Release](#release)
    - [Merging](#merging)


## De manière générale

Lors de la création d’une branche, les conventions les plus utilisées sont les suivantes :

- Toujours en minuscule
- Utiliser un slash servant de token de regroupement par exemple :
  - `feature/*`
  - `bugfix/*`
  - `hotfix/*`
  - `refactor/*`
- Utiliser un tiret pour séparer les mots par exemple :
  - `fix/log-issue`
  - `refactor/clear-unused-code`
- Trouver un nom concis mais compréhensible
- Certaines branches créées sont temporaires, n’hésitez pas à les renommer au besoin.

## Les branches communes

- `develop` **(pour développement)** : C’est la branche principale et commune pour tous les développements. L’idée de cette branche est d’empêcher les développeurs d’apporter directement des modifications sur la master.

- `master` **(production)**: Branche par défaut dans tous les repos git. Cette dernière doit refléter la production. Tous les membres de l'équipe sont responsables de la stabilité et de la mise à jour de la master.

_Par souci d'éthique, le nom master disparaîtra prochainement et sera remplacé par `main`._

## Les branches Temporaire

### Feature

Toute modification de code pour **ajouter une nouvelle fonctionnalité**, ou **ajouter une nouveau comportement** doit être embarquée dans une branche feature.
Cette dernière sera créée à partir de la branche de développement (`develop`).

Ci-dessous quelques exemples :
:::info

- feature/jira-xxx
- feature/create-user-ui

:::

### Bug fix

Si les modifications de code **apportées à partir de la branche de fonctionnalité** ont été rejetées après une version, un sprint ou une démo, toutes les corrections qui s’en suivent doivent être effectuées sur la branche de correction de bugs.

Ci-dessous quelques exemples :
:::info

- bugfix/error-user-in-created
- bugfix/log-missings

:::

### Hot fix

S'il est nécessaire de corriger un **bug de production**, d'effectuer un correctif temporaire, d'appliquer un changement de configuration qui doit être géré immédiatement, il doit être créé en tant que hot fix.

Ce dernier, ne suit pas l'intégration programmée du code et pourrait être fusionné directement sur la branche production, puis sur la branche développement plus tard.

Ci-dessous quelques exemples :
:::info

- hotfix/disable-service-connection
- hotfix/change-database-configuration

:::

### Experintal

Toute nouvelle fonctionnalité ou idée qui ne fait pas partie d'une version ou d'un sprint. Ou tout simplement, une branche pour jouer.

### Build

Une branche spécifiquement pour **créer des artefacts de build** spécifiques ou pour effectuer des exécutions de couverture de code.

### Release

Une branche pour baliser une version spécifique. Dans la pratique, **c'est cette branche qui part jusqu'en production**. Elle sera mergé dans `develop`, `main` ou `master`, une fois livrée en production.

### Merging

Une branche temporaire pour résoudre les conflits de fusion, généralement entre le dernier développement et une branche de fonctionnalité ou de correctif. Cela peut également être utilisé si deux branches d'une fonctionnalité sur laquelle travaillent plusieurs développeurs doivent être fusionnées, vérifiées et finalisées.
