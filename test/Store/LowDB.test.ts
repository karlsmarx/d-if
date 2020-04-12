import assert from "assert";

import LowDB from "../../core/store/Lowdb";

const dbPath = "db.json";
const db = new LowDB(dbPath);

export default describe("LowDB store tests", () => {
    let testResult: any;

    it("Should create a table and insert value", async () => {
        const result = await db.insert("test", { name: "lowDB" });
        assert.equal(result.name, "lowDB");

        testResult = result;
    });

    it("Should select a value", async () => {
        const result = await db.select("test", { id: testResult.id });
        assert.deepStrictEqual(result[0], testResult);
    });

    it("Should delete a value", async () => {
        const result = await db.delete("test", { id: testResult.id });
        assert.deepStrictEqual(result[0], testResult);
    });
});
