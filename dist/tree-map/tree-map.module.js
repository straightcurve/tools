"use strict";
/**
 * @module tree-map
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var process_1 = require("process");
var parse_1 = __importDefault(require("./src/parse"));
var args = process_1.argv.slice(2);
var in_public_dir = configure_in_dir_path("-path", null);
var out_tree = configure_out_file_path("-tree", "tree.json");
var out_slices = configure_out_file_path("-slices", "slices.json");
var tree = parse_1.default(in_public_dir);
var get_path_relative_to_public = function (path) {
    return path.slice(path.indexOf("public"));
};
var get_children_with_paths_relative_to_public = function (nodes) {
    return nodes.map(function (child) {
        child.path = get_path_relative_to_public(child.path);
        child.nodes = get_children_with_paths_relative_to_public(child.nodes);
        return child;
    });
};
tree = get_children_with_paths_relative_to_public(tree);
var slice = function (children, depth, slices) {
    var _a;
    if (depth === void 0) { depth = 0; }
    if (slices === void 0) { slices = []; }
    if (children.length === 0)
        return slices;
    if (slices[depth] === undefined)
        slices[depth] = [];
    (_a = slices[depth]).push.apply(_a, children.map(function (c) { return c.path; }));
    depth++;
    children.forEach(function (c) { return slice(c.nodes, depth, slices); });
    return slices;
};
var slices = slice(tree);
var fmt = function (nodes) {
    return nodes.map(function (n) { return ({
        path: n.path,
        children: fmt(n.nodes),
    }); });
};
fs_1.writeFileSync(out_tree, JSON.stringify(fmt(tree), null, 4));
console.log("[ CREATED ] " + out_tree);
fs_1.writeFileSync(out_slices, JSON.stringify(slices, null, 4));
console.log("[ CREATED ] " + out_slices);
function display_help() {
    console.log("\n    Usage: \n        tree-map [...options]\n\n    Options:\n        -p          [ path ]    the relative path to the public directory (required)\n        -tree       [ path ]    relative path to tree output file\n        -slices     [ path ]    relative path to slices output file\n    ");
}
function configure_out_file_path(option, _default) {
    var out_file = _default;
    if (args.includes(option))
        out_file = args[args.indexOf(option) + 1];
    if (out_file === undefined) {
        console.error("Used " + option + " but didn't specify a value!");
        process_1.exit(1);
    }
    if (!path_1.isAbsolute(out_file))
        out_file = path_1.join(process_1.cwd(), out_file);
    return out_file;
}
function configure_in_dir_path(option, _default) {
    var in_dir = _default;
    if (args.includes(option))
        in_dir = args[args.indexOf(option) + 1];
    if (in_dir === undefined) {
        console.error("Used " + option + " but didn't specify a value!");
        process_1.exit(1);
    }
    if (in_dir === null) {
        console.error("You need to use the " + option + " option!");
        console.log();
        display_help();
        process_1.exit(1);
    }
    return in_dir;
}
