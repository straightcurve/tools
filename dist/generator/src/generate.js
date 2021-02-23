"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
function generate(path) {
    if (!path_1.isAbsolute(path))
        throw new Error("path needs to be absolute!");
    var script = {
        extension: "",
        filename: path.slice(path.lastIndexOf("/") + 1),
        name: "",
        path: path,
    };
    script.extension = script.filename.slice(script.filename.lastIndexOf(".") + 1);
    script.name = script.filename.slice(0, script.filename.indexOf("."));
    return script;
}
exports.default = generate;
