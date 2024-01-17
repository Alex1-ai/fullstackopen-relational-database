const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')


class Author extends Model{}

Author.init({
    author:{
        type: DataTypes.TEXT
    },
    articles: {
        type: DataTypes.INTEGER
    },
    likes: {
        type: DataTypes.INTEGER
    }
},{
    sequelize,
    underscored: true, 
    timestamps: false,
    modelName: 'author'
})


module.exports = Author