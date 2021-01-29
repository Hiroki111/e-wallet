import dotenv from 'dotenv';

import { User } from 'models/user';
import { Role } from 'models/role';
import { sequelizeInstance } from 'models/instances/sequelize';

dotenv.config();

const db: any = {};

db.sequelize = sequelizeInstance;

db.user = User;
db.role = Role;

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
