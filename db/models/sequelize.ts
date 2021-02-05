import { Sequelize } from 'sequelize';

import config from 'config/config.js';

const env = process.env.NODE_ENV || 'development';
const sequelizeInstance = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

export { sequelizeInstance };
