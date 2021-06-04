import DataTypes from 'sequelize'
import sequelize from '../config/database.js'

const Bank = sequelize.define('bank', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  accountNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.UUIDV4,
    allowNull: true
  }
})

export default Bank
