const Pokemon = require('../models/pokemon-model');

const findAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json({ message: 'OK', data: pokemons });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const findPokemonByPk = async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ _id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }
    res.json({ message: 'OK', data: pokemon });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body);
    res.status(201).json({ message: 'Pokémon créé avec succès', data: pokemon });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const id = req.params.id;
    const pokemon = await Pokemon.findOneAndUpdate(
      { _id: id }, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }
    
    res.json({ message: 'Pokémon mis à jour', data: pokemon });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// ← NOUVELLE FONCTION DELETE
const deletePokemon = async (req, res) => {
  try {
    const id = req.params.id;
    const pokemon = await Pokemon.findById(id);
    
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon not found' });
    }
    
    await Pokemon.deleteOne({ _id: id });
    res.json({ message: 'Pokémon supprimé', data: pokemon });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { 
  findAllPokemons, 
  findPokemonByPk, 
  createPokemon, 
  updatePokemon, 
  deletePokemon 
};