import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { db } from '../models';

interface IAuthJwtRequest extends Request {
  userId: string;
}

const User = db.user;

const verifyToken = (req: IAuthJwtRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req: IAuthJwtRequest, res: Response, next: NextFunction) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({ message: 'Require Admin Role!' });
      return;
    });
  });
};

const isModerator = (req: IAuthJwtRequest, res: Response, next: NextFunction) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }
      }

      res.status(403).send({ message: 'Require Moderator Role!' });
    });
  });
};

const isModeratorOrAdmin = (req: IAuthJwtRequest, res: Response, next: NextFunction) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }

        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({ message: 'Require Moderator or Admin Role!' });
    });
  });
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
