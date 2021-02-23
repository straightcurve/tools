"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var process_1 = require("process");
var generate_1 = __importDefault(require("./generate"));
describe("generate command", function () {
    it("should throw if arguments < 2", function () {
        chai_1.assert.throws(function () { return generate_1.default([]); });
        chai_1.assert.throws(function () { return generate_1.default(["c"]); });
    });
    it("should throw if type not supported", function () {
        chai_1.assert.throws(function () { return generate_1.default(["z", "asd"]); });
    });
    it("should throw if absolute path", function () {
        chai_1.assert.throws(function () { return generate_1.default(["c", path_1.join(process_1.cwd(), "asd")]); });
    });
});
