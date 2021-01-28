import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { dbConfig } from 'config/db';

dotenv.config();

export const sequelizeInstance = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
});
