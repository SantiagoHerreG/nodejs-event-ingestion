var { Sequelize, DataTypes } = require('sequelize');
var sequelize = new Sequelize('sqlite::memory:');

var Analytics = sequelize.define('analytics', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   eventType: DataTypes.STRING,
   user: DataTypes.INTEGER,
   date: DataTypes.DATE,
}, { timestamps: false });

module.exports = Analytics;