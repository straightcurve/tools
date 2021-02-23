"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var process_1 = require("process");
var view_1 = __importDefault(require("./view"));
describe("generate view structure", function () {
    it("should throw if arguments < 1", function () {
        chai_1.assert.throws(function () { return view_1.default.parse([]); });
    });
    it("should create directory with view name in current directory", function () {
        chai_1.assert.equal(view_1.default.from(["hello"]).folder_path, path_1.join(process_1.cwd(), "hello"));
    });
    it("should set proper name if it ends with .html", function () {
        var impl = view_1.default.from([path_1.join("../test", "zxc.html"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.html");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "zxc.html"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name/path/filename/folder_path", function () {
        var impl = view_1.default.from([path_1.join("../test", "zxc"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.html");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "zxc.html"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name for dynamic version view", function () {
        var impl = view_1.default.from([path_1.join("../test", "zxc"), "-v", "4"]);
        chai_1.assert.equal(impl.name, "zxc");
        chai_1.assert.equal(impl.filename, "zxc.html");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc", "zxc.html"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc"));
    });
    it("should set proper name/path/filename/folder_path relative", function () {
        var impl = view_1.default.from([path_1.join("../test", "zxc/xyz"), "-v", "1"]);
        chai_1.assert.equal(impl.name, "xyz");
        chai_1.assert.equal(impl.filename, "xyz.html");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc/xyz", "xyz.html"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc/xyz"));
    });
    it("should set proper name for dynamic version view relative", function () {
        var impl = view_1.default.from([path_1.join("../test", "zxc/xyz"), "-v", "4"]);
        chai_1.assert.equal(impl.name, "xyz");
        chai_1.assert.equal(impl.filename, "xyz.html");
        chai_1.assert.equal(impl.path, path_1.join(process_1.cwd(), "../test/zxc/xyz", "xyz.html"));
        chai_1.assert.equal(impl.folder_path, path_1.join(process_1.cwd(), "../test/zxc/xyz"));
    });
});
