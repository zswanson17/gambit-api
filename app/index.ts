import 'reflect-metadata';
import Container from 'typedi';
import { PostgresProvider } from './db';
import { ExpressHttpService } from './services';

async function start() {
  await Container.get(PostgresProvider).runMigrations();
  Container.set(ExpressHttpService, new ExpressHttpService(1717));
}

start();
