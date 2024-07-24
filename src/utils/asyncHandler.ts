import { Request, Response, NextFunction } from 'express';

/* eslint-disable  @typescript-eslint/no-explicit-any */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch((error) => {
    console.error('Error in async route handler:', error);
    next(error);
  });
};
export default asyncHandler;
