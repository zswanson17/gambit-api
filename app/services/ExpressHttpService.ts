import { Service } from 'typedi';
import express, { Express, json, NextFunction, Request, Response } from 'express';
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
    this.loadRoutes();
    this.applyErrorMiddleware();
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
