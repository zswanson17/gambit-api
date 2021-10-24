import { Router } from 'express';
import health from './health';

export default <
  {
    [key: string]: Router;
  }
>{
  '/health': health
};
