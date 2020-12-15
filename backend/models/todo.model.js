module.exports = (sequelize, Sequelize) => sequelize.define('todo',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'todo',
        timestamps: false
    });
