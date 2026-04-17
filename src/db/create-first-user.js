const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');


const createFirstUser = async () => {
  try {
    const existingUser = await User.findOne({ username: 'pikachu' });
    if (existingUser) {
    console.log('First user already exists:', existingUser);
    return;
    }
    const hash = await bcrypt.hash('pikachu', 10);
    const user = await User.create({ 
      username: 'pikachu', 
      password: hash 
    });
    console.log('✅ Utilisateur créé:', user.username);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

module.exports={createFirstUser};