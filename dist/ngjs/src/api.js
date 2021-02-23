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
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API(args) {
        return _super.call(this, args) || this;
    }
    Object.defineProperty(API.prototype, "filename", {
        /**
         * the name the file is going to be saved as
         */
        get: function () {
            return this.name + ".api.v" + this.version + ".js";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(API.prototype, "path", {
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
    API.parse = function (args) {
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
    API.from = function (args) {
        return new API(API.parse(args));
    };
    API.generate = function (args) {
        var api = API.from(args);
        return [api];
    };
    Object.defineProperty(API.prototype, "template", {
        get: function () {
            var identifier = structure_1.capitalize(structure_1.to_angular_js_identifier(this.folder_path, this.name));
            return get_template()
                .replace(/0__namespace/g, this.namespace)
                .replace(/__identifier/g, identifier + "APIv" + this.version);
        },
        enumerable: false,
        configurable: true
    });
    return API;
}(structure_1.BaseStructure));
exports.default = API;
function get_template() {
    return "\n//@ts-check\n\"use strict\";\n\nlet _module = \"app\";\nlet __identifier = /** @class */ (function () {\n    function __identifier($rootScope) {\n        //  implementation goes here\n        \n    }\n\n    return __identifier;\n}());\n\nangular.module(_module).service(\"__identifier\", __identifier);\n".trimLeft();
}
