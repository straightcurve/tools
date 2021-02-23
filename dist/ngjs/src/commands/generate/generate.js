"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var api_1 = __importDefault(require("../../api"));
var component_1 = __importDefault(require("../../component"));
var data_1 = __importDefault(require("../../data"));
var directive_1 = __importDefault(require("../../directive"));
var service_1 = __importDefault(require("../../service"));
var builders = new Map();
builders.set("c", component_1.default.generate);
builders.set("component", component_1.default.generate);
builders.set("s", service_1.default.generate);
builders.set("service", service_1.default.generate);
builders.set("d", data_1.default.generate);
builders.set("data", data_1.default.generate);
builders.set("a", api_1.default.generate);
builders.set("api", api_1.default.generate);
builders.set("dir", directive_1.default.generate);
builders.set("directive", directive_1.default.generate);
function generate(args) {
    if (args.length < 2)
        throw new Error("Expected arguments: (type, path)\nSupplied arguments: (" + (args[0], args[1]) + ")");
    var type = args[0], path = args[1];
    var build = builders.get(type);
    if (build === undefined)
        throw new Error("Unknown type " + type + "\nSupported types: (api | component | data | directive | service)");
    if (path_1.isAbsolute(path))
        throw new Error("Invalid path " + path + "\nSpecify relative path or file name");
    return build(args.slice(1));
}
exports.default = generate;
