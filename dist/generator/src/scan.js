"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importStar(require("fs"));
var path_1 = require("path");
var process_1 = require("process");
function scan(dir) {
    if (!path_1.isAbsolute(dir))
        dir = path_1.join(process_1.cwd(), dir);
    var stat = fs_1.statSync(dir);
    if (!stat.isDirectory())
        throw new Error(dir + " is not a directory!");
    var files = fs_1.default.readdirSync(dir);
    if (files.length === 0)
        return {
            files: [],
            dirs: [],
        };
    return {
        files: files.filter(function (f) {
            var path = path_1.join(dir, f);
            return !(fs_1.statSync(path).isDirectory());
        }),
        dirs: files.filter(function (f) {
            var path = path_1.join(dir, f);
            return (fs_1.statSync(path).isDirectory());
        }),
    };
}
exports.default = scan;
;
