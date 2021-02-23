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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var structure_1 = require("./structure");
var view_1 = __importDefault(require("./view"));
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component(args) {
        var _this = _super.call(this, args) || this;
        /**
         * the version
         * @summary not used but might be used..?
         * @default 1
         */
        _this.version = 1;
        return _this;
    }
    Object.defineProperty(Component.prototype, "filename", {
        /**
         * the name the file is going to be saved as
         */
        get: function () {
            return this.name + ".component.js";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "path", {
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
    Component.parse = function (args) {
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
    Component.from = function (args) {
        return new Component(Component.parse(args));
    };
    Component.generate = function (args) {
        var component = Component.from(args);
        var view = view_1.default.from([component.folder_path]);
        return [component, view];
    };
    Object.defineProperty(Component.prototype, "template", {
        get: function () {
            var identifier = structure_1.to_angular_js_identifier(this.folder_path, this.name);
            return get_template()
                .replace(/__selector/g, structure_1.to_camel_case(identifier))
                .replace(/__name/g, this.name.toLowerCase())
                .replace(/__controller_class_name/g, structure_1.capitalize(identifier))
                .replace(/__html_path/g, this.html_path);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "html_path", {
        /**
         * @returns `/root/hello` => `/root/hello/hello.html`
         * @returns `/root/public/hello` => `hello/hello.html`
         */
        get: function () {
            var _public = "/public/";
            if (!this.folder_path.includes(_public))
                return path_1.join(this.folder_path, this.name + ".html");
            return path_1.join(this.folder_path.slice(this.folder_path.indexOf(_public) + _public.length), this.name + ".html");
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.compute_folder_path = function (path) {
        return path_1.join(_super.prototype.compute_folder_path.call(this, path), this.name);
    };
    return Component;
}(structure_1.BaseStructure));
exports.default = Component;
function get_template() {
    return "\n//@ts-check\n\"use strict\";\n\n/**\n * the module that will contain this component\n*/\nlet _module = \"app\";\nlet component = {\n    selector: `__selector`,\n    bindings: {\n        options: \"=__nameOptions\",\n\n        //  bindings go here\n    },\n    controller: __controller_class_name,\n    templateUrl: \"__html_path\",\n};\n\n/** @class */\nfunction __controller_class_name(\n    $scope\n) {\n    let __nameCtrl = this;\n    __nameCtrl.options = __nameCtrl.options || null;\n\n    activate();\n\n    //////////////////////\n\n    function activate() {\n        if (\n            __nameCtrl.options === null ||\n            __nameCtrl.options === undefined\n        )\n            return console.error(\"Pass in options!\");\n\n        //  initialization logic goes here\n    }\n\n    //#region Getters\n    /**\n     * e.g.\n     * \n     * function getSomeOption() {\n     *      return __nameCtrl.options.someOption || null;\n     * }\n     */\n\n    \n    //#endregion\n}\n\n/**\n * @summary\n * if you want to change this, you don't\n * know what you're doing. so don't?\n *\n * @param {{ bindings: any; controller: any; templateUrl: any; }} component\n */\nfunction bootstrap(component) {\n    return {\n        restrict: \"E\",\n        replace: true,\n        controllerAs: \"__nameCtrl\",\n        bindToController: true,\n\n        scope: component.bindings,\n        controller: component.controller,\n        templateUrl: component.templateUrl,\n    };\n}\n\nangular\n    .module(_module)\n    .directive(to_camel_case(component.selector), () => bootstrap(component));\n".trimLeft();
}
