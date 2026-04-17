const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const createFirstUser = async () => {
  try {
    const existingUser = await User.findOne({ username: 'pikachu' });
    if (existingUser) {
      console.log('✅ Utilisateur déjà existant:', existingUser.username);
      return;
    }

    const hash = await bcrypt.hash('pikachu', 10);
    const user = await User.create({ 
      username: 'pikachu', 
      password: hash 
    });
    console.log('✅ Utilisateur créé:', user.username);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
};

module.exports = { createFirstUser };