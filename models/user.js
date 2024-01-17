const { Model , DataTypes } = require('sequelize');

const {sequelize} = require('../utils/db');

class User extends Model {}

User.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: "Invalid email address. please provide a valid email"
            }
        }
    },
   
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    disable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    sequelize,
    underscored: true,
    timestamps: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    modelName: 'user'
})


module.exports = User