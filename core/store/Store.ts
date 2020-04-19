/**
 * Store interface to be used in all database connections.
 *
 * This file defines all methods used by d-if to store snapshots
 * persistently.
 */
interface Store {
  insert(table: string, params: Record<string, any>): Promise<any>;

  select(table: string, params: Record<string, any>, limit?: number): Promise<any>;

  delete(table: string, params: Record<string, any>): Promise<any>;

  findOne(table: string, params: Record<string, any>): Promise<any>;
}

export default Store;
