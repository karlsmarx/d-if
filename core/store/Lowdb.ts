import Store from "./Store";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");

class LowDB implements Store {
    private dbPath: string;
    private adapter: any;
    private db: any;

    constructor(dbPath: string) {
        this.dbPath = dbPath;

        this.adapter = new FileSync(dbPath);

        this.db = low(this.adapter);
        this.db._.mixin(lodashId);
    }

    async insert(table: string, params: Object) {
        const collection = this.db.defaults({ [table]: [] }).get(table);
        return collection.insert(params).write();
    }

    async select(table: string, params: Object, limit?: number) {
        return this.db.get(table).filter(params).take(limit).value();
    }

    async delete(table: string, params: Object) {
        return this.db.get(table).remove(params).write();
    }

    async findOne(table: string, params: Object) {
        const result = this.db.get(table).filter(params).take(1).value();
        return result[0];
    }
}

export default LowDB;