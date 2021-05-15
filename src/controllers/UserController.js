const User = require("../models/User")
const { hash } = require("bcryptjs")

module.exports = {
  async findById(req, res) {
    const  { id }  = req.params

      const user = await User.findByPk(id)
      if (!user) {
      return res.status(400).json("User not found !")
      }
      return res.json(user)
  },

  async findByEmail(req, res) {
    const  { email }  = req.params

      const user = await User.findOne({ where:  email  })
      if (!user) {
      return res.status(400).json("User not found !")
      }
      return res.json(user)
  },

  async createUser(req, res) {
    const { name, email, password } = req.body
    const hashedPassword = await hash(password, 8)

    try {
      const user = await User.create({ name, email, password: hashedPassword })
      return res.json(user)
    } catch (error) {
      return res.status(500).json(error.errors.map(e => e.message))
    }
  }
}