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
var Directive = /** @class */ (function (_super) {
    __extends(Directive, _super);
    function Directive(args) {
        var _this = _super.call(this, args) || this;
        /**
         * the version
         * @summary not used but might be used..?
         * @default 1
         */
        _this.version = 1;
        return _this;
    }
    Object.defineProperty(Directive.prototype, "filename", {
        /**
         * the name the file is going to be saved as
         */
        get: function () {
            return this.name + ".directive.js";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Directive.prototype, "path", {
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
    Directive.parse = function (args) {
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
    Directive.from = function (args) {
        return new Directive(Directive.parse(args));
    };
    Directive.generate = function (args) {
        var directive = Directive.from(args);
        return [directive];
    };
    Object.defineProperty(Directive.prototype, "template", {
        get: function () {
            var identifier = structure_1.to_angular_js_identifier(this.folder_path, this.name);
            return get_template()
                .replace(/0__namespace/g, this.namespace)
                .replace(/__identifier_capitalized/g, structure_1.capitalize(identifier))
                .replace(/__identifier/g, identifier);
        },
        enumerable: false,
        configurable: true
    });
    Directive.prototype.compute_folder_path = function (path) {
        return path_1.join(_super.prototype.compute_folder_path.call(this, path), this.name);
    };
    return Directive;
}(structure_1.BaseStructure));
exports.default = Directive;
function get_template() {
    return "\n//@ts-check\n\"use strict\";\n\nlet _module = \"app\";\n\nfunction __identifier_capitalized($rootScope) {\n    var directive = {\n        restrict: \"A\",\n        scope: false,\n        link: link,\n    };\n\n    function link() {\n        //  implementation goes here\n        \n    }\n\n    return directive;\n}\n\nangular.module(_module).directive(\"__identifier\", __identifier_capitalized);\n".trimLeft();
}
