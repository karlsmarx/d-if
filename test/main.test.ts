import "mocha";

// Server instance
import request from "supertest";
import app from "./server";

request.agent(app);

// Test suites
import requestTests from "./Request";
import storeTests from "./Store";
import compareTests from "./Compare";
import e2eTests from "./E2E";

describe("Tests", function () {
  let serverReady: any;

  this.timeout(3000); // eslint-disable-line

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
    requestTests.Request;
  });

  describe("Store Tests", () => {
    storeTests.LowDB;
  });

  describe("Compare Tests", () => {
    compareTests.Diff;
  });

  describe("End to End Tests", () => {
    e2eTests;
  });
});
