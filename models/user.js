import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const User = sequelize.define('user', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
   },
   userid: {
      type: Sequelize.STRING,
      unique: true,
      //primaryKey: true,
   },   
   name: {
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

   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   locationaddress: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   categoryrole: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   image: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

export default User;