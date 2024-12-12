import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: string;
  name: string;
  email: string;
  imageURL?: string;
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is invalid' });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Admin access only' });
    return;
  }
  next();
};