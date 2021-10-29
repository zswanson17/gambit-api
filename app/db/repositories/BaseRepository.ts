import { Inject } from 'typedi';
import { PostgresProvider } from '../../db';
import { RepositoryColumn, User } from '../../types';

export abstract class BaseRepository<T> {
  @Inject() protected db!: PostgresProvider;

  public abstract tableName: string;
  public abstract columns: { [key: string]: RepositoryColumn };

  public getColumnList() {
    return Object.keys(this.columns)
      .map(column => `"${column}"`)
      .join(',');
  }

  public async insert(data: Partial<T>): Promise<T> {
    const params: any[] = [];
    let sql = `INSERT INTO "${this.tableName}"(`;
    sql += Object.keys(data)
      .map(key => {
        params.push((data as any)[key]); // TODO: get rid of any
        return `"${key}"`;
      })
      .join(',');
    sql += ') VALUES (';
    sql += params.map((_, index) => `\$${index + 1}`).join(',');
    sql += ') RETURNING *;';

    const result = await this.db.query(sql, params);
    return result.rows[0];
  }

  public async update(id: number, data: Partial<T>): Promise<T> {
    const params: any[] = [];
    let sql = `UPDATE "${this.tableName}" SET`;
    let counter = 0;
    sql += Object.keys(data).map((key, index) => {
      params.push((data as any)[key]);
      counter += 1;
      return ` "${key}" = \$${counter}`;
    });
    params.push(id);
    sql += ` WHERE id = \$${counter + 1} RETURNING *;`;

    const result = await this.db.query(sql, params);
    return result.rows[0];
  }
}
