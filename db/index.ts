import { Role } from 'db/models/role';
import { User } from 'db/models/user';

const db = {
  Role,
  User,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
