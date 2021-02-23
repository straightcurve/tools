"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var structure_1 = require("./structure");
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(args) {
        var _this = _super.call(this, args) || this;
        /**
         * the version
         * @summary not used but might be used..?
         * @default 1
         */
        _this.version = 1;
        return _this;
    }
    Object.defineProperty(View.prototype, "filename", {
        /**
         * the name the file is going to be saved as
         */
        get: function () {
            return this.name + ".html";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "path", {
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
    Object.defineProperty(View.prototype, "template", {
        get: function () {
            return get_template()
                .replace(/__view_name/g, this.name);
        },
        enumerable: false,
        configurable: true
    });
    View.parse = function (args) {
        if (args.length < 1)
            throw new Error("Wrong number of arguments, stat 0");
        var index = args.indexOf("-v");
        var version = args[index + 1];
        if (index === -1)
            version = "1";
        index = args.indexOf("-ns");
        var namespace = args[index + 1];
        if (index === -1)
            namespace = null;
        return {
            namespace: namespace,
            path: args[0],
            version: Number.parseInt(version),
        };
    };
    View.from = function (args) {
        return new View(View.parse(args));
    };
    View.generate = function (args) {
        var view = View.from(args);
        return [view];
    };
    View.prototype.compute_folder_path = function (path) {
        return path_1.join(_super.prototype.compute_folder_path.call(this, path), this.name);
    };
    View.prototype.compute_name = function (name) {
        if (name.endsWith(".html"))
            name = name.slice(0, name.lastIndexOf(".html"));
        return name;
    };
    return View;
}(structure_1.BaseStructure));
exports.default = View;
function get_template() {
    return "\n<p>__view_name works!</p>\n".trimLeft();
}
