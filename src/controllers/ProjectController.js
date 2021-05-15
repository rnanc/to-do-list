const Project = require("../models/Project")


module.exports = {
  async createProject(req, res) {
    const  { name }  = req.body
    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const project = await Project.create({ name, user_id })

    return res.json(project)
  },

  async editProject(req, res) {
    const  { id, name }  = req.body
    
    const project = await Project.update({ name }, { where: { id }, returning: true })

    return res.json(project)
  },

  async findAllProjects(req, res) {
    let user_id = req.user.id
    
    user_id = parseInt(user_id)

    const projects = await Project.findAll({ where: { user_id } })

    return res.json(projects)
  },

  async deleteProject(req, res) {
    const { id } = req.params

    await Project.destroy({ where: { id } })
    
    return res.send()
  }
}