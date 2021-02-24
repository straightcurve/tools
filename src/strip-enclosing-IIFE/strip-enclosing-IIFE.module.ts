/**
 * @module tree-map
 */

import { argv, exit } from "process";
import strip_IIFE from "./src/strip";

let args = argv.slice(2);
let in_public_dir: string = configure_in_dir_path("-p", null);
let in_dry_run: boolean = args.includes("--dry-run") || false;

strip_IIFE(in_public_dir, in_dry_run);


function display_help() {
    console.log(`
    Usage: 
        strip-enclosing-IIFE [...options]

    Options:
        -p          [ path ]    the relative path to the directory (required)
        --dry-run               test run, doesn't apply changes
    `);
}

function configure_in_dir_path(option: string, _default: string | null) {
    let in_dir: string | null = _default;
    if (args.includes(option))
        in_dir = args[args.indexOf(option) + 1];
    if (in_dir === undefined) {
        console.error(`Used ${option} but didn't specify a value!`);
        exit(1);
    }

    if (in_dir === null) {
        console.error(`You need to use the ${option} option!`);
        console.log();
        display_help();
        exit(1);
    }

    return in_dir;
}
