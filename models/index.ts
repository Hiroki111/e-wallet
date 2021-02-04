import { Role } from './role';
import { User } from './user';

const db: { [key: string]: any } = {};

db.Role = Role;
db.User = User;

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
