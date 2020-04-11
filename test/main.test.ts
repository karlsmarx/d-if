import "mocha";

// Server instance
import request from "supertest";
import app from "./server";

const agent = request.agent(app);

// Test suites
import requestTests from "./Request";

describe("Tests", function () {
    let serverReady: any;
    this.timeout(3000);

    // Wait for server start
    app.on("serverReady", () => {
        console.log("Server Ready");

        if (serverReady instanceof Function) {
			serverReady();
		} else {
			serverReady = true;
		}
    });

    before((done) => {
        if (serverReady === true) {
			done();
		} else {
			serverReady = done;
		}
    });

    describe("Request Tests", () => {
        requestTests.RequestController;
    })
});