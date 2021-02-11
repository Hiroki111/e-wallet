import { UserService } from 'services/user.service';
import db from 'db';

describe('UserService', () => {
  const thisDb: any = db;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
    thisDb.User.create({
      username: 'John Doe',
      email: 'john@example.com',
      password: 'i-am-john',
    });
  });

  afterAll(async () => {
    await thisDb.sequelize.close();
  });

  it('should find a user by ID', async () => {
    const user = await UserService.findById(1);
    expect(user.username).toEqual('John Doe');
  });
});
