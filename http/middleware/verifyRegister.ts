import { Request, Response, NextFunction } from 'express';

import { RoleService } from 'services/role.service';

export const checkRolesExisted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.body.roles || req.body.roles.length < 1) {
    next();
    return;
  }

  const allRoleNames = await RoleService.getAllRoleNames();
  for (let i = 0; i < req.body.roles.length; i++) {
    if (allRoleNames.includes(req.body.roles[i])) continue;

    res.status(400).send({ message: 'Role does not exist = ' + req.body.roles[i] });
    return;
  }

  next();
};
