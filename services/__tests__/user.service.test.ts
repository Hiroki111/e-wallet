import { sequelize } from 'db/sequelize';
import { UserService } from 'services/user.service';
import { RoleService } from 'services/role.service';
import db from 'db';

describe('UserService', () => {
  let mockUser = null;
  let mockRole = null;

  beforeAll(async () => {
    await sequelize.sync({ force: true, alter: true });
    await db.User.create({
      username: 'John Doe',
      email: 'john@example.com',
      password: 'i-am-john',
    });
    await db.Role.create({ name: 'User' });
    mockUser = await db.User.findByPk(1);
    mockRole = await db.Role.findByPk(1);
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
        username: mockUser.username,
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
        email: mockUser.email,
        password: 'blahblah',
      });
    } catch (error) {
      expect(error.message).toEqual('The provided email is already used.');
    }
  });

  it('should set roles', async () => {
    const user = await UserService.findById(1);
    const providedRoles = await RoleService.findAllByNames([mockRole.name]);
    await UserService.setRoles(user, providedRoles);
    const usersRoles = await user.getRoles();

    expect(usersRoles).toMatchObject(providedRoles);
  });

  it('should set the role of ID 1 if an empty array is provided to setRoles', async () => {
    const user = await UserService.findById(1);
    await UserService.setRoles(user, []);
    const usersRoles = await user.getRoles();

    expect(usersRoles).toMatchObject([mockRole]);
  });

  it('should set the role of ID 1 if null is provided to setRoles', async () => {
    const user = await UserService.findById(1);
    await UserService.setRoles(user, null);
    const usersRoles = await user.getRoles();

    expect(usersRoles).toMatchObject([mockRole]);
  });

  it('should hash a password', () => {
    const rawPassword = 'raw-password';
    const hashedPassword = UserService.hashPassword('raw-password');

    expect(rawPassword).not.toEqual(hashedPassword);
  });

  it('should validate a password', async () => {
    const user = await db.User.create({
      username: 'Password Tester',
      email: 'passwordtest@example.com',
      password: UserService.hashPassword('raw-password'),
    });
    const isValid = await UserService.validatePassword('raw-password', user.password);

    expect(isValid).toEqual(true);
  });
});
