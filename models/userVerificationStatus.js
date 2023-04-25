import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const userVerificationStatus = sequelize.define('userverificationstatus', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
   },
 userid: {
      type: Sequelize.STRING,
      //autoIncrement: true,
      //allowNull: false,
      unique: true,
     // primaryKey: true,
   },
   verificationstatus: {
      type: Sequelize.INTEGER,
      //allowNull: false,
      //unique: true,
   }
  
     
});

export default userVerificationStatus;