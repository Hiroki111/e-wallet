import * as authJwt from 'middleware/authJwt';
import * as verifySignUp from 'middleware/verifySignUp';
import * as controller from 'controllers/auth.controller';

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post('/api/auth/login', controller.login);

  app.post('/api/auth/logout', [authJwt.verifyToken], controller.logout);

  app.get('/api/auth/checkToken', [authJwt.verifyToken], controller.checkToken);
};
