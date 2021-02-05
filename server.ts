import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { RootRouter } from 'http/routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/', RootRouter);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
