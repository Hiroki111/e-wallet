import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { dbConfig } from 'config/db';
import { User } from 'models/user.model';
import { Role } from 'models/role.model';

dotenv.config();

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
