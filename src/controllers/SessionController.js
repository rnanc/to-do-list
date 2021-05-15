const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

const User = require("../models/User")
const authConfig = require("../config/auth")


module.exports = {
  async createSession(req, res) {
    const  { email, password }  = req.body

      const user = await User.findOne({ where: { email }  })
      
      if (!user) {
      return res.status(400).json("User not found !")
      }

      const passwordMatched = await compare(
        password,
        user.password,
      );

      if (!passwordMatched) {
        return res.status(401).json("Incorrect email/password combination.")
      }

      const { secret } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: user.id.toString(),
        expiresIn: authConfig.jwt.expiresIn,
      })

      return res.json({ user, token })
  },
}