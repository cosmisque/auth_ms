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
  if (!process.env.REFRESH_SECRET_KEY || !process.env.ACCESS_SECRET_KEY || !id) {
    return null;
  }
  const accessToken = issueAccessToken(process.env.ACCESS_SECRET_KEY, id);

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '10d'
  });

  return { accessToken, refreshToken };
}

// issue access token with valid refresh token
export function issueAccessToken(accessKey: string, id: string): string {
  const accessToken = jwt.sign({ id }, accessKey, {
    expiresIn: '1h'
  });
  return accessToken;
}

export function validateToken(secretKey: string, token: string): string | undefined {
  const { id } = <jwt.UserIDJwtPayload>jwt.verify(token, secretKey);
  return id;
}
