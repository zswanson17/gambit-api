import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import { UserService } from '../services';
import { RegisterUserRequest } from '../types';
import { asyncHandler } from '../utils';

const router = Router();

router.post(
  '/register',
  asyncHandler(async function (request: Request, response: Response) {
    const input = request.body as RegisterUserRequest;
    const user = await Container.get(UserService).register(input);
    const { id, email, firstName, lastName, token } = user;
    response.status(201).json({ id, email, firstName, lastName, token });
  })
);

router.post(
  '/login',
  asyncHandler(async function (request: Request, response: Response) {
    const input = request.body as { email: string; password: string };
    const user = await Container.get(UserService).login(input);
    const { id, email, firstName, lastName, token } = user;
    response.status(200).json({ id, email, firstName, lastName, token });
  })
);

export default router;
