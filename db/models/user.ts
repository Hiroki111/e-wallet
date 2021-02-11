import {
  Model,
  Sequelize,
  BuildOptions,
  DataTypes,
  Optional,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';

import { RoleInstance } from 'db/models/role';
import { WithAssociate } from 'db/models/interfaces';

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

type UserWithAssociation = typeof Model &
  WithAssociate & {
    new (values?: Record<string, unknown>, options?: BuildOptions): UserInstance;
  };

const User = (sequelizeInstance: Sequelize): UserWithAssociation => {
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
  ) as UserWithAssociation;

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'user_roles',
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
  };

  return User;
};

export { User };
