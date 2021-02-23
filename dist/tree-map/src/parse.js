"use strict";
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
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = require("fs");
var path_1 = require("path");
var process_1 = require("process");
var rec_scan_files_1 = __importDefault(require("../../generator/src/rec_scan_files"));
function parse(dir) {
    var _public = path_1.join(process_1.cwd(), dir);
    var files = rec_scan_files_1.default(_public);
    var html_files = files.filter(function (f) { return f.endsWith(".html"); });
    //@ts-ignore
    var nodes = html_files
        .map(function (path) {
        var content = fs_1.readFileSync(path).toString();
        var $ = cheerio_1.default.load(content);
        var includes = __spreadArrays($("ng-include")
            .filter(function (e, elem) {
            var src = read_src(elem.attribs);
            if (src === null)
                return false;
            var abs_src_path = path_1.join(_public, src);
            return abs_src_path !== path;
        })
            .toArray(), $("[ng-include]")
            .filter(function (e, elem) {
            var src = read_src(elem.attribs);
            if (src === null)
                return false;
            var abs_src_path = path_1.join(_public, src);
            return abs_src_path !== path;
        })
            .toArray());
        var child = {
            path: path,
            //@ts-ignore
            children: [],
            nodes: [],
        };
        if (includes.length === 0)
            return child;
        //@ts-ignore
        child.children = includes
            .map(function (e) {
            var src = read_src(e.attribs);
            if (src === null)
                return null;
            return path_1.join(_public, src);
        })
            .filter(function (src) { return src !== null; });
        return child;
    })
        .filter(function (n) { return n !== null; });
    nodes.forEach(rec_find_children_nodes);
    return nodes;
    function rec_find_children_nodes(parent) {
        parent.children.forEach(function (cpath) {
            var child = nodes.find(function (cn) { return cn.path === cpath; });
            if (child === undefined)
                return;
            parent.nodes.push(child);
            nodes = nodes.filter(function (n) { return n !== child; });
            rec_find_children_nodes(child);
        });
    }
}
exports.default = parse;
function read_src(attribs) {
    var path = attribs["ng-include"] || attribs.src;
    var code = path.charCodeAt(0);
    if (code !== "'".charCodeAt(0) && code !== '"'.charCodeAt(0))
        return null;
    return path.slice(1, path.length - 1);
}
