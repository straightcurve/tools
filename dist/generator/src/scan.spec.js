"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var process_1 = require("process");
var scan_1 = __importDefault(require("./scan"));
describe("scan", function () {
    it("should accept relative path", function () {
        var path = "src/generator/test/empty";
        chai_1.assert.doesNotThrow(function () { return scan_1.default(path); });
    });
    it("should accept absolute path", function () {
        var path = path_1.join(process_1.cwd(), "src/generator/test/empty");
        chai_1.assert.doesNotThrow(function () { return scan_1.default(path); });
    });
    it("should accept parent absolute path", function () {
        var path = path_1.join(process_1.cwd(), "../", "../");
        chai_1.assert.doesNotThrow(function () { return scan_1.default(path); });
    });
    it("should throw on file passed in", function () {
        var path = path_1.join(process_1.cwd(), "../", "scan.ts");
        chai_1.assert.throws(function () { return scan_1.default(path); });
    });
    it("should return empty array on empty directory", function () {
        var path = path_1.join(process_1.cwd(), "src/generator/test/empty");
        chai_1.assert.isEmpty(scan_1.default(path).files);
        chai_1.assert.isEmpty(scan_1.default(path).dirs);
    });
    it("should return files count", function () {
        var path = path_1.join(process_1.cwd(), "src/generator/test/parent");
        var result = scan_1.default(path);
        chai_1.assert.isTrue(result.files.length === 1);
        path = path_1.join(process_1.cwd(), "src/generator/test/files");
        chai_1.assert.isTrue(scan_1.default(path).files.length === 3);
        chai_1.assert.isTrue(scan_1.default(path).dirs.length === 0);
    });
    it("should return dirs count", function () {
        var path = path_1.join(process_1.cwd(), "src/generator/test/parent");
        var result = scan_1.default(path);
        chai_1.assert.isTrue(result.dirs.length === 1);
    });
    it("should return array with the file names inside the directory", function () {
        var path = path_1.join(process_1.cwd(), "src/generator/test/files");
        var result = scan_1.default(path);
        chai_1.assert.isTrue(result.files.length === 3);
        chai_1.assert.isTrue(result.files[0] === "_file");
        chai_1.assert.isTrue(result.files[1] === "_file copy");
        chai_1.assert.isTrue(result.files[2] === "_file copy 2");
    });
    it("should return array with the dir names inside the directory", function () {
        var path = path_1.join(process_1.cwd(), "src/generator/test/dirs");
        var result = scan_1.default(path);
        chai_1.assert.isTrue(result.dirs.length === 3);
        chai_1.assert.isTrue(result.dirs[0] === "dir");
        chai_1.assert.isTrue(result.dirs[1] === "dir copy");
        chai_1.assert.isTrue(result.dirs[2] === "dir copy 2");
    });
});
