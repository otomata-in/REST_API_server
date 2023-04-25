import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Usertoken1 = sequelize.define('usertoken1', {
   tokenid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
   },
   mobileno: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
   }
  
     
});

export default Usertoken1;