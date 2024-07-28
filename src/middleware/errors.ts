import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
export interface IAxiosResponse<T = any, D = any> {
  response?: AxiosResponse<T, D>;
  data: {
    error: T;
    message: string;
    data?: T;
  };
}

export const errorHandler = (err: IAxiosResponse, req: Request, res: Response, next: NextFunction) => {
  console.error(err?.response?.status, err?.response?.data?.error);
  res.status(err?.response?.status || 500).json({ error: err?.response?.data?.error ?? 'Something went wrong!' });
};
