
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        name: string;
        email: string;
        imageURL?: string;
      };
    }
  }
}