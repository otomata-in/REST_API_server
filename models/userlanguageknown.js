import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Userlanguageknown = sequelize.define('userlanguageknown', {
   userid: {
      type: Sequelize.STRING,
      //primaryKey: true,
   },
   languages: {
      type: Sequelize.STRING,
      allowNull: false,
   }
     
});

export default Userlanguageknown;