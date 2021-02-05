import express from 'express';

import * as authJwt from '../middleware/authJwt';
import * as controller from '../controllers/user.controller';

const ApiUserRouter = express.Router();

ApiUserRouter.get('/all', controller.allAccess);

ApiUserRouter.get('/user', [authJwt.verifyToken], controller.userBoard);

ApiUserRouter.get('/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

ApiUserRouter.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

ApiUserRouter.get('/modOrAdmin', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.adminBoard);

export { ApiUserRouter };
