"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path_1 = require("path");
var generate_1 = __importDefault(require("../src/generate"));
var rec_scan_files_1 = __importDefault(require("../src/rec_scan_files"));
describe("generate a single script", function () {
    it("should throw if relative path", function () {
        chai_1.assert.throws(function () { return generate_1.default("./scan.ts"); });
    });
    it("should set proper path", function () {
        var path = path_1.join(__dirname, "../", "test", "modules");
        var module = rec_scan_files_1.default(path, function (f) { return f.endsWith(".module.js"); })[0];
        chai_1.assert.equal(generate_1.default(module).path, module);
    });
    it("should set proper filename", function () {
        var path = path_1.join(__dirname, "../", "test", "modules");
        var module = rec_scan_files_1.default(path, function (f) { return f.endsWith(".module.js"); })[0];
        chai_1.assert.equal(generate_1.default(module).filename, "asd.module.js");
    });
    it("should set proper extension", function () {
        var path = path_1.join(__dirname, "../", "test", "modules");
        var module = rec_scan_files_1.default(path, function (f) { return f.endsWith(".module.js"); })[0];
        chai_1.assert.equal(generate_1.default(module).extension, "js");
    });
    it("should set proper name", function () {
        var path = path_1.join(__dirname, "../", "test", "modules");
        var module = rec_scan_files_1.default(path, function (f) { return f.endsWith(".module.js"); })[0];
        chai_1.assert.equal(generate_1.default(module).name, "asd");
    });
});
