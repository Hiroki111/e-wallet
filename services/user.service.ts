import { ModelCtor } from 'sequelize';
import bcrypt from 'bcryptjs';

import { User, UserInstance, UserCreationAttributes } from 'models/user';
import { RoleInstance } from 'models/role';

export class UserService {
  private static readonly _saltRounds = 12;

  static async findById(id: number): Promise<UserInstance> {
    return await User.findByPk(id);
  }

  static async findByUserName(username: string): Promise<UserInstance> {
    return await User.findOne({ where: { username } });
  }

  static async register({ username, email, password }: UserCreationAttributes): Promise<UserInstance> {
    try {
      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, this._saltRounds),
      });
      return this.findById(user.id);
    } catch (error) {
      console.error(error);
    }
  }

  static async setRoles(user: UserInstance, roles: number[] | ModelCtor<RoleInstance>): Promise<void> {
    await user.setRoles(roles);
  }

  static async getRoles(user: UserInstance): Promise<string[]> {
    const roles = await user.getRoles();
    return roles.map((role) => role.name);
  }

  static validatePassword(rawPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, hashedPassword);
  }
}