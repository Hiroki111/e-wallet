import { Request, Response } from 'express';

import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';
import { RoleService } from 'services/role.service';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.register({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (!req.body.roles || req.body.roles.length < 1) {
      await UserService.setRoles(user, [1]);
      res.send({ message: 'User was registered successfully!' });
      return;
    }

    const roles = await RoleService.findAllByNames(req.body.roles);

    await UserService.setRoles(user, roles);
    res.send({ message: 'User was registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.findByEmail(req.body.email);

    if (!user) {
      res.status(404).send({ message: 'User Not found.' });
      return;
    }

    const isPasswordValid = UserService.validatePassword(req.body.password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
      return;
    }

    res.status(200).cookie('token', AuthService.generateJwtToken(user.id), { httpOnly: true }).send({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const checkToken = (req: Request, res: Response): void => {
  res.sendStatus(200);
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token').sendStatus(200);
};
