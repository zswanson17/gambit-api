import { PostgresProvider } from 'db/PostgresProvider';
import { Inject, Service } from 'typedi';
import { BaseRepository } from '../../db';
import { User } from '../../types';

@Service()
export class UserRepository extends BaseRepository<User> {
  public tableName = 'User';
  public columns = {
    id: { dataType: 'bigint', nullable: false, primaryKey: true },
    firstName: { dataType: 'varchar(50)', nullable: false },
    lastName: { dataType: 'varchar(50)', nullable: false },
    email: { dataType: 'varchar(100)', nullable: false },
    password: { dataType: 'varchar(100)', nullable: false }, // TODO: password validation
    token: { dataType: 'text', nullable: true },
    createdOn: { dataType: 'timestamp without time zone', nullable: false, hasDefault: true }
  };

  public async getByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.query(
      `SELECT ${this.getColumnList()} FROM "${this.tableName}" WHERE email = $1;`,
      [email]
    );

    if (!result.rows![0]) {
      return undefined;
    }

    return result.rows[0];
  }
}
