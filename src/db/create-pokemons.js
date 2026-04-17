const Pokemon = require('../models/pokemon-model');

const createPokemons = async () => {
  try {
    const count = await Pokemon.countDocuments();
    if (count > 0) {
      console.log('✅ Pokémons déjà présents en base, seeder ignoré.');
      return;
    }

    await Pokemon.create([
      {
        name: 'Bulbizarre',
        hp: 25,
        cp: 5,
        picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
        types: ['Plante', 'Poison']
      },
      {
        name: 'Salamèche',
        hp: 28,
        cp: 6,
        picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
        types: ['Feu']
      },
      {
        name: 'Carapuce',
        hp: 27,
        cp: 5,
        picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
        types: ['Eau']
      },
      {
        name: 'Pikachu',
        hp: 35,
        cp: 8,
        picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png',
        types: ['Électrik']
      },
      {
        name: 'Ronflex',
        hp: 50,
        cp: 12,
        picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/143.png',
        types: ['Normal']
      }
    ]);

    console.log('✅ Pokémons créés avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la création des pokémons:', error.message);
  }
};

module.exports = { createPokemons };