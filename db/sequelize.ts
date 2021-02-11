import { Sequelize, Dialect } from 'sequelize';

import config from 'config/config.js';

const env = process.env.NODE_ENV || 'development';

let sequelize: Sequelize;
if (env === 'test') {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    dialect: config[env].dialect as Dialect,
    storage: config[env].storage || undefined,
  });
}

export { sequelize };
