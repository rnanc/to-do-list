const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const User = require("../models/User")
const Project = require("../models/Project")
const Task = require("../models/Task")

const connection = new Sequelize(dbConfig)

User.init(connection)
Project.init(connection)
Task.init(connection)

module.exports = connection