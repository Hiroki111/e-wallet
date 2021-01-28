import { Request, Response, NextFunction } from 'express';

import { db } from '../models';

const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      throw Error('Failed! Username is already in use!');
    }

    user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      throw Error('Failed! Email is already in use!');
    }

    next();
  } catch (error) {
    res.status(400).send({ message: error.toString() });
  }
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.body.roles || req.body.roles.length < 1) {
    next();
    return;
  }

  for (let i = 0; i < req.body.roles.length; i++) {
    if (ROLES.includes(req.body.roles[i])) continue;

    res.status(400).send({ message: 'Failed! Role does not exist = ' + req.body.roles[i] });
    return;
  }

  next();
};

export const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };
