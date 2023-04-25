import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Userrating = sequelize.define('userrating', {
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

     // primaryKey: true,
   },
   avgrating: {
      type: Sequelize.FLOAT(4,2),
      allowNull: true,
   },
   teamrate: {
      type: Sequelize.FLOAT(4,2),
      allowNull: true,
   },
   beharate: {
      type: Sequelize.FLOAT(4,2),
      allowNull: true,
   },
   punrate: {
      type: Sequelize.FLOAT(4,2),
      allowNull: true,
   },
   hardrate: {
      type: Sequelize.FLOAT(4,2),
      allowNull: true,
   },
   review: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   likes: {
      type: Sequelize.INTEGER,
      allowNull: true,
   },
   dislikes: {
      type: Sequelize.INTEGER,
      allowNull: true,
   },
   reports: {
      type: Sequelize.INTEGER,
      allowNull: true,
   }
     
});

export default Userrating;