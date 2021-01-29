import { Model, DataTypes, Optional } from 'sequelize';
import { sequelizeInstance } from 'models/instances/sequelize';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const User = sequelizeInstance.define<UserInstance>(
  'users',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    paranoid: true,
  }
);
