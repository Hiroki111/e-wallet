import { UniqueConstraintError } from 'sequelize';

import { sequelize } from 'db/sequelize';
import { UserService } from 'services/user.service';
import db from 'db';

describe('UserService', () => {
  const exampleUser = {
    username: 'John Doe',
    email: 'john@example.com',
    password: 'i-am-john',
  };
  beforeAll(async () => {
    await sequelize.sync({ force: true, alter: true });
    await db.User.create(exampleUser);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should find a user by ID', async () => {
    const user = await UserService.findById(1);
    expect(user.id).toEqual(1);
    expect(user.username).toEqual('John Doe');
    expect(user.email).toEqual('john@example.com');
  });

  it('should find a user by name', async () => {
    const user = await UserService.findByUserName('John Doe');
    expect(user.id).toEqual(1);
    expect(user.username).toEqual('John Doe');
    expect(user.email).toEqual('john@example.com');
  });

  it('should find a user by email', async () => {
    const user = await UserService.findByEmail('john@example.com');
    expect(user.id).toEqual(1);
    expect(user.username).toEqual('John Doe');
    expect(user.email).toEqual('john@example.com');
  });

  it('should register a user', async () => {
    const user = await UserService.register({
      username: 'Anna Doe',
      email: 'anna@example.com',
      password: 'my-name-is-anna',
    });
    expect(user.id).toEqual(2);
    expect(user.username).toEqual('Anna Doe');
    expect(user.email).toEqual('anna@example.com');
  });

  it('should NOT register a user with a duplicate name', async () => {
    try {
      await UserService.register({
        username: exampleUser.username,
        email: 'john2@example.com',
        password: 'blahblah',
      });
    } catch (error) {
      expect(error.message).toEqual('The provided username is already used.');
    }
  });

  it('should NOT register a user with a duplicate email', async () => {
    try {
      await UserService.register({
        username: 'Carol Doe',
        email: exampleUser.email,
        password: 'blahblah',
      });
    } catch (error) {
      expect(error.message).toEqual('The provided email is already used.');
    }
  });
});
