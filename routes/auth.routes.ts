import express from 'express';

import * as authJwt from 'middleware/authJwt';
import * as verifyRegister from 'middleware/verifyRegister';
import * as controller from 'controllers/auth.controller';

const ApiAuthRouter = express.Router();

ApiAuthRouter.post(
  '/register',
  [verifyRegister.checkDuplicateUsernameOrEmail, verifyRegister.checkRolesExisted],
  controller.register
);

ApiAuthRouter.post('/login', controller.login);

ApiAuthRouter.post('/logout', [authJwt.verifyToken], controller.logout);

ApiAuthRouter.get('/checkToken', [authJwt.verifyToken], controller.checkToken);

export { ApiAuthRouter };
