import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const chattable = sequelize.define('chattable', {
   senderid: {
      type: Sequelize.STRING,
      allowNull: false,
      
   },    
   reciverid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   message: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   senddate: {
      type: Sequelize.TIME,
      allowNull: false,
   },
   sendtime: {
      type: Sequelize.TIME,
      allowNull: false,
   },
   recivedate: {
      type: Sequelize.TIME,
      allowNull: false,
   },
   recivetime: {
      type: Sequelize.TIME,
      allowNull: false,
   },
   messageststus: {
      type: Sequelize.INTEGER,
      allowNull: false,
   },
});

export default chattable;