import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    english: { type: String, required: true },
    french: String,
    japanese: String
  },
  type: [String],
  base: {
    HP: { type: Number, required: true },
    Attack: { type: Number, required: true },
    Defense: { type: Number, required: true },
    "Sp. Attack": Number,
    "Sp. Defense": Number,
    Speed: { type: Number, required: true }
  },
  image: String,
  isFavorite: { type: Boolean, default: false } // Ajoutez ce champ
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);
export default Pokemon;
