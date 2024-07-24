import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './src/middleware/errors';
import { json } from 'body-parser';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './src/routes/authRoute';
import xssFilterMiddleware from './src/middleware/xssFilter';

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 8000;

app.use(json());
app.use(hpp());

// for dev purpose
app.use(
  cors({
    origin: '*',
  }),
);

app.use(morgan('dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);
app.use(xssFilterMiddleware);

app.use('/api/v1/auth', authRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Auth server at http://localhost:${port}`);
});
