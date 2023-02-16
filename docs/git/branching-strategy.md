---
sidebar_position: 1
---

# Branching Strategy

**Sommaire**

- [Branching Strategy](#branching-strategy)
  - [Qu’est-ce qu’une branche ?](#quest-ce-quune-branche-)
  - [Qu’est-ce qu’une release ?](#quest-ce-quune-release-)
  - [Je dois faire une nouvelle fonctionnalité, que dois-je faire ?](#je-dois-faire-une-nouvelle-fonctionnalité-que-dois-je-faire-)
  - [Découpage de la fonctionnalité](#découpage-de-la-fonctionnalité)
  - [Et si ma fonctionnalité doit dépendre d’une branche d’un autre membre de l'équipe ?](#et-si-ma-fonctionnalité-doit-dépendre-dune-branche-dun-autre-membre-de-léquipe-)
    - [Qu’est-ce qu’un cherry pick ?](#quest-ce-quun-cherry-pick-)
    - [Etape d’utilisation](#etape-dutilisation)
  - [Quand merger dans master ou main ?](#quand-merger-dans-master-ou-main-)
  - [Ma fonctionnalité a été testée, fusionnée dans la branche develop et master puis mise en production. Que dois-je faire ensuite ?](#ma-fonctionnalité-a-été-testée-fusionnée-dans-la-branche-develop-et-master-puis-mise-en-production-que-dois-je-faire-ensuite-)
    - [Exemple de modèle de release note](#exemple-de-modèle-de-release-note)
  - [Une erreur est présente en production. Que dois-je faire ? De quelle branche dois-je partir ?](#une-erreur-est-présente-en-production-que-dois-je-faire--de-quelle-branche-dois-je-partir-)
  - [Merge ou rebase ?](#merge-ou-rebase-)
    - [Exemple entre un rebase et un commit](#exemple-entre-un-rebase-et-un-commit)
      - [Cas d’un merge](#cas-dun-merge)
      - [Cas d’un rebase](#cas-dun-rebase)
    - [Résolution de conflit](#résolution-de-conflit)
      - [Lors d’un merge](#lors-dun-merge)
      - [Lors d’un rebase](#lors-dun-rebase)

## Qu’est-ce qu’une branche ?

Une branche est un pointeur vers un commit.
<!-- je vous invites à lire ces parties : TODO: mettre les liens vers les document sur ces trois sous parties, une fois qu'ils seront rédigés  -->
• Explication détaillée d’un commit
• Convention de nommage des commits
• [Convention de nommage des branches](/docs/git/naming-branch-convention.md)

## Qu’est-ce qu’une release ?

Une release est généralement utilisée pour décrire une version d'une application. <br />
Une release peut être de différents types comme :

- **Release majeure** : Il s'agit d'une version importante du logiciel avec des fonctionnalités significatives et des modifications de l'interface utilisateur.
- **Release mineure** : Il s'agit d'une version du logiciel avec des améliorations et des correctifs de bogues mineurs.
- **Release de maintenance** : Il s'agit d'une version du logiciel qui corrige des bogues et des problèmes de sécurité.

Les releases sont généralement numérotées pour les différencier les unes des autres, comme 1.0, 1.1, 2.0, etc.

Lorsque vous créer une branche de release, elle s'écrira par exemple : `release/1.0`

:::danger
Une branche de `release` peut être tirer nimporte quand. Vous n'êtes pas obligé d'être au début du projet pour en tirer une.
Imagninon que nous travaillions sur un projet de 3 personnes (KeepyBob, KeepyGeo, KeepyCarl) :

- KeepyBob, travaille sur la `release 1.0`
- KeepyGeo, fix un bug de production
- KeepyCarl viens seulement d'arriver dans le projet ou l'on parle potentiellement d'une release mineur dans ce cas 1.1

Ce dernier à deux choix **(si les releases sont liées)**:

- Tirer une branche directement de la develop en créant une branche release. Cette action provoque le fait que KeepyCarl, n'a pas les fonctionnalité de la
1.0 de KeepyBob. Il peut donc faire un [cherry-pick](#quest-ce-quun-cherry-pick-) pour récupérer le travaille de son camarade.
- Directement faire rebase du travaille de son camarade sur develop puis créer sa `release 1.1`.

**Si les releases ne pas sont liées**:

- Il peut faire son travail sur la develop et tiré sa branche `release/1.1` au moment voulu. Le moment voulu correspond à une nouvelle fonctionnalité à
créer qui ne correspond pas à la release en cours. Cela évite que la develop embarque du code non fonctionnel.

:::

## Je dois faire une nouvelle fonctionnalité, que dois-je faire ?

La bonne pratique, est de partir de la branche commune de développement appelé `develop`.

:::note
Certains projets n'ont pas de branche de développement et travail directement sur la main ou la master.<p>Ce cas de figure n'est pas grave en soit. Il ne faut pas oublier que certains de ces projets ont grandis dans des contextes qui leur sont propres.</p>

**Toute nouvelle fonctionnalités doit absolument partir de la branch de développement**. Le code contenu dans cette dernière doit être testé par les utilisateurs avant fusion !
:::
<p class="img-container">
  <img
    src={require("/img/git/life-time-feature.png").default}
    alt="Example banner"
  />
</p>

## Découpage de la fonctionnalité

La durée de vie d’une branche détenant une nouvelle fonctionnalité appelé `feature` doit aller en réalité jusque l'environnement de test.

En effet, afin de ne pas polluer la branche `develop` par du code poussés par d'autre collaborateur, il faut que cette dernière, soit testée unitairement par l'équipe de développement, QA ou métier dans l'environnement de test prévu à cet effet.

Une fois le code testé, cette dernière peut être fusionnée dans la branche `develop` afin d'y être récupérer par d'autre membre de l'équipe.

<p class="img-container">
  <img
    src={require("/img/git/new-feature.png").default}
    alt="Example banner"
  />
</p>

la branche portant le nom `feature/fonctionality-name` sera la fonctionnalité complète qui sera porté jusque dans l'environnement de test. <br />
Les trois autres petites branches (`first`, `second`, `third-step`) seront mergé non dans la develop mais bien dans la branche `feature/fonctionality-name`.<br />

la branche `feature/fonctionality-name` doit être fusionnée avec la branche develop uniquement quand les tests ont été effectués.
Une fois la branche fusionnée dans develop, celle-ci doit être supprimée afin de ne pas polluer le repository de branche inutiles.

## Et si ma fonctionnalité doit dépendre d’une branche d’un autre membre de l'équipe ?

Il se peut parfois que deux membres d’une même équipe travaille sur une même fonctionnalité. On est donc parfois obligé de récupérer le travail en cours de l’autre et inversement.<br />
Si nous suivons scrupuleusement le chapitre sur les features, il est normalement impossible de pouvoir récupérer le code d’un autre membre de l'équipe tant que ce dernier n’est pas mergé dans la branche develop.<br />
En réalité c’est possible, en utilisant la commande `cherry-pick`. Tout d'abord, il faut comprendre ce que cela signifie.

### Qu’est-ce qu’un cherry pick ?

C’est une commande qui permet de sélectionner un commit quelconque et de l’appliquer sur une branche souhaité.

### Etape d’utilisation

1. Récupérer le commit souhaité par la commande `git pull`
2. Récupérer le hash du commit ex : `d42c389f`
3. Placez vous dans la branche qui accueillera ce commit à l’aide de la commande checkout. Exemple git checkout `feature/my-fonctionality`
4. Exécuter la commande `git cherry-pick d42c389f`
5. le commit `d42c389f` contenant le code voulu serra à présent sur votre branche.

## Quand merger dans master ou main ?

Si vous vous posez cette question, c’est que votre code est prêt pour la mise en production.<br />
Ce n’est pas le cas ? Pour en être sûr posez vous les questions suivantes :

- Mon code, est-il testé dans tous les environnements ?
- Toutes les parties prenantes ont testé ?
- Aucune régression n’est constatée et votre fonctionnalité/modification est opérationnelle ?

Vous pouvez merger dans la branche master une fois que la `release` est poussée en production.

Il existe plusieurs possibilité, soit de faire le merge manuellement, soit de le faire en mode [`git flow`](https://danielkummer.github.io/git-flow-cheatsheet/)

## Ma fonctionnalité a été testée, fusionnée dans la branche develop et master puis mise en production. Que dois-je faire ensuite ?

Un tag ou une branche de release contenant le numéro de version doit être créé afin de figer à un instant T ce qui a été mis en production.

:::note
Cette release doit contenir une release note composant comprenant :

- Le numéro de version
- La date
- Les fonctionnalités ajoutées
- Les éventuelles corrections et améliorations (ex: refactor, clean code…) apportées
:::

### Exemple de modèle de release note

Version 1.1 - [20/01/2023] <br />

🚀 **Nouveautés**

- Fonctionnalité n°1
- Fonctionnalité n°2

🔧 **Corrections**

- Correction n°1
- Correction n°2
- Correction n°3

🌟  **Améliorations**

- Amélioration n°1

## Une erreur est présente en production. Que dois-je faire ? De quelle branche dois-je partir ?

De manière pragmatique, toute erreur survenant en production doit être corrigée depuis la branche principal `master` ou `main` (selon le nom qui lui est donné) qui est censée être le reflet de la production.

Une branche de type `hotfix` doit être créée à partir de `master` puis déployé jusqu'en production.
La durée de vie de cette branche s'étend jusque la production. Elle doit être supprimée une fois fusionnée.<br />

La fusion de cette branche doit être effectuée dans master. En revanche, cette correction doit également être appliquée dans les autres branches telles que develop, feature etc.. afin de ne pas réembarquer le problème par inadvertance.

Il n’est pas envisageable de fusionner la branche master vers les autres branches. Pour cela, il existe deux possibilités:

- Faire un merge à la main sur master et develop du hofix.
- Utiliser la commande `gitflow`.

```bash
git flow hotfix finish VERSION
```

## Merge ou rebase ?

La solution la plus simple consiste à faire un merge de la branche principale (master) dans la branche de fonctionnalité en procédant de la manière suivante :

```bash
git checkout feature/my-feature
git merge main
```

Ou

```bash
git merge feature main
```

:::info
Le merge est une opération intéressante, car elle est non destructive. Les branches existantes ne sont aucunement altérées. Cela permet d'éviter les pièges potentiels du rebase (abordés ci-dessous).

Par ailleurs, cela signifie également qu'un commit de merge extérieur sera généré dans la branche de fonctionnalité (feature) dès que vous intégrez des changements en amont.

Une branche principale (main) très active peut grandement contribuer à polluer l'historique de votre branche de fonctionnalité. Si vous tentez d'atténuer ce problème à l'aide des options git log avancées, les autres développeurs auront des difficultés pour suivre l'historique du projet.

Cependant, l’historique de git est très important. Il doit être lisible et compréhensible. Vous pouvez tout de même rencontrer des histoire très peu lisible voir pas du tout cf. exemple ci-dessous :
:::

<p class="img-container">
  <img
    src={require("/img/git/branching-less-readable.png").default}
    alt="Example banner"
  />
</p>

Lorsqu’on utilise git pull, la stratégie par défaut est de merger la branche distante dans la branche locale. Git considère donc qu’il s’agit de 2 branches différentes alors qu’en réalité, nous voulons considérer qu’il s’agit d’une seule et même branche.

L’historique reflète donc autant de branches qu’il y a de développeurs et Git créer des commits de merge lors d’un git pull qui intègre des commits distants et locaux.

Plutôt que de faire un merge, vous pouvez faire un rebase de la branche de fonctionnalité (feature) sur la branche (main) en exécutant les commandes suivantes :

```bash
git checkout feature
git rebase main
```

Le principe du rebase est de revenir **en arrière dans l’historique en mettant de côté les commits qui n’ont pas encore été pushés, d’appliquer les commits de la branche distante sur la branche locale, puis d’appliquer les commits mis de côté à la suite**.
L’historique est alors linéaire et ne laisse plus de traces de branche ou de commits de merge.

### Exemple entre un rebase et un commit

Si l’on prend l’exemple suivant qui contient des commits sur la branche `master` et d’autres provenant de la branche master du dépôt`origin` :

<p class="img-container">
  <img
    src={require("/img/git/git-example-rebase-and-merge.png").default}
    alt="Example banner"
  />
</p>

#### Cas d’un merge

En utilisant `git pull` (ou `git merge origin/master`), un commit de merge est créé (G) et l’historique ressemble alors à ça :

<p class="img-container">
  <img
    src={require("/img/git/merge-case.png").default}
    alt="Example banner"
  />
</p>

#### Cas d’un rebase

<p class="img-container">
  <img
    src={require("/img/git/rebase-case.png").default}
    alt="Example banner"
  />
</p>

En utilisant `git pull --rebase` (ou `git rebase origin/master`), les commits qui n’existaient que sur la branche master (E et F) sont supprimés et réappliqués à la suite des commits de la branche `origin/master`. Ce sont de nouveaux commits (E’ et F’).

:::danger
C’est pour cela qu’il ne faut pas faire un rebase sur des commits qui sont déjà présents sur un dépôt partagé.
:::

### Résolution de conflit

Que ce soit lors d’un merge ou d’un rebase, il arrive que des conflits apparaissent. Voici comment les résoudre avec Git.

#### Lors d’un merge

Lorsqu’on effectue un `git merge` (ou `git pull`) et qu’un conflit apparait, Git ne commit pas automatiquement. Les fichiers sans conflit seront alors déjà ajoutés à l’index, alors que les fichiers en conflits apparaîtront comme tel lors d’un `git status` :

```bash
git status
# On branch master
# Changes to be committed:
#
#       modified:   test3
#
# Unmerged paths:
#   (use "git add/rm < file >..." as appropriate to mark resolution)
#
#       both modified:      test
```

#### Lors d’un rebase

Une opération de rebase (`git rebase` ou `git pull --rebase`) n’échappe pas aux conflits. La résolution des conflits peut cependant être nécessaire plusieurs fois lors d’un seul rebase. En effet, les commits étant appliqués 1 par 1, un conflit peut apparaître à chaque fois qu’un commit est rejoué.

La procédure est la même que pour le merge (ie. git mergetool ou édition manuelle des fichiers en conflit suivit d’un git stage) sauf que le dernier git commit sera remplacé par un `git rebase --continue` pour que Git continue d’appliquer les commits suivants.

```bash
$ git pull --rebase -i
...
## conflit
$ git status
# Unmerged paths:
#   (use "git add/rm < file >..." as appropriate to mark resolution)
#
#       both modified:      test
#
...
$ git rebase --continue
```

Pour revenir à l’état du dépôt avant la tentative de rebase (au lieu du `git rebase --continue`) :

```bash
git rebase --abort
```
