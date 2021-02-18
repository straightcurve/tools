/**
 * @module installer
 */

import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { isAbsolute, join } from "path";
import { argv, exit } from "process";
import Script from "../generator/src/script";

const { exec: pkg } = require("pkg");

let args: string[] = argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {    
    console.log(`
    Options:
        -h              shows this message
        -f [file]       accepts a .json with an array of scripts
        --dangerous     overwrites currently installed scripts on your machine
        linux           builds for linux x64
        win             builds for windows x64
        mac             builds for macos x64
    `);

    process.exit(0);
}

let target: string = "node12-linux-x64";
if (args.includes("win")) target = "node12-win-x64";
else if (args.includes("mac")) target = "node12-macos-x64";

let in_file: string = "scripts.json";
if (args.includes("-f")) in_file = args[args.indexOf("-f") + 1];
if (in_file === undefined) {
    console.error("Used -f but didn't specify a file");
    exit(2);
}

if (!isAbsolute(in_file)) in_file = join(__dirname, in_file);

if (!existsSync(in_file)) {
    console.log(`Couldn't find file at path ${in_file}`);
    exit(1);
}

const dangerous = args.includes("--dangerous");

const scripts: Script[] = require(in_file);
let omitted_script_count = 0;

const install = async () => {
    const bin = `/usr/bin`;

    for (let si = 0; si < scripts.length; si++) {
        let s = scripts[si];
        let src = `${s.path}`;
        let dest = `${bin}/${s.name}`;
        let op = "[ INSTALLED ]";

        if (existsSync(dest)) {
            if (!dangerous) {
                omitted_script_count++;
    
                op = "[ OMITTED ]";
                console.log(`${dest} ${op}`);
                continue;
            }

            execSync(`sudo rm ${dest}`);
            op = "[ UPDATED ]";
        }

        if (s.extension === "js") {
            await pkg([src, "--targets", target]);

            execSync(`sudo cp ${s.name}.module ${dest}`);
        } else if (s.extension === "sh") execSync(`sudo cp ${src} ${dest}`);

        execSync(`sudo chmod +x ${dest}`);

        console.log(`${dest} ${op}`);

        if (s.extension === "js") unlinkSync(`${s.name}.module`);
    }
};

const post_install = () => {
    if (!dangerous && omitted_script_count > 0)
        console.log("You should manually update omitted scripts or use --dangerous flag to update them using this script.");
};

install();
post_install();
