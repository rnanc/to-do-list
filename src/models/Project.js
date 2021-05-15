const { Model, DataTypes }= require("sequelize")

class Project extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },{
      sequelize
    })
  }
}

module.exports = Project