import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';
import User from '../models/user.js';

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

Profileuser.belongsTo(User, {foreignKey: 'fk_userid', targetKey: 'userid'});
//MainClient.hasOne(MainDashboard, { foreignKey: 'idClient' })
//MainDashboard.hasOne(MainClient, { foreignKey: 'clientId' })

//User.hasOne(Profileuser, { foreignKey: 'userid' });
//Profileuser.belongsTo(User, { foreignKey: 'userid' });

export default Profileuser;