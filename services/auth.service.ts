import jwt from 'jsonwebtoken';

const TOKEN_VALID_PERIOD = 86400; // 24 hours

export class AuthService {
  static generateJwtToken(id: number): string {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: TOKEN_VALID_PERIOD,
    });
  }
}
