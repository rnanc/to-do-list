const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const User = require("../models/User")
const Project = require("../models/Project")

const connection = new Sequelize(dbConfig)

User.init(connection)
Project.init(connection)

module.exports = connection