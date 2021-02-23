"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var scan_1 = __importDefault(require("./scan"));
function rec_scan_files(dir, filter) {
    return _rec_scan_files(dir);
    function _rec_scan_files(dir, files) {
        if (files === void 0) { files = []; }
        var result = scan_1.default(dir);
        var _files = result.files.map(function (f) { return path_1.join(dir, f); });
        if (filter)
            _files = _files.filter(filter);
        files.push.apply(files, _files);
        result.dirs.forEach(function (d) { return _rec_scan_files(path_1.join(dir, d), files); });
        return files;
    }
}
exports.default = rec_scan_files;
