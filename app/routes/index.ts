import { Router } from 'express';
import auth from './auth';
import health from './health';
import pets from './pets';

export default <
  {
    [key: string]: Router;
  }
>{
  '/auth': auth,
  '/health': health,
  '/pets': pets
};
