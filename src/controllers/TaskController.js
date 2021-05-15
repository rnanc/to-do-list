const Task = require("../models/Task")
const StatusEnum = require("../enum/statusEnum")
const Project = require("../models/Project")

module.exports = {
  async createTask(req, res) {
    const  { description, project_id }  = req.body

    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const projectValidation = await Project.findOne({ where: { id: project_id } })

    if(projectValidation.user_id != user_id) {
      return res.status(500).json("User invalid for this project !")
    }

    const task = await Task.create({ description, project_id, status: StatusEnum.OPEN })

    return res.json(task)
  },

  async finishTask(req, res) {
    const { id } = req.params

    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const { project_id } = await Task.findOne({ where: { id } })

    const projectValidation = await Project.findOne({ where: { id: project_id } })

    if(projectValidation.user_id != user_id) {
      return res.status(500).json("User invalid for this project !")
    }

    const task = await Task.update({ status: StatusEnum.FINISHED, finished_at: Date.now() }, { where: { id }, returning: true })

    return res.json(task)
  },

  async reOpenTask(req, res) {
    const { id } = req.params

    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const { project_id } = await Task.findOne({ where: { id } })

    const projectValidation = await Project.findOne({ where: { id: project_id } })

    if(projectValidation.user_id != user_id) {
      return res.status(500).json("User invalid for this project !")
    }

    const task = await Task.update({ status: StatusEnum.OPEN, finished_at: null }, { where: { id }, returning: true })

    return res.json(task)
  },

  async editTask(req, res) {
    const  { id, description }  = req.body

    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const { project_id } = await Task.findOne({ where: { id } })

    const projectValidation = await Project.findOne({ where: { id: project_id } })

    if(projectValidation.user_id != user_id) {
      return res.status(500).json("User invalid for this project !")
    }
    
    const task = await Task.update({ description }, { where: { id }, returning: true })

    return res.json(task)
  },

  async findAllTasks(req, res) {
    const { project_id } = req.params

    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const projectValidation = await Project.findOne({ where: { id: project_id } })

    if(projectValidation.user_id != user_id) {
      return res.status(500).json("User invalid for this project !")
    }
    
    const tasks = await Task.findAll({ where: { project_id }})

    return res.json(tasks)
  },

  async deleteTask(req, res) {
    const { id } = req.params

    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const { project_id } = await Task.findOne({ where: { id } })

    const projectValidation = await Project.findOne({ where: { id: project_id } })

    if(projectValidation.user_id != user_id) {
      return res.status(500).json("User invalid for this project !")
    }

    await Task.destroy({ where: { id } })
    
    return res.send()
  }
}