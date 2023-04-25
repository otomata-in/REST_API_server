import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Userexperience = sequelize.define('userexperience', {
   userid: {
      type: Sequelize.STRING,
      unique: true,

      //primaryKey: true,
   },
   experience: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   yearofexperience: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
     
});

export default Userexperience;