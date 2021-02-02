import { User } from './user';
import { Role } from './role';

User.belongsToMany(Role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

export { User, Role };
