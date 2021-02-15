import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcryptjs';

import db from 'db';
import { UserInstance, UserCreationAttributes } from 'db/models/user';
import { RoleInstance } from 'db/models/role';
import { RoleService } from 'services/role.service';

export class UserService {
  private static readonly _saltRounds = 12;

  static async findById(id: number): Promise<UserInstance> {
    return await db.User.findByPk(id);
  }

  static async findByUserName(username: string): Promise<UserInstance> {
    return await db.User.findOne({ where: { username } });
  }

  static async findByEmail(email: string): Promise<UserInstance> {
    return await db.User.findOne({ where: { email } });
  }

  static hashPassword(rawPassword: string): string {
    return bcrypt.hashSync(rawPassword, this._saltRounds);
  }

  static async register({ username, email, password }: UserCreationAttributes): Promise<UserInstance> {
    try {
      const user = await db.User.create({
        username,
        email,
        password: this.hashPassword(password),
      });
      return this.findById(user.id);
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new Error(`The provided ${e.errors[0].path} is already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  static async setRoles(user: UserInstance, roles?: (RoleInstance | number)[]): Promise<void> {
    if (!roles || roles.length < 1) {
      roles = [1];
    }

    await user.setRoles(roles);
  }

  static async setRolesByRoleNames(user: UserInstance, roleNames?: string[]): Promise<void> {
    if (!roleNames || roleNames.length < 1) {
      await user.setRoles([1]);
      return;
    }

    const roleInstances = await RoleService.findAllByNames(roleNames);

    await user.setRoles(roleInstances);
  }

  static validatePassword(rawPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}
