import { Service } from 'typedi';
import express, { Express, json } from 'express';
import routes from '../routes';

@Service()
export class ExpressHttpService {
  private server: Express;
  constructor(protected port: number) {
    this.server = express();
    this.server.use(json());
    this.loadRoutes();

    this.server.listen(this.port, () => {
      console.log(`http server listening at: http://localhost:${port}`);
    });
  }

  private loadRoutes() {
    for (const routePath in routes) {
      this.server.use(routePath, routes[routePath]);
    }
  }
}
