import express from 'express';
import AuthController from '../controller/authController';

const authRoute = express.Router();

const authController = new AuthController();

authRoute.post('/login', authController.login);

authRoute.post('/register', authController.register);

authRoute.get('/access', authController.accessToken);

export default authRoute;
