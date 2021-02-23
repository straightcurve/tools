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
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller(args) {
        var _this = _super.call(this, args) || this;
        /**
         * the version
         * @summary not used but might be used..?
         * @default 1
         */
        _this.version = 1;
        return _this;
    }
    Object.defineProperty(Controller.prototype, "filename", {
        /**
         * the name the file is going to be saved as
         */
        get: function () {
            return this.name + ".controller.js";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "path", {
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
    Controller.parse = function (args) {
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
    Controller.from = function (args) {
        return new Controller(Controller.parse(args));
    };
    Controller.generate = function (args) {
        var controller = Controller.from(args);
        return [controller];
    };
    Object.defineProperty(Controller.prototype, "template", {
        get: function () {
            var identifier = structure_1.capitalize(structure_1.to_angular_js_identifier(this.folder_path, this.name));
            return get_template()
                .replace(/0__namespace/g, this.namespace)
                .replace(/0__controller/g, identifier);
        },
        enumerable: false,
        configurable: true
    });
    Controller.prototype.compute_folder_path = function (path) {
        return path_1.join(_super.prototype.compute_folder_path.call(this, path), this.name);
    };
    return Controller;
}(structure_1.BaseStructure));
exports.default = Controller;
function get_template() {
    return "\n//@ts-check\n\"use strict\";\n\nlet _module = \"app\";\nlet 0__controller = /** @class */ (function () {\n    function 0__controller($scope) {\n        //  implementation goes here\n        \n    }\n\n    return 0__controller;\n}());\n\nangular.module(_module).controller(\"0__controllerCtrl\", 0__controller);\n".trimLeft();
}
