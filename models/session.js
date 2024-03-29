const { sequelize } = require('../utils/db')
const { Model, DataTypes } = require('sequelize')




class Session extends Model {}


Session.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
    },

    token: {
        type: DataTypes.TEXT,
        unique: true
    }

},{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'session'
})


module.exports = Session