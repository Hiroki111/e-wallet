import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret = process.env.TOKEN_SECRET;

interface IAuthenticationRequest extends Request {
  email: string;
  cookies: { token: string };
}

const withAuth = (req: IAuthenticationRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized: Invalid token');
    } else {
      req.email = decoded.email;
      next();
    }
  });
};

export default withAuth;
