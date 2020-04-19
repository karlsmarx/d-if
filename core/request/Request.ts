import RequestController from "./RequestController";
import METHODS from "./Method";

interface Endpoint {
  command: string;
  method: METHODS;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

class Request {
  private controller: RequestController;

  constructor () {
    this.controller = new RequestController();
  }

  // Send concurrent requests to different hosts then return
  // a object with the results for each one
  async multiple (hosts: string[], list: Endpoint[]): Promise<any> {
    // Cook Requests for each endpoint in list in all hosts
    const cookedRequests = hosts.map((host) => {
      return {
        host,
        requests: list.map((endpoint: Endpoint) => {
          const urlEncodedParams = endpoint.params ?
            `?${Request.urlEncode(endpoint.params)}` :
            "";

          const constructedUrl = `${host}/${endpoint.command}${urlEncodedParams}`;

          return this.controller.makeRequest(
              constructedUrl,
              endpoint.method,
              endpoint.data,
          );
        }),
      };
    });

    // Make request concurrently for each host
    const results = await Promise.all(
        cookedRequests.map(async (cooked) => {
          return {
            host: cooked.host,
            result: await this.controller.sendConcurrent(cooked.requests, false),
          };
        }),
    );

    // Return a map host/results
    return results;
  }

  // Convert params to urlEncode string ?key=value
  static urlEncode (params: Record<string, any> = {}): string {
    const encoded: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      encoded.push(`${key}=${value}`);
    });

    return encoded.join("&");
  }
}

export default Request;
