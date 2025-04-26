# Pokemon Trainer - Seynabou

Bienvenue sur mon projet **Pokédex Pokémon** réalisé dans le cadre du cours de **Technologie Web** à l'**ECE Paris**.

---

## 🚀 Description du projet

Ce projet est une application Web de Pokédex avec authentification.  
Il est composé de deux parties :
- Un **backend** sous **Node.js / Express / MongoDB** (API REST sécurisée avec JWT)
- Un **frontend** en **React.js** (interface utilisateur rapide et responsive)

Fonctionnalités principales :
- 🔒 Inscription et Connexion sécurisées
- 📃 Liste de tous les Pokémon
- 🔍 Filtres par nom, types, statistiques
- ➕ Ajout d'un Pokémon (authentification obligatoire)
- 🗑️ Suppression d'un Pokémon (authentification obligatoire)
- 📖 Documentation Swagger pour l'API backend

---

## ⚙️ Instructions d'installation

### 1. Cloner le projet

```bash
git clone https://github.com/zkerkeb-class/pokedex-api-SeynabouS.git
git clone https://github.com/zkerkeb-class/pokedex-frontend-SeynabouS.git
```

---

### 2. Installer les dépendances

**Backend :**

```bash
cd pokedex-api-SeynabouS
npm install
```

**Frontend :**

```bash
cd pokedex-frontend-SeynabouS
npm install
```

---

### 3. Créer le fichier `.env`

Dans le dossier **backend**, créer un fichier `.env` :

```dotenv
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://127.0.0.1:27017/pokemons-db
PORT=3000
```

---

### 4. Lancer le projet

**Backend :**

```bash
npm start
```

**Frontend :**

```bash
npm run dev
```

---

## 🧹 Documentation de l'API

La documentation Swagger est disponible à l'adresse :

```
http://localhost:3000/api-docs
```

Elle contient :
- Les routes d'authentification (`/api/register`, `/api/login`)
- Les routes Pokémon (`/api/pokemons`, `/api/pokemons/:id`)
- Les détails des requêtes et réponses

---

## 🎥 Lien vers la démonstration vidéo

👉 [Lien vers la vidéo YouTube ici](https://www.youtube.com/watch?v=AcGhi0nzOQ0) 

---

## ✨ Points techniques importants

- Utilisation de **JWT** pour sécuriser les routes
- Gestion des erreurs serveur / client
- Formulaires protégés côté client React
- Utilisation de **Swagger** pour la documentation
- Application Responsive et rapide avec **Vite** + **React**

---

## 👩‍💻 Réalisé par

**Seynabou S.** - Étudiante ECE 2024-2025

---

