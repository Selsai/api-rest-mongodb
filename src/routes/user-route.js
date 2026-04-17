const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Login incorrect' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Login incorrect' });
    }

    const token = jwt.sign(
      { idUser: user._id, uName: user.username },
      private_key,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login OK', data: user.username, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = userLogin;