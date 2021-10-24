import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import { UserService } from '../services';
import { RegisterUserRequest } from '../types';
import { asyncHandler } from '../utils';

const router = Router();

router.post(
  '/register',
  asyncHandler(async function (request: Request, response: Response) {
    const userInput = request.body as RegisterUserRequest;
    const user = await Container.get(UserService).register(userInput);
    response.json(user);
  })
);

export default router;
