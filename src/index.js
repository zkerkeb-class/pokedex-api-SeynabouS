import express from "express";
import cors from "cors";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Lire le fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pokemonsList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/pokemons.json'), 'utf8'));

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Route GET de base
app.get("/api/pokemons", (req, res) => {
  res.status(200).send({
    types: [
      "fire",
      "water",
      "grass",
      "electric",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ],
    pokemons: pokemonsList,
  });
});

<<<<<<< HEAD

// GET - Récupérer un Pokémon par ID
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonsList.find(p => p.id === id);

  if (!pokemon) {
    return res.status(404).json({ status: 404, message: "Pokemon non trouvé" });
  }

  res.status(200).json({ status: 200, data: pokemon });
});

// POST - Ajouter un nouveau Pokémon
app.post("/api/pokemons", (req, res) => {
  const { id, name, type, base, image } = req.body;

  if (!id || !name || !type || !base || !image) {
    return res.status(400).json({ status: 400, message: "Données invalides" });
  }

  if (pokemonsList.some(p => p.id === id)) {
    return res.status(409).json({ status: 409, message: "ID déjà existant" });
  }

  const newPokemon = { id, name, type, base, image };
  pokemonsList.push(newPokemon);
  fs.writeFileSync(dataPath, JSON.stringify(pokemonsList, null, 2));

  res.status(201).json({ status: 201, data: newPokemon });
});

// PUT - Mettre à jour un Pokémon
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemonsList.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ status: 404, message: "Pokemon non trouvé" });
  }

  const { name, type, base, image } = req.body;
  pokemonsList[index] = { ...pokemonsList[index], name, type, base, image };
  fs.writeFileSync(dataPath, JSON.stringify(pokemonsList, null, 2));

  res.status(200).json({ status: 200, data: pokemonsList[index] });
});

// DELETE - Supprimer un Pokémon
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemonsList.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ status: 404, message: "Pokemon non trouvé" });
  }

  const deletedPokemon = pokemonsList.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify(pokemonsList, null, 2));

  res.status(200).json({ status: 200, data: deletedPokemon });
});

=======
>>>>>>> 2250eef3d7c6bfcc7b820c81c934e4855c6325c6
app.get("/", (req, res) => {
  res.send("bienvenue sur l'API Pokémon");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
<<<<<<< HEAD

=======
>>>>>>> 2250eef3d7c6bfcc7b820c81c934e4855c6325c6
