import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Jobsposted_table = sequelize.define('jobsposted', {
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
   aboutjob: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   position: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   localarea: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   address: {
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
   


   image: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   providefood: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   contractorwork: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   jobdate: {
      type: Sequelize.DATE,
      allowNull: false,
   },
  
});

export default Jobsposted_table;