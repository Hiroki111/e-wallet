import { Request, Response, NextFunction } from 'express';

import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';

interface AuthJwtRequest extends Request {
  userId: number;
}

const ADMIN_ROLE = 'admin';
const MODERATOR_ROLE = 'moderator';

export const verifyToken = async (req: AuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).send({ message: 'No token provided!' });
    return;
  }

  try {
    req.userId = await AuthService.verifyToken(token);
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized!' });
  }
};

const findUserById = async (userId: number) => {
  const user = await UserService.findById(userId);
  if (!user) {
    throw Error('No user found!');
  }
  return user;
};

export const isAdmin = async (req: AuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await findUserById(Number(req.userId));
    const roles = await user.getRoles();
    const hasAdminRole = roles.some((role) => role.name === ADMIN_ROLE);
    if (!hasAdminRole) {
      throw Error('Require Admin Role!');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
};

export const isModerator = async (req: AuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await findUserById(Number(req.userId));
    const roles = await user.getRoles();
    const hasModeratorRole = roles.some((role) => role.name === MODERATOR_ROLE);
    if (!hasModeratorRole) {
      throw Error('Require Moderator Role!');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
};

export const isModeratorOrAdmin = async (req: AuthJwtRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await findUserById(Number(req.userId));
    const roles = await user.getRoles();
    const hasModeratorOrAdminRole = roles.some((role) => [MODERATOR_ROLE, ADMIN_ROLE].includes(role.name));
    if (!hasModeratorOrAdminRole) {
      throw Error('Require Moderator or Admin Role!');
    }
    next();
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
};
