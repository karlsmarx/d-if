/**
 * Store interface to be used in all database connections.
 * 
 * This file defines all methods used by d-if to store snapshots
 * persistently.
 */
interface Store {
    insert(table: string, params: Object): Promise<any>;

    select(table: string, params: Object, limit?: number): Promise<any>;

    delete(table: string, params: Object): Promise<any>;

    findOne(table: string, params: Object): Promise<any>;
}

export default Store;