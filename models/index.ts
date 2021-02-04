import { Role } from './role';
import { User } from './user';

const db = { Role, User };

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
