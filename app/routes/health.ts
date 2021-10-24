import { Request, Response, Router } from 'express';
import Container from 'typedi';
import { PostgresProvider } from '../db';

const router = Router();

router.get('/', async function (_request: Request, response: Response) {
  const db = Boolean(await Container.get(PostgresProvider).ping());

  response.json({
    http: true,
    db
  });
});

export default router;
