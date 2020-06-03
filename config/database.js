const Sequelize = require('sequelize');

module.exports = new Sequelize('iirmpiqz', 'iirmpiqz', 'YkhlAzvivDQcN62SrGvID6GNmyI3zA-3', {
  host: 'ruby.db.elephantsql.com',
  dialect: 'postgres',
  logging: console.log,
  define: {
    timestamps: false
  },
});
