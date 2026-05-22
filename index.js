const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { 
  findAllPokemons, 
  findPokemonByPk, 
  createPokemon, 
  updatePokemon, 
  deletePokemon 
} = require('./src/routes/pokemon-route');
const userLogin = require('./src/routes/user-route');
const { authMdlr } = require('./src/middlewares/auth');

// ← SEEDERS
const { createFirstUser } = require('./src/db/create-first-user');
const { createPokemons } = require('./src/db/create-pokemons');

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)  
  .then(() => {
    console.log('✅ MongoDB connecté');
    createFirstUser();
    createPokemons();
  })
  .catch(err => console.error('❌ MongoDB erreur:', err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route login — non protégée
app.post('/api/login', userLogin);

// Middleware JWT — toutes les routes en dessous sont protégées
app.use(authMdlr);

// Routes pokémon — protégées
app.get('/api/pokemons', findAllPokemons);
app.get('/api/pokemons/:id', findPokemonByPk);
app.post('/api/pokemons', createPokemon);
app.put('/api/pokemons/:id', updatePokemon);
app.delete('/api/pokemons/:id', deletePokemon);

app.use((req, res) => res.json({ message: 'notfound' }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 App listening on port ${PORT}`));