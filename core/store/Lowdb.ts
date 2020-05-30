import Store, {Snapshot} from "./Store";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");

class LowDB implements Store {
  private dbPath: string;
  private adapter: any;
  private db: any;

  constructor (dbPath: string) {
    this.dbPath = dbPath;

    this.adapter = new FileSync(this.dbPath);

    this.db = low(this.adapter);
    this.db._.mixin(lodashId);
  }

  async insert (snapshot: Snapshot, tags?: string[]): Promise<Snapshot> {
    const snapshotCollection = this.db.defaults({["snapshot"]: []}).get("snapshot");
    const data = snapshotCollection.insert(snapshot).write();

    if (tags) {
      const tagsCollection = this.db.defaults({["tag"]: []}).get("tag");
      const tagsRelationCollection = this.db.defaults({["snapshotTag"]: []}).get("snapshotTag");

      tags.forEach((tag) => {
        let foundTag = this.db.get("tag").filter({name: tag}).take(1).value()[0];
        if (!foundTag) {
          foundTag = tagsCollection.insert({name: tag}).write();
        }

        tagsRelationCollection.insert({snapshotId: data.id, tagId: foundTag.id}).write();
      });
    }

    return {...data, tags: tags ? tags : []};
  }

  // @todo Better filter for dates only by day
  async select (
      params: { id?: number; creationDate?: Date },
      tags: string[] = [],
  ): Promise<Snapshot[]> {
    let result: any;

    if (tags.length > 0) {
      const foundTags = this.db.get("tag")
          .filter((tag: any) => tags.indexOf(tag.name) != -1)
          .value();

      const tagsId = foundTags.map((foundTag: any) => foundTag.id);
      const foundTagsRelation = this.db.get("snapshotTag")
          .filter((snapTag: any) => tagsId.indexOf(snapTag.tagId) != -1)
          .map("snapshotId")
          .value();

      result = this.db.get("snapshot")
          .filter((snap: any) => foundTagsRelation.indexOf(snap.id) != -1)
          .value();
    }

    if (!result) result = this.db.get("snapshot").filter(params).value();

    return result.map((snap: any) => {
      snap.tags = tags;
      return snap;
    });
  }

  async delete (id: number): Promise<Snapshot> {
    const result = this.db.get("snapshot").remove({id}).write();
    return result[0];
  }

  async findOne (params: { id?: number; date?: Date }): Promise<Snapshot> {
    const result = this.db.get("snapshot").filter(params).take(1).value();
    return result[0];
  }
}

export default LowDB;
