import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

function xssFilterMiddleware(req: Request, res: Response, next: NextFunction) {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  function sanitize(obj: any) {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        obj[key] = sanitize(obj[key]);
      }
    } else if (typeof obj === 'string') {
      obj = xss(obj);
    }
    return obj;
  }

  if (req.query) {
    for (const key in req.query) {
      req.query[key] = xss(req.query[key] as string);
    }
  }

  if (req.body) {
    req.body = sanitize(req.body);
  }

  next();
}

export default xssFilterMiddleware;
