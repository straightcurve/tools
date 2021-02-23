"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.to_angular_js_identifier = exports.to_camel_case = exports.BaseStructure = void 0;
var path_1 = require("path");
var process_1 = require("process");
var BaseStructure = /** @class */ (function () {
    function BaseStructure(args) {
        /**
         * the version
         * @default 1
         */
        this.version = 1;
        this.name = this.compute_name(args.path.slice(args.path.lastIndexOf("/") + 1));
        this.namespace = args.namespace || "__app";
        this.version = args.version;
        this.folder_path = this.compute_folder_path(args.path);
    }
    Object.defineProperty(BaseStructure.prototype, "path", {
        /**
         * destination to write the file to
         * (absolute path)
         */
        get: function () {
            return path_1.join(this.folder_path, this.filename);
        },
        enumerable: false,
        configurable: true
    });
    BaseStructure.prototype.compute_folder_path = function (path) {
        if (!path.includes("/"))
            return process_1.cwd();
        if (path_1.isAbsolute(path))
            return path.slice(0, path.lastIndexOf("/"));
        return path_1.join(process_1.cwd(), path.slice(0, path.lastIndexOf("/")));
    };
    BaseStructure.prototype.compute_name = function (name) {
        if (name.endsWith(".js"))
            name = name.slice(0, name.lastIndexOf(".js"));
        return name;
    };
    return BaseStructure;
}());
exports.BaseStructure = BaseStructure;
/**
 * @returns `course-discussion-topics` => `courseDiscussionTopics`
 */
function to_camel_case(str) {
    var split = str.split("-");
    return (split[0] +
        split
            .slice(1)
            .map(function (s) {
            return "" + s[0].toUpperCase() + s.slice(1);
        })
            .join(""));
}
exports.to_camel_case = to_camel_case;
/**
 * @returns `/root/hello` => `/root/hello/hello.html`
 * @returns `/root/public/hello` => `hello/hello.html`
 */
function to_angular_js_identifier(folder_path, name) {
    var _public = "/public/";
    if (folder_path.includes(_public))
        return to_camel_case(folder_path
            .slice(folder_path.indexOf(_public) + _public.length)
            .replace(/\//g, "-"));
    var split = folder_path.split("/");
    split = split.slice(split.length - 2);
    return to_camel_case(split.join("-"));
}
exports.to_angular_js_identifier = to_angular_js_identifier;
/**
 * @returns `course-discussion-topics` => `Course-discussion-topics`
 */
function capitalize(str) {
    return "" + str[0].toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
