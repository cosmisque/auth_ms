import { User } from '../model/userModel';
import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

// issue both tokens if no refresh token eg. first login
export function issueAccessAndRefreshTokens(user: User): { accessToken: string; refreshToken: string } | null {
  const { id } = user;
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY || '';
  const accessSecretKey = process.env.ACCESS_SECRET_KEY || '';
  if (!refreshSecretKey || !accessSecretKey) {
    return null;
  }
  const accessToken = jwt.sign({ id }, accessSecretKey, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign({ id }, refreshSecretKey, {
    expiresIn: '10d',
  });

  return { accessToken, refreshToken };
}

// issue access token with valid refresh token
export function issueAccessToken(id: string): string {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET_KEY || '', {
    expiresIn: '1h',
  });
  return accessToken;
}

export function validateToken(secretKey: string, token: string): string {
  try {
    const { id } = <jwt.UserIDJwtPayload>jwt.verify(token, secretKey);
    console.log('verified ' + id);
    return id;
  } catch (error) {
    console.log(error);
    return '';
  }
}
