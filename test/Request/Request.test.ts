import assert from "assert";

import Request from "../../core/request";
import METHODS from "../../core/request/Method";

const request = new Request();

export default describe("Request Tests", () => {
    it("Should make request to multiple hosts", async () => {
        const hosts = ["http://localhost:8090", "http://localhost:8080"];
        const endpoints = [
            { command: "user", method: METHODS.GET },
            { command: "user", method: METHODS.GET, params: { name: "Karl" } },
            { command: "user", method: METHODS.POST, data: { test: "request" } },
        ];

        const result = await request.multiple(hosts, endpoints);

        assert.equal(result.length, 2); // assert return for two hosts
        hosts.forEach((host, idx) => assert.equal(host, result[idx].host)); // assert host values and sequence
    });
});
