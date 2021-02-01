import jwt from 'jsonwebtoken';

const TOKEN_VALID_PERIOD = 86400; // 24 hours

export class AuthService {
  static generateJwtToken(id: number): string {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: TOKEN_VALID_PERIOD,
    });
  }

  static verifyToken = (token: string | string[]): Promise<number> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          reject();
        }
        resolve(decoded.id);
      });
    });
  };
}
