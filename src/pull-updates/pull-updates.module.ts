/**
 * @module tree-map
 */

import chalk from "chalk";
import { execSync } from "child_process";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";
import { argv, cwd, exit } from "process";

let args = argv.slice(2);
let show_help: boolean = args.indexOf("-h") !== -1;
if (show_help) {
    display_help();
    exit(0);
}

let in_list_path: string = get_input_arg("-p", "");
let should_install_deps: boolean = args.indexOf("--install") !== -1;
let branch: string = get_input_arg("-b", "develop");
let pull_from_cwd_only = in_list_path.length === 0;

if (pull_from_cwd_only)
    pull_from_cwd();
else
    pull_multiple();

function pull_from_cwd() {
    let command = `git checkout ${branch} && git pull`;
        
    if(should_install_deps)
        command += ` && npm i`;

    try {
        execSync(command, {cwd: process.cwd()});
    } catch (ex: any) {
        if (ex.message.includes(`error: pathspec '${branch}' did not match any file(s) known to git`))
            console.log(chalk.red(`[ FAILED ] Branch doesn't exist: ${branch}`));

        console.log("Use the -h option if you need help.");
    }
}

function pull_multiple() {
    if (!existsSync(in_list_path)) {
        console.error(`${chalk.red("[ FAILED ]")} File doesn't exist at path ${in_list_path}`);
        exit(1); 
    }
    
    if (!isAbsolute(in_list_path))
        in_list_path = join(cwd(), in_list_path);
    
    let has_failed = false;
    let list: string[] = require(in_list_path);
    list.forEach(project => {
        console.log(``);
        console.log(`${project} -> ${branch}`);
        let command = `cd ${project} && git checkout ${branch} && git pull`;
        
        if(should_install_deps)
            command += ` && npm i`;
        
        command += ` && cd ..`;

        try {
            execSync(command, {cwd: process.cwd()});
        } catch (ex: any) {
            has_failed = true;

            if (ex.message.includes(`error: pathspec '${branch}' did not match any file(s) known to git`))
                console.log(chalk.red(`[ FAILED ] Branch doesn't exist: ${branch}`));    
        }
    });

    if (has_failed)
        console.log("Use the -h option if you need help.");
}

function display_help() {
    console.log(`
    Usage: 
        pull-updates [...options]
    Options:
        -p  [ path ]                        the relative path to the json file with projects list.
                                            omitting this option causes the script to only pull updates
                                            for the cwd
        -b  [ branch = default(develop) ]   branch name
        --install                           run npm install after pulling updates
    `);
}

function get_input_arg(option: string, _default: string | null) {
    let arg: string | null = _default;
    if (args.includes(option))
        arg = args[args.indexOf(option) + 1];
    if (arg === undefined) {
        console.error(chalk.red(`[ FAILED ] Used ${option} but didn't specify a value!`));
        exit(1);
    }

    if (arg === null) {
        console.error(chalk.red(`[ FAILED ] You need to use the ${option} option!`));
        console.log();
        display_help();
        exit(1);
    }

    return arg;
}
