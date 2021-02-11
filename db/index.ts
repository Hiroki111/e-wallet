import { Role } from 'db/models/role';
import { User } from 'db/models/user';
import { sequelize } from 'db/models/sequelize';

const db: { [key: string]: any } = {
  Role: Role(sequelize),
  User: User(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
