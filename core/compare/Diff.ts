import * as diff from "diff";

class Diff {
  private sanitize (obj: any): object {
    const result: any = {};

    Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key])) result[key] = [];
      if (typeof obj[key] === "object") result[key] = this.sanitize(obj[key]);

      result[key] = "";
    });

    return result;
  }

  async compare (previous: any, actual: any, ignoreValue = true): Promise<any> {
    // If will ignore values, clear all fields before use diff
    if (ignoreValue) {
      previous = this.sanitize(previous);
      actual = this.sanitize(actual);
    }

    const difference = diff.diffJson(previous, actual);

    // Generates jsonString with added/removed prefixes
    let jsonString = "";
    difference.forEach((part) => {
      let result = "";

      // ; Use to re-align
      const lines = part.value.split("\n");
      for (const line of lines) {
        if (line.length > 0) {
          result += `${part.added ? "+" : part.removed ? "-" : " "}${line}\n`;
        }
      }

      jsonString += result;
    });

    return {jsonString, difference};
  }
}

export default Diff;
