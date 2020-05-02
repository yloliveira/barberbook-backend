import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new Error('JWT token is missing.');
  }

  const [, token] = authorization.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    return next();
  } catch {
    throw new Error('Invalid JWT token.');
  }
}

export default ensureAuthenticated;
