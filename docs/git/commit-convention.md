---
sidebar_position: 3
---

# Convention de nommage des commits

**Sommaire**

# Comment bien nommer ses commits ?

La première question qu'il faut que l'on se pose ce n'est pas comment bien nommer ses commits mais **pourquoi bien les nommer ?**

La réponse est simple ! Lisibilité, pérennité et sérénité.

la finalité ? Ne plus se poser de question sur l'intention des modifications effectuée par la personne qui a créé le commit.

De ce constat, nos releases note, changelog, et autre finesse de retranscription sera compris de toutes et de tous.

Le graal du commit comporte :

- un type
- une portée (scope)
- un sujet
- une description

```html
<type>(<portée>): <sujet>

<description>
```

<p class="img-container">
  <img
    src={require("/img/git/jesus.jpg").default}
    alt="Example banner"
  />
</p>

## Différents types de commit

Dans les faits, il existe, 9 types de commit:

- `feat` : ajout d'une nouvelle fonctionnalité
- `fix` : correction de bug
- `refactor` : modification du code existant qui n'apporte aucune nouvelle fonctionnalité ou amélioration de la performance
- `perf` : amélioration de la performance
- `style` : n'affecte pas le comportement fonctionnel de l'application, mais vise l'amélioration de :
  - l'indentation
  - mise en forme
- `docs` : création ou mise à jour de la documentation
- `test` : ajout ou modification des tests
- `build` : affecte la build ou les dépendances externes. (nugets, maven, npm ...)
- `ci` : affecte les scripts d'intégration ou de configuration

## La portée (scope)

Certains, disent que le scope est obligatoire d'autre non. **Il faut penser de manière pragmatique**. Il faut ajouter le scope si c'est nécessaire à la compréhension et à la relecture des commits. Ce dernier, va nous permettre de savoir quelle partie du projet est affectée.

La question à se poser lorsque l'on ne sait pas si ce dernier est utile ou non dans le commit, c'est lorsque nous devons toucher à plusieurs parties différentes du domaine dans la même fonctionnalité.

Par exemple, si la prochaine fonctionnalité touche à la fois au domaine client, produit et achat, il est intéressant d'avoir plusieurs commit contenant les scopes associés au domaine pour une meilleure relecture du code et d'une éventuelle pull request :

:::info

- `feat(utilisateur): xxxx`
- `feat(produit): xxxx`
- `feat(achat): xxxx`
:::

## Le sujet

Cette partie en revanche est obligatoire. Elle contient une description succincte des changements. Il se limite à 50 caractères.
Pour adopter un style descriptif efficace, **on utilise l’impératif présent** : add, change, update, remove et non pas changed ou removed. **add caching for better performance par exemple**.

Selon le projet et les pratiques appliquées par les leaders techniques, **les commits peuvent être en français ou anglais**.

## Le corps du changement

Cette partie est facultative. Il contient en détail de la raison des changements. De même que pour le sujet, on utilisera l’impératif présent.

## Le 7 règles pour un bon message de commit

<p class="img-container">
  <img
    className="keepy-rentree"
    src={require("/img/keepy/keepy-rentree.png").default}
    alt="Example banner"
  />
</p>

<ol class="olcards">
  <li>
   <div class="content">
    <div class="title">Séparez le sujet du corps par une ligne vide</div>
   </div>
  </li>
  <li>
   <div class="content">
    <div class="title">Limitez la ligne d'objet à 50 caractères</div>
   </div>
  </li>
  <li>
   <div class="content">
    <div class="title">Résumé au présent</div>

   </div>
  </li>
  <li>
   <div class="content">
    <div class="title">Ne terminez pas la ligne d'objet par un point</div>
   </div>
  </li>
  <li>
   <div class="content">
    <div class="title">Utilisez le mode impératif (présent et passé) dans la ligne d'objet</div>
   </div>
  </li>
  <li>
   <div class="content">
    <div class="title">Le corps ne doit pas dépasser 72 caractères</div>
   </div>
  </li>
  <li>
   <div class="content">
    <div class="title">Utilisez le corps pour expliquer quoi, pourquoi et comment</div>
   </div>
  </li>
 </ol>
<br />

# Template de commit

Cette partie abordera la mise en palce d'un template de commit.

:::note

Si vous n’avez pas encore le template de commit de l'équipe il est temp de le mettre en place.
Pour cela, il faut dans un premier temps, modifier la configuration global de votre git pour que toute édition s’effectue via Visual Studio Code

:::

# Étape 1 : édition via VS Code

**Tapez la commande suivante**:

```bash
git config --global core.editor "code --wait"
```

Pour mettre à jour votre configuration local, il faut remplacer le paramètre `--global` par `--local`
Cette commande mettra à jour votre configuration global de git et permettra à ce dernier de lancer VS Code pour toute action comme git commit ou git rebase etc ...

:::note

```txt
[core]
 editor = code --wait
```

:::

## Étape 2 : Création du template de commit

Taper la commande suivante pour créer le dossier git-templates dans votre répertoire local utilisateur

```bash
mkdir ~/git-templates
```

Ce dernier se trouvera donc dans `C:/users/user_names/git-templates.`

Ajouter un fichier du nom de `.gitmessage.txt`. Le contenu de ce dernier est le suivant :

```txt
# A properly formed Git commit subject line should always be able to complete

# the following sentence

# * If applied, this commit <will your subject line here>

#

# ** Example

# [type](optional scope): [subject]

#

# [optional body]

#

# [optional footer]

# ** Type

# Must be one of the following

# * build - Build related changes

# * chore - Build process or auxiliary tool changes

# * docs - Documentation only changes

# * feat - A new feature

# * fix - A bug fix

# * perf - A code change that improves performance

# * refactor - A code change that neither fixes a bug or adds a feature

# * revert - Reverting things

# * style - Markup, white-space, formatting, missing semi-colons

# * test - Adding missing tests

# ** Subject

# The subject contains a succint description of the change

# * Use the imperative, present tense: "change" not "changed" nor "changes"

# * No dot (.) at the end

# ** Scope

# A scope may be provided to a commit’s type, to provide additional contextual information

# and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays

# ** Body

# Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes"

# The body should include the motivation for the change and contrast this with previous behavior

# ** Rules

# The 7 rules of a great commit message

# 1. Separate subject from body with a blank line

# 2. Limit the subject line to 50 characters

# 3. Summary in present tense. Not capitalized

# 4. Do not end the subject line with a period

# 5. Use the imperative mood in the subject line

# 6. Wrap the body at 72 characters

# 7. Use the body to explain what and why vs. how
```

Il rappel succinctement ce qui est dit dans cet article afin de respecter les conventions.
Vous retrouverez également l’exemple de commit à savoir :

```bash
# [type](optional scope): [subject]
#
# [optional body]
#
# [optional footer]
```

## Étape 3: Utilisation de ce template via git

Une fois le template créé, il reste uniquement à faire comprendre à git que chaque commit doit utiliser ce template.

Pour cela, il faut utiliser cette commande :

```bash
git config --global commit.template ~/git-templates/.gitmessage.txt  
```

Rendu de la modification dans le fichier de configuration :

```txt
[commit]
 template = ~/git-templates/.gitmessage.txt
```

## Étape 4: git commit

Lorsque vous faite un commit via la commande git commit, VS Code s’ouvrira et affichera le template

<p class="img-container">
  <img
    src={require("/img/git/commit/template-git-commit.png").default}
    alt="Example banner"
  />
</p>
