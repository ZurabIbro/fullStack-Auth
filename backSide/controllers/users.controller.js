const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    const users = await User.find();

    res.json(users);
  },

  registerUser: async (req, res) => {
    try {
      const { login, password } = req.body;
      const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
      const user = await User.create({ login: login, password: hash });
      res.json(user);
    } catch (error) {
      console.log(error.message);
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json({error: "incorrect login"});
    }

    const valid = await bcrypt.compare(password, candidate.password);
    if (!valid) {
      return res.status(401).json({error: "incorrect password"});
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
    return res.json(token);
  },
};
