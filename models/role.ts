import { Model, DataTypes, Optional } from 'sequelize';
import { sequelizeInstance } from 'models/instances/sequelize';

export interface RoleAttributes {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {}

export const Role = sequelizeInstance.define<RoleInstance>(
  'roles',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    paranoid: true,
  }
);
