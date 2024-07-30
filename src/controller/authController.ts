import { Request, Response } from 'express';
import AuthService from '../service/authService';
import { loginSchema, registrationSchema } from '../validation/authValidation';
import { parse } from 'cookie';
import asyncHandler from 'express-async-handler';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = asyncHandler(async (req: Request, res: Response) => {
    const userData = loginSchema.parse(req.body);
    const result = await this.authService.login(userData);

    if (!result) {
      res.status(400).json({ error: 'User not found' });
      return;
    }
    const { refreshToken } = result;
    res
      .cookie('rft', refreshToken, {
        httpOnly: true,
        sameSite: 'strict'
      })
      .status(201)
      .json(result);
    return;
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const userData = registrationSchema.parse(req.body);
    const user = await this.authService.register(userData);

    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }
    res.status(201).json({ message: 'User successfully created!' });
  });

  accessToken = asyncHandler(async (req: Request, res: Response) => {
    const cookie = parse(req.headers.cookie || '');
    const refreshToken = cookie.rft;

    if (!refreshToken) {
      res.status(401).json({ error: 'Not Authenticated' });
      return;
    }
    const accessToken = await this.authService.getAccessWithRefresh(refreshToken);

    if (!accessToken) {
      res.status(401).json({ error: 'Not Authenticated' });
      return;
    }

    res.status(201).json(accessToken);
    return;
  });

  decode = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const decodeToken = await this.authService.decode(token);

    res.status(201).json(decodeToken);
    return;
  });
}

export default AuthController;
