import { Role } from './models/role';
import { User } from './models/user';

const db = { Role, User };

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
