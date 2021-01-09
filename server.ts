import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());

dotenv.config();

const secret = process.env.TOKEN_SECRET;

// Routes
app.post('/api/register', (req, res) => {
  res.status(200).send({ msg: 'Welcome!' });
});

app.post('/api/authenticate', function (req, res) {
  const token = jwt.sign({ email: req.body.email }, secret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).sendStatus(200);
});

app.get('/api/home', (req, res) => {
  res.send('Welcome!');
});

app.get('/api/secret', (req, res) => {
  res.send('The password is potato');
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
