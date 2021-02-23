"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var process_1 = require("process");
var component_1 = __importDefault(require("./component"));
describe("generate component structure", function () {
    it("should throw if arguments < 1", function () {
        chai_1.assert.throws(function () { return component_1.default.parse([]); });
    });
    it("should create directory with component name in current directory", function () {
        chai_1.assert.equal(component_1.default.from(["hello"]).folder_path, path_1.join(process_1.cwd(), "hello"));
    });
    it("should return absolute html path", function () {
        chai_1.assert.equal(component_1.default.from(["hello"]).html_path, path_1.join(process_1.cwd(), "hello", "hello.html"));
    });
    it("should return relative to `public` directory html path", function () {
        chai_1.assert.equal(component_1.default.from(["../test/public/hello"]).html_path, path_1.join("hello", "hello.html"));
    });
    it("should set proper name if it ends with .js", function () {
        var impl = component_1.default.from([path_1.join("../test", "zxc.js"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.component.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "zxc.component.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name/path/filename/folder_path", function () {
        var impl = component_1.default.from([path_1.join("../test", "zxc"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.component.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "zxc.component.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name for dynamic version component", function () {
        var impl = component_1.default.from([path_1.join("../test", "zxc"), "-v", "4"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.component.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "zxc.component.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name/path/filename/folder_path relative", function () {
        var impl = component_1.default.from([path_1.join("../test", "zxc/xyz"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "xyz");
        chai_1.assert.equal(impl.filename, "xyz.component.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc/xyz", "xyz.component.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc/xyz"));
    });
    it("should set proper name for dynamic version component relative", function () {
        var impl = component_1.default.from([path_1.join("../test", "zxc/xyz"), "-v", "4"]);
        chai_1.assert.equal(impl.name, "xyz");
        chai_1.assert.equal(impl.filename, "xyz.component.js");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc/xyz", "xyz.component.js"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc/xyz"));
    });
});
