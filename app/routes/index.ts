import { Router } from 'express';
import health from './health';
import auth from './auth';

export default <
  {
    [key: string]: Router;
  }
>{
  '/health': health,
  '/auth': auth
};
