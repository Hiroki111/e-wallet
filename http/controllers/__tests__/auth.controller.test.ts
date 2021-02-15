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

  it('should show all users', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'John Doe 2',
      email: 'john@example.com',
      password: 'i-am-john',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User was registered successfully!');
  });
});
