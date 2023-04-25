import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Usereducation = sequelize.define('usereducation', {
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
   education: {
      type: Sequelize.STRING,
      allowNull: false,
   }
     
});

export default Usereducation;