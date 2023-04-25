import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const NumFollowing = sequelize.define('numfollowing', {
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
        unique: true,
     },
     numoffollowers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //unique: true,
     },
     numoffollowing: {
      type: Sequelize.INTEGER,
      allowNull: false,
      //unique: true,
   }

    
       
  });

  export default NumFollowing;