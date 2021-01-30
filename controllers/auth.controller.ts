import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { db } from 'models';
import { UserService } from 'services/user.service';
import { AuthService } from 'services/auth.service';

const Role = db.role;

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
    const roles = await Role.findAll({
      where: { name: { [Op.or]: req.body.roles } },
    });
    await UserService.setRoles(user, roles);
    res.send({ message: 'User was registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserService.findByUserName(req.body.username);

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

    const roles = await UserService.getRoles(user);

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles,
      accessToken: AuthService.generateJwtToken(user.id),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
