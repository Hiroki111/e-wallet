import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { db } from 'models';

interface IAuthJwtRequest extends Request {
  userId: string;
}

const User = db.user;

export const verifyToken = (req: IAuthJwtRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).send({ message: 'No token provided!' });
    return;
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Unauthorized!' });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = async (req: IAuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    const hasAdminRole = roles.some((role) => role.name === 'admin');
    if (!hasAdminRole) {
      throw Error('Require Admin Role!');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
};

export const isModerator = async (req: IAuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    const hasModeratorRole = roles.some((role) => role.name === 'moderator');
    if (!hasModeratorRole) {
      throw Error('Require Moderator Role!');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
};

export const isModeratorOrAdmin = async (req: IAuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    const hasModeratorOrAdminRole = roles.some((role) => role.name === 'moderator' || role.name === 'admin');
    if (!hasModeratorOrAdminRole) {
      throw Error('Require Moderator or Admin Role!');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
};
