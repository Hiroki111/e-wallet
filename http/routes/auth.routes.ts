import express from 'express';

import * as authJwt from 'http/middleware/authJwt';
import * as verifyRegister from 'http/middleware/verifyRegister';
import * as controller from 'http/controllers/auth.controller';

const ApiAuthRouter = express.Router();

ApiAuthRouter.post('/api/auth/register', [verifyRegister.checkRolesExisted], controller.register);

ApiAuthRouter.post('/api/auth/login', controller.login);

ApiAuthRouter.post('/api/auth/logout', [authJwt.verifyToken], controller.logout);

ApiAuthRouter.get('/api/auth/checkToken', [authJwt.verifyToken], controller.checkToken);

export { ApiAuthRouter };
