import { Model, BuildOptions, DataTypes, Optional } from 'sequelize';

import { sequelizeInstance } from 'db/models/sequelize';
import { WithAssociate } from 'db/models/interfaces';

export interface RoleAttributes {
  id: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

export interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {}

type RoleWithAssociation = typeof Model &
  WithAssociate & {
    new (values?: Record<string, unknown>, options?: BuildOptions): RoleInstance;
  };

const Role = sequelizeInstance.define<RoleInstance>(
  'roles',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  {
    paranoid: true,
  }
) as RoleWithAssociation;

Role.associate = (models) => {
  Role.belongsToMany(models.User, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
  });
};

export { Role };
