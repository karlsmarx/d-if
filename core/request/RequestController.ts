import axios from "axios";

import util from "../util";
import methods from "./Method";

// Add a response interceptor to format request errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        return Promise.reject(`FAILED_REQUEST_STATUS_${error.response.status}`);
      }
      return Promise.reject(error.code);
    },
);

axios.defaults.timeout = 1000;

// Request class to use axios in concurrence
class CookedRequest {
  public url: string;
  public method: methods;
  public data: Record<string, any> = {};

  constructor (url: string, method: methods, data?: Record<string, any>) {
    this.url = url;
    this.method = method;

    if (data) this.data = data;
  }

  // Generate a new axios request to use in concurrent requests
  async get (): Promise<any> {
    return axios.request({
      url: this.url,
      method: this.method,
      data: this.data,
    });
  }
}

// Controller class
class RequestController {
  public METHODS = methods;

  // Cook a new instance of Request class
  makeRequest (
      url: string,
      method: methods,
      data?: Record<string, any>,
  ): CookedRequest {
    return new CookedRequest(url, method, data);
  }

  // Get a list of Request instances and try to execute. The stopOnFail
  // option defines if the method will stop when one of requests fail.
  async sendConcurrent (requests: CookedRequest[], stopOnFail = true): Promise<any[]> {
    const responses = await Promise.all(
        requests.map(async (request) => {
          if (stopOnFail) return request.get();

          const result: any = await util.unrejectablePromise(request.get());
          return result.data ? result : {data: result};
        }),
    );

    return responses.map((response) => response.data);
  }

  // Send a RAW request
  static async sendRequest (
      url: string,
      method: methods,
      data?: Record<string, any>,
  ): Promise<any> {
    const response = await axios.request({url, method, data});
    return response.data;
  }
}

export default RequestController;
