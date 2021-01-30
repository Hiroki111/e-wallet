import {
  Model,
  DataTypes,
  Optional,
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import { sequelizeInstance } from 'models/instances/sequelize';
import { Role } from 'models/role';

// interfaces
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  getRoles: BelongsToManyGetAssociationsMixin<typeof Role>;
  setRoles: BelongsToManyAddAssociationMixin<typeof Role, number[]>;
}

// definition
const User = sequelizeInstance.define<UserInstance>(
  'users',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  {
    paranoid: true,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  }
);

// association
User.belongsToMany(Role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

export { User };
