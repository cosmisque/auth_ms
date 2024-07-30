import { Router } from 'express';
import AuthController from '../controller/authController';
import { validateAuth } from '../middleware/auth';

const authRoute = Router();

const authController = new AuthController();

authRoute.post('/login', authController.login);
authRoute.post('/register', authController.register);
authRoute.get('/access', authController.accessToken);
authRoute.get('/decode', validateAuth, authController.decode);

export default authRoute;
