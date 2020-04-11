import assert from "assert";
import RequestController from "../../core/request/RequestController";

const controller = new RequestController();
const host = "http://localhost:8090";

export default describe("RequestController Tests", () => {
    it("Should GET in /", async () => {
        const response = await controller.sendRequest(host, controller.METHODS.GET);
        assert.equal(response, "Hello World!");
    });

    it("Should POST in /", async () => {
        const data = { test: "post" };
        const response = await controller.sendRequest(host, controller.METHODS.POST, data);

        assert.deepStrictEqual(response, data);
    });

    it("Should PUT in /", async () => {
        const data = { test: "put" };
        const id = Math.floor(Math.random() * 10);
        const response = await controller.sendRequest(`${host}/${id}`, controller.METHODS.PUT, data);

        assert.deepStrictEqual(response, { id, ...data });
    });

    it("Should PATCH in /", async () => {
        const data = { test: "patch" };
        const id = Math.floor(Math.random() * 10);
        const response = await controller.sendRequest(`${host}/${id}`, controller.METHODS.PATCH, data);

        assert.deepStrictEqual(response, { id, ...data });
    });

    it("Should DELETE in /", async () => {
        const id = Math.floor(Math.random() * 10);
        const response = await controller.sendRequest(`${host}/${id}`, controller.METHODS.DELETE);

        assert.equal(response, id);
    });

    it("Should fail to GET by 404", async () => {
        try {
            await controller.sendRequest(`${host}/404`, controller.METHODS.GET);
        } catch(err) {
            assert.equal(err, "FAILED_REQUEST_STATUS_404");
        }
    });

    it("Should send concurrent requests", async () => {
        const r1 = controller.makeRequest(`${host}/1`, controller.METHODS.DELETE);
        const r2 = controller.makeRequest(`${host}/2`, controller.METHODS.DELETE);

        const responses = await controller.sendConcurrent([r1, r2]);
        assert.deepStrictEqual(responses, [1, 2]);
    });

    it("Should try concurrent requests and fail in one", async () => {
        const r1 = controller.makeRequest(`${host}/1`, controller.METHODS.DELETE);
        const r2 = controller.makeRequest(`${host}/404`, controller.METHODS.GET);

        try {
            await controller.sendConcurrent([r1, r2]);
        } catch (err) {
            assert.equal(err, "FAILED_REQUEST_STATUS_404");
        }
    });

    it("Should try concurrent requests and ignore fail in one", async () => {
        const r1 = controller.makeRequest(`${host}/1`, controller.METHODS.DELETE);
        const r2 = controller.makeRequest(`${host}/404`, controller.METHODS.GET);

        const results = await controller.sendConcurrent([r1, r2], false);
       assert.deepStrictEqual(results, [1, 'FAILED_REQUEST_STATUS_404']);
    });
});
