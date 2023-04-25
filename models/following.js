import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Following = sequelize.define('following', {
 id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
   },
   userid: {
      type: Sequelize.STRING,
      allowNull: false,
      //unique: true,
   },
   followingid: {
      type: Sequelize.STRING,
      allowNull: false,
      //unique: true,
   }
  
     
});


export default Following;