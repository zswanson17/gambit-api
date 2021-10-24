import { Service } from 'typedi';
import express, { Express, json, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../config';
import routes from '../routes';

@Service()
export class ExpressHttpService {
  private server: Express;
  constructor(protected port: number) {
    this.server = express();
    this.setup();
    this.server.listen(this.port, () => {
      console.log(`gambit-api running at: http://localhost:${port}`);
    });
  }

  private setup() {
    this.server.use(json());
    this.applyAuthMiddleware();
    this.loadRoutes();
    this.applyErrorMiddleware();
  }

  private applyAuthMiddleware() {
    this.server.use((request: Request, response: Response, next: NextFunction) => {
      if (request.url.startsWith('/auth/') || request.url.startsWith('/health/')) {
        return next();
      }

      const token = request.body.token || request.query.token || request.headers['x-access-token'];

      if (!token) {
        return response.status(403).json('Missing token');
      }

      try {
        const decoded = jwt.verify(token, auth.tokenKey) as string;

        if (new Date() >= new Date((decoded as any).exp * 1000)) {
          return response.status(401).json('Token expired');
        }

        response.locals.user = decoded as any;
      } catch (error) {
        console.error('Error verifyihg token', error);
        return response.status(401).json('Invalid token');
      }

      return next();
    });
  }

  private loadRoutes() {
    for (const routePath in routes) {
      this.server.use(routePath, routes[routePath]);
    }
  }

  private applyErrorMiddleware() {
    this.server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
      console.error(`Request error: ${request.url}`, error);
      response.status(500).json({
        name: error.name,
        message: error.message
      });
    });
  }
}
