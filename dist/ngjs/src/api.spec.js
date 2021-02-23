"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var process_1 = require("process");
var api_1 = __importDefault(require("./api"));
describe("generate api structure", function () {
    it("should throw if arguments < 1", function () {
        chai_1.assert.throws(function () { return api_1.default.parse([]); });
    });
    it("should create api in current directory", function () {
        chai_1.assert.equal(api_1.default.from(["hello"]).folder_path, path_1.join(process_1.cwd()));
    });
    it("should set proper name if it ends with .js", function () {
        var impl = api_1.default.from([path_1.join("../test", "zxc.js"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.api.v1.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test", "zxc.api.v1.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test"));
    });
    it("should set proper name/path/filename/folder_path", function () {
        var impl = api_1.default.from([path_1.join("../test", "zxc"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.api.v1.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test", "zxc.api.v1.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test"));
    });
    it("should set proper name for dynamic version api", function () {
        var impl = api_1.default.from([path_1.join("../test", "zxc"), "-v", "4"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.api.v4.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test", "zxc.api.v4.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test"));
    });
    it("should set proper name/path/filename/folder_path relative", function () {
        var impl = api_1.default.from([path_1.join("../test", "zxc/xyz"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "xyz");
        chai_1.assert.equal(impl.filename, "xyz.api.v1.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "xyz.api.v1.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name for dynamic version api relative", function () {
        var impl = api_1.default.from([path_1.join("../test", "zxc/xyz"), "-v", "4"]);
        chai_1.assert.equal(impl.name, "xyz");
        chai_1.assert.equal(impl.filename, "xyz.api.v4.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "xyz.api.v4.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
});
