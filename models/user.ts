import {
  Model,
  DataTypes,
  Optional,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import { sequelizeInstance } from 'models/instances/sequelize';
import { RoleInstance } from 'models/role';

// interfaces
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  getRoles: BelongsToManyGetAssociationsMixin<RoleInstance>;
  setRoles: BelongsToManySetAssociationsMixin<RoleInstance, number>;
}

// definition
export const User = sequelizeInstance.define<UserInstance>(
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
