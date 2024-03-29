const { DataTypes, QueryInterface } = require('sequelize')


module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'disable', {
            type: DataTypes.BOOLEAN
        })
    },
    down: async ({ context: queryInterface }) =>{
        await queryInterface.removeColumn('users', 'disable')
    }
}