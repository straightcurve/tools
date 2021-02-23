"use strict";
/**
 * @module ngjs
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var index_1 = __importDefault(require("./src/commands/generate/index"));
if (process_1.argv.length === 2) {
    display_help();
    process_1.exit(0);
}
var commands = {
    g: index_1.default,
    generate: index_1.default,
};
if (!(process_1.argv[2] in commands)) {
    console.error("Unknown command: " + process_1.argv[2]);
    console.log();
    display_help();
    process.exit(1);
}
var command = commands[process_1.argv[2]];
command(process_1.argv.slice(3, process_1.argv.length));
function display_help() {
    console.log("\n    Usage: \n        ngjs [command] [...options]\n\n    Command:\n        (g   | generate)\n    Options:\n        (a   | api)         -v [ version = default(1) ]\n        (c   | component)\n        (d   | directive)\n        (s   | service)\n        (data)\n    ");
}
