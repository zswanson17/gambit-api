import { Request, Response, Router } from 'express';
import { Pet } from '../types';
import { asyncHandler } from '../utils';

const router = Router();

router.get(
  '/',
  asyncHandler(async function (_request: Request, response: Response<Pet[]>) {
    const { user } = response.locals;

    const v = new Date(user.exp);

    response.json([
      {
        name: 'Arya',
        type: 'dog'
      },
      {
        name: 'Coulson',
        type: 'cat'
      }
    ]);
  })
);

export default router;
