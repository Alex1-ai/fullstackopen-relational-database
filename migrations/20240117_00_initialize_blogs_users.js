const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
module.exports = {
    up: async({ context: queryInterface }) => {
        await queryInterface.createTable('blogs',{
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
            author:{
                type: DataTypes.TEXT,
                allowNull: false
            
              },
            url:{
                type: DataTypes.TEXT,
                allowNull: false
            
              },
            title:{
                type: DataTypes.TEXT,
                allowNull: false
              },
            
            likes:{
                type: DataTypes.INTEGER,
                defaultValue: 0
              },
              createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('NOW'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('NOW'),
            },
        })

        await queryInterface.createTable('users', {
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
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

        })


    },
    down: async ({ context: queryInterface }) =>{
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    }

}

