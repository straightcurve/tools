#!/usr/bin/env node

class Script {
    constructor(fullPath) {
        let split = fullPath.split("/");
        this.path = split.length === 1 ? "" : split.slice(0, split.length - 1).join("/");
        this.fullPath = fullPath;

        let splitName = split[split.length - 1].split(".");
        this.name = splitName[0];
        this.extension = splitName.length === 1 ? "" : splitName[splitName.length - 1];
    }
}

//  change to included scripts instead
const excludedScripts = [
    "./check_min_node_version.js",
    "./generate_scripts.js",
    "./work/generate_config.js",
    "./install.js",
    "./install.sh",
];
const excludedDirs = [
    ".git",
    "node_modules",
];
const allowedExtensions = [
    "js",
    "sh",
];

const { writeFileSync, readdirSync, statSync } = require("fs");

const scripts = readDir(".")
.map(f => {
    if(typeof f === "string")
        return new Script(`./${f}`);
    return f;
})
.filter(f => !excludedScripts.includes(f.fullPath));

writeFileSync("./scripts.json", JSON.stringify(scripts, null, 4));


function readDir(dir) {
    let files = readdirSync(dir, { withFileTypes: true, });
    let toAdd = [];
    files = files.filter(f => {
        let d = `${dir}/${f}`;
        if(statSync(d).isDirectory() && !excludedDirs.includes(f)) {
            readDir(f).forEach(file => {
                toAdd.push(new Script(`${d}/${file}`));
            });
            return false;
        }
    
        let split = f.split(".");
        if(split.length === 1)
            return allowedExtensions.includes("");
    
        return allowedExtensions.includes(split[split.length - 1]);
    });
    return [...files, ...toAdd];
}
