import { DataTypes } from 'sequelize';

export const Role = (sequelize) => {
  return sequelize.define(
    'roles',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING },
    },
    {
      paranoid: true,
    }
  );
};
