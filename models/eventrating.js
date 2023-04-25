import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Eventrating = sequelize.define('eventrating', {
   Eventid: {
      type: Sequelize.INTEGER,
      //primaryKey: true,
   }, 
   rateduserid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   teamrate: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   beharate: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   punrate: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   hardrate: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   review: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   rateruserid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   like: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   dislike: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   report: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   reportcomment: {
      type: Sequelize.STRING,
      allowNull: false,
   },


  
});

export default Eventrating;