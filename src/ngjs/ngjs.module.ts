/**
 * @module ngjs
 */

import { argv, exit } from "process";
import execute from "./src/commands/generate/index";

if(argv.length === 2) {
    display_help();
    exit(0);
}

let commands: {
    [key: string]: (args: string[]) => any,
} = {
    g: execute,
    generate: execute,
};

if (!(argv[2] in commands)) {
    console.error(`Unknown command: ${argv[2]}`);
    console.log();
    display_help();

    process.exit(1);
}

let command = commands[argv[2]];
command(argv.slice(3, argv.length));

function display_help() {
    console.log(`
    Usage: 
        ngjs [command] [...options]

    Command:
        (g | generate)
    Options:
        (c | controller)
        (s | service)
        (d | data)
        (a | api)   -v [ version = default(1) ]
    `);
}
