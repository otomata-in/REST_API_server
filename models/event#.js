import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Profileuser = sequelize.define('profileusers', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },    
   profilename: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   userid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
  
});

export default Profileuser;