// Return a promise that never rejects. If have a error, resolve with
const unrejectablePromise = (func: Promise<any>): any => {
  return new Promise((resolve) => {
    func
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          resolve(err);
        });
  });
};

export default {
  unrejectablePromise,
};
