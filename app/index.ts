import 'reflect-metadata';
import Container from 'typedi';
import { ExpressHttpService } from './services';

function start() {
  Container.set(ExpressHttpService, new ExpressHttpService(1717));
}

start();
