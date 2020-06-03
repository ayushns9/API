const express = require('express');
const User = require('./models/User') 
const Project = require('./models/Project') 
const Task = require('./models/Task') 
// const project_assignment = require('./models/project_assignment')
// Database
const db = require('./config/database');
const Sequelize = require('sequelize')

//Check
db.authenticate()
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))

//Assosiations
// 1. Project -> Assgigner
Project.belongsTo(User, {
    foreignKey: 'assigner'
});
User.hasMany(Project, {
    foreignKey: 'assigner'
});

// Project <-> Assignee
Project.belongsToMany(User, {through: 'project_assignment', foreignKey: 'project_id'})
User.belongsToMany(Project, {through: 'project_assignment', foreignKey: 'user_id'})


const userRoutes = require('./api/routes/User');
const projectRoutes = require('./api/routes/Project');

const app = express();
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)


app.use((req, res, next) => {
    const err = new Error('No API endpoint!');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    })
})

module.exports = app;

