import fs from "fs";

import Request from "./request";
import Compare from "./compare";
import reports from "./compare/reports";

class Controller {
  async make (actual: any, previous: any, endpoints: any, snapshot = false): Promise<any> {
    const endpointsJSON = fs.readFileSync(endpoints, "utf8");
    const endpointsDefinition = JSON.parse(endpointsJSON);

    const request = new Request();
    const diff = new Compare();

    const requestData = await request.multiple([actual, previous], endpointsDefinition.endpoints);
    const difference = await diff.compare(requestData[0], requestData[1], false);

    reports.Console.default(difference.jsonString);

    return requestData;
  }
}

export default Controller;
