import express from 'express';

import { ApiAuthRouter } from 'http/routes/auth.routes';
import { ApiUserRouter } from 'http/routes/user.routes';

const RootRouter = express.Router();

RootRouter.use('/', ApiAuthRouter);
RootRouter.use('/api/user', ApiUserRouter);

export { RootRouter };
