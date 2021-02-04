import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

dotenv.config();

app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./routes/auth.routes')(app);
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./routes/user.routes')(app);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
