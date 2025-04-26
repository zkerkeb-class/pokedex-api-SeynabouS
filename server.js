import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Pokemon from './models/pokemon.js';
import User from './models/User.js';
import auth from './middleware/auth.js';

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static('assets'));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokémon API',
      version: '1.0.0',
      description: 'API REST pour gérer des Pokémon'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./server.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 */
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Identifiants invalides' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Identifiants invalides' });

    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 */
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: parseInt(req.params.id) });
    if (!pokemon) return res.status(404).json({ error: 'Pokémon introuvable' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/pokemons',
  auth,
  [
    body('id').isNumeric(),
    body('name.english').isString().notEmpty(),

    body('base.HP').optional().isNumeric(),
    body('base.Attack').optional().isNumeric(),
    body('base.Defense').optional().isNumeric(),
    body('base.Speed').optional().isNumeric(),
    body('isFavorite').optional().isBoolean()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newPokemon = new Pokemon(req.body);
      await newPokemon.save();
      res.status(201).json(newPokemon);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
  });

app.delete('/api/pokemons/:id', auth, async (req, res) => {
  try {
    await Pokemon.deleteOne({ id: parseInt(req.params.id) });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// Route pour basculer le statut favori
app.patch('/api/pokemons/:id/favorite', auth, async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: parseInt(req.params.id) });
    if (!pokemon) return res.status(404).json({ error: 'Pokémon introuvable' });

    pokemon.isFavorite = !pokemon.isFavorite;
    await pokemon.save();
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Connexion MongoDB et lancement du serveur
mongoose.connect('mongodb://127.0.0.1:27017/pokemons-db')
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`🔥 Serveur Express en ligne sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err);
  });
