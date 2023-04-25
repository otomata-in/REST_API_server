import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Profiledetail = sequelize.define('profiledetail', {
   userid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },    
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   dob: {
      type: Sequelize.DATE,
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   hometown: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   currenttown: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   education: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   languageknown: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   badgeid: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   userinfo: {
      type: Sequelize.STRING,
      allowNull: false,
   },
  
});

export default Profiledetail;