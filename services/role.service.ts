import { Op } from 'sequelize';

import db from 'db';
import { RoleInstance } from 'db/models/role';

export class RoleService {
  static async findAllByNames(roleNames: string[]): Promise<RoleInstance[]> {
    return await db.Role.findAll({
      where: { name: { [Op.or]: roleNames } },
    });
  }

  static async getAllRoleNames(): Promise<string[]> {
    const roles = await db.Role.findAll();
    return roles.map((role) => role.name);
  }
}
