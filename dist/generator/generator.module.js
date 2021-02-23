"use strict";
/**
 * @module generator
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var generate_1 = __importDefault(require("./src/generate"));
var rec_scan_files_1 = __importDefault(require("./src/rec_scan_files"));
var exclude = ["installer", "generator"];
var include = [];
var out_file = "scripts.json";
if (!path_1.isAbsolute(out_file))
    out_file = path_1.join(__dirname, out_file);
var build = function () {
    var output = child_process_1.execSync("npm run build").toString();
    console.log(output);
    if (output.toLowerCase().includes("error"))
        return false;
    return true;
};
build();
var modules = rec_scan_files_1.default(path_1.join(__dirname, "../"), function (f) {
    return f.endsWith(".module.js");
});
console.log.apply(console, __spreadArrays(["Found modules:\n"], modules.map(function (m) { return "\n\t" + m; })));
console.log();
var scripts = modules.map(generate_1.default).filter(function (s) {
    var included = include.includes(s.name);
    var excluded = exclude.includes(s.name);
    if (include.length === 0) {
        if (exclude.length === 0)
            return true;
        return !excluded;
    }
    if (exclude.length === 0) {
        if (include.length === 0)
            return true;
        return included;
    }
    return included && !excluded;
});
if (scripts.length === 0)
    console.log("No scripts found that match criteria.");
console.log("Writing script configuration to " + out_file);
fs_1.writeFileSync(out_file, JSON.stringify(scripts, null, 4));
