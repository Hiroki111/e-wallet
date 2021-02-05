import express from 'express';

import { ApiAuthRouter } from 'routes/auth.routes';
import { ApiUserRouter } from 'routes/user.routes';

const RootRouter = express.Router();

RootRouter.use('/api/auth', ApiAuthRouter);
RootRouter.use('/api/user', ApiUserRouter);

export { RootRouter };
