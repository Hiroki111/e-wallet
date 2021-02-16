import request from 'supertest';

import db from 'db';
import { sequelize } from 'db/sequelize';
import { app } from 'server';

const authToken = 'mock-cookie';

jest.mock('services/auth.service', () => ({
  AuthService: {
    generateJwtToken: jest.fn().mockReturnValue(authToken),
  },
}));

describe('auth.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await db.Role.create({ name: 'User' });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'John Doe',
      email: 'john@example.com',
      password: 'i-am-john',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User was registered successfully!');
  });

  it('should fail to register with incomplete input fields', async () => {
    const userInfo = {
      username: 'Alice Doe',
      email: 'alice@example.com',
      password: 'i-am-alice',
    };
    const resA = await request(app)
      .post('/api/auth/register')
      .send({
        ...userInfo,
        username: undefined,
      });
    const resB = await request(app)
      .post('/api/auth/register')
      .send({
        ...userInfo,
        email: undefined,
      });
    const resC = await request(app)
      .post('/api/auth/register')
      .send({
        ...userInfo,
        password: undefined,
      });
    const resD = await request(app).post('/api/auth/register').send(userInfo);

    expect(resA.statusCode).toEqual(500);
    expect(resB.statusCode).toEqual(500);
    expect(resC.statusCode).toEqual(500);
    expect(resD.statusCode).toEqual(200);
  });

  it('should fail to register a user with a role that does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'Bob Doe',
        email: 'bob@example.com',
        password: 'i-am-bob',
        roles: ['blah'],
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should register a user with an existing role name', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'Carole Doe',
        email: 'carole@example.com',
        password: 'i-am-carole',
        roles: ['User'],
      });
    expect(res.body.message).toEqual('User was registered successfully!');
    expect(res.statusCode).toEqual(200);
  });

  it('should login a user', async () => {
    const email = 'dave@example.com';
    const password = 'i-am-dave';
    await request(app).post('/api/auth/register').send({ username: 'Dave Doe', email, password });
    const res = await request(app).post('/api/auth/login').send({ email, password });

    expect(res.statusCode).toEqual(200);
    expect(res.header['set-cookie']).toEqual([`token=${authToken}; Path=/; HttpOnly`]);
  });

  it('should not login a user that has not been registered', async () => {
    const email = 'eliot@example.com';
    const password = 'i-am-eliot';
    const res = await request(app).post('/api/auth/login').send({ email, password });

    expect(res.statusCode).toEqual(404);
    expect(res.header['set-cookie']).toEqual(undefined);
  });
});
