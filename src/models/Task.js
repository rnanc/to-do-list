const { Model, DataTypes }= require("sequelize")

class Task extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      finished_at: DataTypes.DATE
    },{
      sequelize
    })
  }
}

module.exports = Task