export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  roleIds?: number[];
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  roleIds: number[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken?: string;
}

export interface DbToken {
  user_id: number;
  access_token: string;
  refresh_token: string;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  roleIds: number[];
  refreshToken?: string;
  accessToken: string;
}
