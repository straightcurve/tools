"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var rec_scan_files_1 = __importDefault(require("./rec_scan_files"));
describe("recursively scan files", function () {
    it("should accept relative path", function () {
        var path = "src/generator/test/empty";
        chai_1.assert.doesNotThrow(function () { return rec_scan_files_1.default(path); });
    });
    it("should accept absolute path", function () {
        var path = path_1.join(__dirname, "../", "test", "empty");
        chai_1.assert.doesNotThrow(function () { return rec_scan_files_1.default(path); });
    });
    it("should accept parent absolute path", function () {
        var path = path_1.join(__dirname, "../", "../");
        chai_1.assert.doesNotThrow(function () { return rec_scan_files_1.default(path); });
    });
    it("should throw on file passed in", function () {
        var path = path_1.join(__dirname, "../", "rec_scan.ts");
        chai_1.assert.throws(function () { return rec_scan_files_1.default(path); });
    });
    it("should return empty array on empty directory", function () {
        var path = path_1.join(__dirname, "../", "test", "empty");
        chai_1.assert.isEmpty(rec_scan_files_1.default(path));
        chai_1.assert.isEmpty(rec_scan_files_1.default(path));
    });
    it("should return files count", function () {
        var path = path_1.join(__dirname, "../", "test", "parent");
        var result = rec_scan_files_1.default(path);
        chai_1.assert.equal(result.length, 2);
        path = path_1.join(__dirname, "../", "test", "files");
        chai_1.assert.isTrue(rec_scan_files_1.default(path).length === 3);
    });
    it("should return array with the absolute paths of the files inside the directory", function () {
        var path = path_1.join(__dirname, "../", "test", "files");
        var result = rec_scan_files_1.default(path);
        chai_1.assert.isTrue(result.length === 3);
        chai_1.assert.isTrue(result[0] === path_1.join(path, "_file"));
        chai_1.assert.isTrue(result[1] === path_1.join(path, "_file copy"));
        chai_1.assert.isTrue(result[2] === path_1.join(path, "_file copy 2"));
    });
    it("should return array with the absolute paths of the files inside child directories", function () {
        var path = path_1.join(__dirname, "../", "test", "dirs");
        var result = rec_scan_files_1.default(path);
        chai_1.assert.isTrue(result.length === 8);
        chai_1.assert.isTrue(result[0] === path_1.join(path, "_file"));
        chai_1.assert.isTrue(result[1] === path_1.join(path, "_file copy"));
        chai_1.assert.isTrue(result[2] === path_1.join(path, "_file copy 2"));
        chai_1.assert.isTrue(result[3] === path_1.join(path, "dir", "_file"));
        chai_1.assert.isTrue(result[4] === path_1.join(path, "dir", "_file copy"));
        chai_1.assert.isTrue(result[5] === path_1.join(path, "dir", "_file copy 2"));
        chai_1.assert.isTrue(result[6] === path_1.join(path, "dir copy", "_file copy"));
        chai_1.assert.isTrue(result[7] === path_1.join(path, "dir copy 2", "_file copy 2"));
    });
    it("should filter files based on user specified function", function () {
        var path = path_1.join(__dirname, "../", "test", "dirs");
        var result = rec_scan_files_1.default(path, function (file) {
            return file.includes("2");
        });
        chai_1.assert.isTrue(result.length === 3);
        chai_1.assert.isTrue(result[0] === path_1.join(path, "_file copy 2"));
        chai_1.assert.isTrue(result[1] === path_1.join(path, "dir", "_file copy 2"));
        chai_1.assert.isTrue(result[2] === path_1.join(path, "dir copy 2", "_file copy 2"));
    });
});
