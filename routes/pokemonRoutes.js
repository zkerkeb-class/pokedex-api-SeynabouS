import express from "express";
import Pokemon from "../models/Pokemon.js";

const router = express.Router();

// 🔎 Route pour récupérer tous les Pokémon
router.get("/", async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// 🔍 Route pour rechercher un Pokémon par ID
router.get("/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) return res.status(404).json({ message: "Pokémon non trouvé" });
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

export default router;
