var { Sequelize } = require('sequelize');
var sequelize = new Sequelize('sqlite::memory:');
var Analytics = require('./models/analytics');

sequelize.authenticate()
   .then((_: any) => {
      console.log('Connection has been established successfully.');
      return Analytics.sync();
   })
   .then((result: any) => {
      console.log('Analytics Table was created.');
      return result
   })
   .catch((err: any) => {
      console.error('Error while connecting:', err);
   });