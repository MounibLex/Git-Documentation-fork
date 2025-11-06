# Guide de Contribution

Bienvenue dans le projet de documentation Git & GitLab ! Ce guide vous explique comment contribuer efficacement à ce projet collaboratif.

## Structure du Projet

```
📁 projet/
├── 📄 index.html          # Page principale (NE PAS MODIFIER directement)
├── 📄 styles.css          # Styles CSS globaux
├── 📄 script.js           # JavaScript global
├── 📁 sections/           # ⭐ VOS CONTRIBUTIONS ICI ⭐
│   ├── 📄 README.md
│   ├── 📄 git-installation.html
│   ├── 📄 basic-commands.html
│   └── 📄 branching-tutorial.html
└── 📄 CONTRIBUTING.md     # Ce guide
```

## 🎯 Comment Contribuer

### 1. Choisir une Section

Les sections disponibles pour contribution :
- **Installation Git** (`git-installation.html`) - Guide d'installation sur différents OS
- **Commandes de Base** (`basic-commands.html`) - Les commandes Git essentielles
- **Branches & Fusion** (`branching-tutorial.html`) - Workflows et branches
- **Configuration GitLab** (à créer) - Setup GitLab et intégrations
- **Bonnes Pratiques** (à créer) - Conventions et workflows d'équipe

### 2. Workflow Git

**IMPORTANT** : Suivez toujours ce processus pour éviter les conflits !

```bash
# 1. Récupérer les dernières modifications
git checkout main
git pull origin main

# 2. Créer votre branche
git checkout -b feature/nom-de-votre-section

# 3. Faire vos modifications
# Éditez les fichiers dans sections/

# 4. Commiter vos changements
git add .
git commit -m "feat: Add installation guide for Windows/macOS/Linux"

# 5. Pousser votre branche
git push -u origin feature/nom-de-votre-section

# 6. Créer une Pull Request sur GitHub
```

### 3. Règles de Contribution

#### ✅ À FAIRE
- Travaillez **uniquement** dans le dossier `sections/`
- Utilisez les classes CSS existantes
- Testez votre section localement
- Écrivez des commits descriptifs
- Demandez une review avant merge

#### ❌ À ÉVITER
- **Ne jamais modifier directement** `index.html`, `styles.css`, ou `script.js`
- Ne pas créer de branches depuis une branche non-main
- Ne pas forcer un push (`git push --force`)
- Ne pas merger vos propres Pull Requests

### 4. Structure d'une Section

Chaque section doit suivre cette structure :

```html
<section id="votre-section-id" class="doc-section">
    <h2>Titre de Votre Section</h2>
    
    <p class="lead">Description introductive de la section.</p>
    
    <!-- Votre contenu ici -->
    
    <div class="alert alert-info">
        <div class="alert-icon">💡</div>
        <div class="alert-content">
            <strong>Conseil</strong>
            <p>Utilisez les composants existants pour maintenir la cohérence.</p>
        </div>
    </div>
</section>
```

### 5. Classes CSS Disponibles

Utilisez ces classes pour maintenir la cohérence visuelle :

- **Alertes** : `.alert .alert-info/warning/success/error`
- **Cartes** : `.card-grid`, `.card`, `.card-header`
- **Listes** : `.feature-list`, `.feature-item`
- **Code** : `.code-block` pour les exemples de code
- **Badges** : `.badge .badge-success/warning/error`

### 6. Tester Localement

Avant de soumettre :
1. Ouvrez `index.html` dans votre navigateur
2. Vérifiez que votre section se charge correctement
3. Testez la navigation vers votre section
4. Vérifiez le style et la responsivité

## 🚀 Processus de Review

1. **Créez votre Pull Request** avec une description claire
2. **Assignez un reviewer** (un autre membre de l'équipe)
3. **Répondez aux commentaires** et faites les modifications demandées
4. **Une fois approuvée**, votre PR sera mergée dans `main`

## 📞 Besoin d'Aide ?

- Consultez les sections existantes comme exemples
- Posez vos questions dans les issues GitHub
- Contactez les mainteneurs du projet

---

**Merci de contribuer à cette documentation collaborative ! 🎉**