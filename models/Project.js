const {Sequelize, Model} = require('sequelize');
const db = require('../config/database');
const Task = require('./Task')
const User = require('./User')
const Project = db.define('project', {
    project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    body : {
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
    }
},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Project;