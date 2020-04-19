import assert from "assert";

import Diff from "../../core/compare/Diff";

const diff = new Diff();

export default describe("Diff test", () => {
    const previous = { name: "Karl", lastName: "Marx" };
    const actual = { name: "Karl", lastName: "Alexander" };

    it("Should compare two objects ignoring values", async () => {
        const result = await diff.compare(previous, actual);
        assert.equal(result.difference.filter((el) => (el.removed || el.added)).length, 0);
    });

    it("Should compare two objects using values", async () => {
        const result = await diff.compare(previous, actual, false);
        console.log(result);
        assert.equal(result.difference.filter((el) => (el.removed || el.added)).length, 2);
    });
});
