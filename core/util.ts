// Return a promise that never rejects. If have a error, resolve with
const unrejectablePromise = (func: Promise<any>) => {
    return new Promise((resolve) => {
        func
            .then((result) => resolve(result))
            .catch((err) => resolve(err));
    });
};

export default {
    unrejectablePromise,
}
