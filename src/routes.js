const express = require("express")

const { ensureAuthenticate } = require("./middlewares/ensureAuthenticated")

const UserController = require("./controllers/UserController")
const SessionController = require("./controllers/SessionController")
const ProjectController = require("./controllers/ProjectController")
const TaskController = require("./controllers/TaskController")

const routes = express.Router()

routes.post('/users', UserController.createUser)
routes.get('/users/:id', ensureAuthenticate, UserController.findById)
routes.get('/users/email/:id', ensureAuthenticate,UserController.findByEmail)

routes.post('/session', SessionController.createSession)

routes.post('/projects', ensureAuthenticate,ProjectController.createProject)
routes.get('/projects', ensureAuthenticate,ProjectController.findAllProjects)
routes.delete('/projects/:id', ensureAuthenticate,ProjectController.deleteProject)
routes.put('/projects', ensureAuthenticate,ProjectController.editProject)

routes.post('/tasks', ensureAuthenticate, TaskController.createTask)
routes.get('/tasks/:project_id', ensureAuthenticate, TaskController.findAllTasks)
routes.delete('/tasks/:id', ensureAuthenticate, TaskController.deleteTask)
routes.post('/tasks/finish/:id', ensureAuthenticate, TaskController.finishTask)
routes.post('/tasks/reopen/:id', ensureAuthenticate, TaskController.reOpenTask)
routes.put('/tasks', ensureAuthenticate, TaskController.editTask)

module.exports = routes