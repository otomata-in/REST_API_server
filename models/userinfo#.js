import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';
import User from '../models/user.js';

const Userinfo = sequelize.define('userinfo', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },    
   languageid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   fullname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   dob: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   gender: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   badgetype: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   badgeid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   kyc: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   profiledetails: {
      type: Sequelize.STRING,
      allowNull: false,
   },
  
});

//Userinfo.belongsTo(User, {foreignKey: 'fk_userid', targetKey: 'userid'});

export default Userinfo;