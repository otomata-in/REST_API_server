import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const workerpostedjob = sequelize.define('workerpostedjob', {
   jobid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },    
   reporterid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   position: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   job: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   locationname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   latitude: {
      type: Sequelize.DECIMAL(11,2),
      allowNull: false,
   },
   longitude: {
      type: Sequelize.DECIMAL(11,2),
      allowNull: false,
   },
   workinghours: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   jobdate: {
      type: Sequelize.DATE,
      allowNull: false,
   },
  
});

export default workerpostedjob;