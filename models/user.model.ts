import { DataTypes } from 'sequelize';

export const User = (sequelize) => {
  return sequelize.define(
    'users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
    },
    {
      paranoid: true,
    }
  );
};
