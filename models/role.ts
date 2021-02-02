import { Model, DataTypes, Optional } from 'sequelize';
import { sequelizeInstance } from 'models/instances/sequelize';

import { User } from 'models/user';

export interface RoleAttributes {
  id: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

export interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {}

const Role = sequelizeInstance.define<RoleInstance>(
  'roles',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  {
    paranoid: true,
  }
);

Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

export { Role };
