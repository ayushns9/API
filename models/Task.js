const Sequelize = require('sequelize');
const db = require('../config/database');

const Task = db.define('Task', {
    task_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    status : {
        type: Sequelize.STRING,
        isIn: [['active', 'inactive', 'declined', 'completed']]
    },
    assigner : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        }
    },
    project : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'project',
            key: 'project_id'
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})



module.exports = Task;