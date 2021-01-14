import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import withAuth from './middleware';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

dotenv.config();

const secret = process.env.TOKEN_SECRET;

// Routes
app.post('/api/register', (req, res) => {
  res.status(200).send({ msg: 'Welcome!' });
});

app.post('/api/authenticate', (req, res) => {
  const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
});

app.get('/api/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

app.post('/api/logout', withAuth, (req, res) => {
  res.clearCookie('token').sendStatus(200);
});

app.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
