import { Request, Response } from 'express';
import AuthService from '../service/authService';
import { loginSchema, registrationSchema } from '../validation/authValidation';
import { parse } from 'cookie';
import asyncHandler from '../utils/asyncHandler';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    const userData = loginSchema.parse(req.body);
    const result = await this.authService.login(userData);

    if (!result) {
      return res.status(400).json({ error: 'User not found' });
    }
    const { refreshToken } = result;
    return res
      .cookie('rft', refreshToken, {
        httpOnly: true,
        sameSite: 'strict'
      })
      .status(201)
      .json(result);
  });

  register = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    const userData = registrationSchema.parse(req.body);
    const user = await this.authService.register(userData);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    return res.status(201).json(user);
  });

  accessToken = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    const cookie = parse(req.headers.cookie || '');
    const refreshToken = cookie.rft;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Not Authenticated' });
    }
    const accessToken = await this.authService.getAccessWithRefresh(refreshToken);

    if (!accessToken) {
      return res.status(401).json({ error: 'Not Authenticated' });
    }

    return res.status(201).json(accessToken);
  });
}

export default AuthController;
