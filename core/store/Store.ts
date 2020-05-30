/**
 * Snapshot type to be used when store data
 * for future comparations.
 *
 * Node doesn't have a good support for static
 * binary, so for all purposes the data will be a
 * string that could be manipulated as a Buffer
 * or stream.
 */
interface Snapshot {
  id?: number;
  creationDate: Date;
  data: string;
  tags?: string[];
}

/**
 * Tag interface to use when store metadata tags
 * for snapshots
 */
interface Tag {
  id?: number;
  name: string;
}

/**
 * Store interface to be used in all database connections.
 *
 * This file defines all methods used by d-if to store snapshots
 * persistently.
 */
interface Store {
  insert(snapshot: Snapshot, tags?: string[]): Promise<Snapshot>;

  select(
    params: { id?: number; date?: Date },
    tags?: string[],
    limit?: number
  ): Promise<Snapshot[]>;

  delete(id: number): Promise<Snapshot>;

  findOne(params: { id?: number; date?: Date }): Promise<Snapshot>;
}

export default Store;
export {
  Snapshot,
  Tag,
};
