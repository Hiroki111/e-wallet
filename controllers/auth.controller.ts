import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

import { db } from 'models';

const User = db.user;
const Role = db.role;

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (!req.body.roles || req.body.roles.length < 1) {
      await user.setRoles([1]);
      res.send({ message: 'User was registered successfully!' });
      return;
    }
    const roles = await Role.findAll({
      where: { name: { [Op.or]: req.body.roles } },
    });
    await user.setRoles(roles);
    res.send({ message: 'User was registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(404).send({ message: 'User Not found.' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    const authorities = [];
    const roles = await user.getRoles();
    roles.forEach((role) => {
      authorities.push('ROLE_' + role.name.toUpperCase());
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
