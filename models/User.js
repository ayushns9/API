const { Sequelize, Model } = require('sequelize');
const db = require('../config/database');
const Project = require('./Project')
const Task = require('./Task')

const User = db.define('User', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname : {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = User;