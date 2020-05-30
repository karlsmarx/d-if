import assert from "assert";

import {Snapshot} from "../../core/store/Store";
import LowDB from "../../core/store/Lowdb";

const dbPath = "db.json";
const db = new LowDB(dbPath);

export default describe("LowDB store tests", () => {
  let testResult: Snapshot;
  let taggedResult: Snapshot;

  it("Should create a snapshot and insert", async () => {
    const newSnapshot: Snapshot = {
      creationDate: new Date(),
      data: JSON.stringify({name: "lowDB"}),
    };

    const result = await db.insert(newSnapshot);

    assert.equal(result.creationDate, newSnapshot.creationDate);
    assert.equal(result.data, newSnapshot.data);

    testResult = result;
  });

  it("Should create a new snapshot and tag", async () => {
    const tags = ["test"];
    const newTaggedSnapshot: Snapshot = {
      creationDate: new Date(),
      data: JSON.stringify({name: "TaggedSnap"}),
    };

    const result = await db.insert(newTaggedSnapshot, tags);

    assert.equal(result.creationDate, newTaggedSnapshot.creationDate);
    assert.equal(result.data, newTaggedSnapshot.data);
    assert.deepEqual(result.tags, tags);

    taggedResult = result;
  });

  it("Should select a snapshot by date", async () => {
    const result = await db.select({creationDate: testResult.creationDate});
    assert.deepStrictEqual(result[0], testResult);
  });

  it("Should select a snapshot by tag", async () => {
    const result = await db.select({}, ["test"]);
    assert.deepStrictEqual(result.find((snap) => snap.id == taggedResult.id), taggedResult);
  });

  it("Should find one sanpshot by id", async () => {
    const result = await db.findOne({id: taggedResult.id});
    assert.deepStrictEqual(result, taggedResult);
  });

  it("Should delete a snapshot", async () => {
    const result = await db.delete(testResult.id || 0);
    assert.deepStrictEqual(result, testResult);
  });
});
