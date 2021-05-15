const Task = require("../models/Task")
const StatusEnum = require("../enum/statusEnum")

module.exports = {
  async createTask(req, res) {
    const  { description, project_id }  = req.body

    const task = await Task.create({ description, project_id, status: StatusEnum.OPEN })

    return res.json(task)
  },

  async finishTask(req, res) {
    const { id } = req.params

    const task = await Task.update({ status: StatusEnum.FINISHED, finished_at: Date.now() }, { where: { id }, returning: true })

    return res.json(task)
  },

  async reOpenTask(req, res) {
    const { id } = req.params

    const task = await Task.update({ status: StatusEnum.OPEN, finished_at: null }, { where: { id }, returning: true })

    return res.json(task)
  },

  async editTask(req, res) {
    const  { id, description }  = req.body
    
    const task = await Task.update({ description }, { where: { id }, returning: true })

    return res.json(task)
  },

  async findAllTasks(req, res) {
    const { project_id } = req.params
    
    const tasks = await Task.findAll({ where: { project_id }})

    return res.json(tasks)
  },

  async deleteTask(req, res) {
    const { id } = req.params

    await Task.destroy({ where: { id } })
    
    return res.send()
  }
}