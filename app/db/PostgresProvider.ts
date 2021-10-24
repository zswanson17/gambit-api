import { Service } from 'typedi';
import { Pool, PoolClient, PoolConfig, QueryResult } from 'pg';
import path from 'path';
import { db } from '../config';
import { migrate } from 'postgres-migrations';

@Service({ transient: true })
export class PostgresProvider {
  private pool: Pool;

  private config: PoolConfig = {
    user: db.user,
    password: db.password,
    database: db.name,
    host: db.host,
    port: db.port
  };

  constructor() {
    this.pool = new Pool(this.config);
  }

  public async query(text: string, params?: any[]): Promise<QueryResult<any>> {
    const start = Date.now();
    const result = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: result.rowCount });
    return result;
  }

  public async getClient(): Promise<PoolClient> {
    const client = await this.pool.connect();
    return client;
  }

  public async ping(): Promise<boolean> {
    const result = await this.query('SELECT NOW() as now;');
    return result?.rows[0]?.now;
    // TODO: test global error handler here?
  }

  public async runMigrations() {
    const client = await this.getClient();
    try {
      await migrate({ client }, path.join(__dirname, './migrations'));
    } catch (error) {
      console.error('Error running db migrations', error);
    } finally {
      client.release();
    }
  }
}
