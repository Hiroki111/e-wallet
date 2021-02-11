import { sequelize } from 'db/sequelize';
import { UserService } from 'services/user.service';
import db from 'db';

describe('UserService', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await db.User.create({
      username: 'John Doe',
      email: 'john@example.com',
      password: 'i-am-john',
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should find a user by ID', async () => {
    const user = await UserService.findById(1);
    expect(user.username).toEqual('John Doe');
  });
});
