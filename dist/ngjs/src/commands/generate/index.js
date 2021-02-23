"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var process_1 = require("process");
var generate_1 = __importDefault(require("./generate"));
function execute(args) {
    var structures = generate_1.default(args);
    if (structures.length === 0)
        return console.log("No operations executed.");
    var _public = "/public/";
    var created = [];
    structures.forEach(function (structure) {
        if (fs_1.existsSync(structure.path))
            return console.error("[ EXISTS ] " + structure.path);
        child_process_1.execSync("mkdir -p " + structure.folder_path);
        fs_1.writeFileSync(structure.path, structure.template);
        console.log("[ CREATED ] " + structure.path);
        if (structure.filename.endsWith(".js"))
            created.push(structure.path.slice(structure.path.indexOf(_public) + _public.length));
    });
    var structure_dir = path_1.join(process_1.cwd(), args[1]);
    var public_path = structure_dir.slice(0, structure_dir.indexOf(_public) + _public.length);
    var index_html_path = path_1.join(public_path, "index.html");
    if (!fs_1.existsSync(index_html_path))
        return console.warn("Couldn't find index.html at path: " + index_html_path);
    var $ = cheerio_1.default.load(fs_1.readFileSync(index_html_path).toString());
    created.forEach(function (s) {
        $("body").append("<script src=\"" + s + "\"></script>\n");
    });
    fs_1.writeFileSync(index_html_path, $.html());
}
exports.default = execute;
