import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', function (_request: Request, response: Response) {
  console.log('request here', _request);
  response.json({
    http: 'ok',
    db: 'ok'
  });
});

export default router;
