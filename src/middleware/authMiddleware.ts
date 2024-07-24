import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/tokenIssuer';
import db from '../database/db';
import { User } from '../model/userModel';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

export async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = bearerToken.substring(7);
  const userId = validateToken(process.env.ACCESS_SECRET_KEY || '', token);

  if (!userId) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { access_token } = await db('auth_tokens').where('user_id', userId).first();

  if (!access_token || access_token !== token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}
