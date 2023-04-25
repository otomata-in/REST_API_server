import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('JobQDB', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;
