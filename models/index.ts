import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { dbConfig } from '../config/db.config';
import { User } from './user.model';
import { Role } from './role.model';

dotenv.config();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db: any = {};

db.sequelize = sequelize;

db.user = User(sequelize);
db.role = Role(sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.ROLES = ['user', 'admin', 'moderator'];

export { db };
