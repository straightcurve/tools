"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var parse_1 = __importDefault(require("./parse"));
describe("tree-map: parse", function () {
    it("should return empty nodes array", function () {
        var nodes = parse_1.default("./src/tree-map/test/no-children");
        chai_1.assert.equal(nodes[0].nodes.length, 0);
    });
    it("should ignore self references", function () {
        var nodes = parse_1.default("./src/tree-map/test/self-ref");
        chai_1.assert.equal(nodes[0].nodes.length, 0);
    });
    it("should ignore dynamic templates", function () {
        var nodes = parse_1.default("./src/tree-map/test/dynamic");
        chai_1.assert.equal(nodes[0].nodes.length, 0);
    });
    it("should return node with ng-include as attribute", function () {
        var nodes = parse_1.default("./src/tree-map/test/attribute");
        chai_1.assert.equal(nodes.length, 1);
        chai_1.assert.equal(nodes[0].nodes.length, 1);
    });
});
