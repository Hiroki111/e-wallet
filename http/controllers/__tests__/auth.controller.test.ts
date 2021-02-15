import request from 'supertest';

import db from 'db';
import { sequelize } from 'db/sequelize';
import { app } from 'server';

describe('auth.controller', () => {
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
});
