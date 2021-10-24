export interface RepositoryColumn {
  dataType: string;
  nullable: boolean;
  primaryKey?: boolean;
  hasDefault?: boolean;
}
