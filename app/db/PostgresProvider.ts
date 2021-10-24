import { Service } from 'typedi';
import { Pool, PoolClient, QueryResult } from 'pg';
import { db } from '../config';

@Service({ transient: true })
export class PostgresProvider {
  private pool;
  constructor() {
    this.pool = new Pool({
      user: db.user,
      password: db.password,
      database: db.name,
      host: db.host,
      port: db.port
    });
  }

  public async query(text: string, params: any[]): Promise<QueryResult<any>> {
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
}
