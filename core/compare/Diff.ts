import * as diff from "diff";

class Diff {
    constructor() { }

    private sanitize(obj: any) {
        const result: any = {};

        Object.keys(obj).forEach((key) => {
            if (Array.isArray(obj[key])) result[key] = [];
            if (typeof obj[key] === "object") result[key] = this.sanitize(obj[key]);

            result[key] = "";
        });

        return result;
    }

    async compare(previous: any, actual: any, ignoreValue: boolean = true) {
        // If will ignore values, clear all fields before use diff
        if (ignoreValue) {
            previous = this.sanitize(previous);
            actual = this.sanitize(actual);
        }

        const difference = diff.diffJson(previous, actual);

        // Generates jsonString with added/removed prefixes
        let jsonString = "";
        difference.forEach((part) => {
            let line = "";

            if (part.added) line += "+ ";
            if (part.removed) line += "- ";

            line += part.value;
            jsonString += line;
        });

        return { jsonString, difference };
    }
}

export default Diff;
