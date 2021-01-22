import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { db } from './models';
import withAuth from './middleware';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const Role = db.role;

const initial = () => {
  Role.create({ id: 1, name: 'user' });
  Role.create({ id: 2, name: 'moderator' });
  Role.create({ id: 3, name: 'admin' });
};

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

dotenv.config();

const secret = process.env.TOKEN_SECRET;

app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./routes/auth.routes')(app);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./routes/user.routes')(app);

// Authentication
app.post('/register', (req, res) => {
  res.status(200).send({ msg: 'Welcome!' });
});

app.post('/authenticate', (req, res) => {
  const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
});

app.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

app.post('/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
