/**
 * @module generator
 */

import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { isAbsolute, join } from "path";
import { exit } from "process";
import generate from "./src/generate";
import rec_scan_files from "./src/rec_scan_files";

let exclude: string[] = ["installer", "generator"];
let include: string[] = [];
let out_file: string = "scripts.json";
if (!isAbsolute(out_file))
    out_file = join(__dirname, out_file);

const build = () => {
    let output = execSync(`npm run build`).toString();
    console.log(output);

    if (output.toLowerCase().includes("error")) return false;

    return true;
};

build();

let modules = rec_scan_files(join(__dirname, "../"), (f) =>
    f.endsWith(".module.js")
);

console.log("Found modules:\n", ...modules.map((m) => `\n\t${m}`));
console.log();

let scripts = modules.map(generate).filter((s) => {
    let included = include.includes(s.name);
    let excluded = exclude.includes(s.name);

    if (include.length === 0) {
        if (exclude.length === 0)
            return true;

        return !excluded;
    }

    if (exclude.length === 0) {
        if (include.length === 0)
            return true;

        return included;
    }   

    return included && !excluded;
});

if (scripts.length === 0) {
    console.log(`No scripts found that match criteria.`);
    exit(0);
}

console.log(`Writing script configuration to ${out_file}`);

writeFileSync(out_file, JSON.stringify(scripts, null, 4));
