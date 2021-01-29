import { Model, DataTypes, Optional } from 'sequelize';
import { sequelizeInstance } from 'models/instances/sequelize';

export interface RoleAttributes {
  id: number;
  name: string;
  deletedAt: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'deletedAt'> {}

export interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {}

export const Role = sequelizeInstance.define<RoleInstance>(
  'roles',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    paranoid: true,
  }
);
