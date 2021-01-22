import { Request, Response, NextFunction } from 'express';

import { db } from '../models';

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction): void => {
  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user) {
      res.status(400).send({ message: 'Failed! Username is already in use!' });
      return;
    }

    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        res.status(400).send({ message: 'Failed! Email is already in use!' });
        return;
      }

      next();
    });
  });
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.roles || req.body.roles.length < 1) return;

  for (let i = 0; i < req.body.roles.length; i++) {
    if (ROLES.includes(req.body.roles[i])) continue;

    res.status(400).send({ message: 'Failed! Role does not exist = ' + req.body.roles[i] });
    return;
  }

  next();
};

export const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };
