import { Op } from 'sequelize';

import { Role, RoleInstance } from 'models/role';

export class RoleService {
  static async findAllByNames(roleNames: string[]): Promise<RoleInstance[]> {
    return await Role.findAll({
      where: { name: { [Op.or]: roleNames } },
    });
  }

  static async getAllRoleNames(): Promise<string[]> {
    return (await Role.findAll()).map((role) => role.name);
  }
}
