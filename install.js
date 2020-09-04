#!/usr/bin/env node

const { isAtLeastVersion } = require("./check_min_node_version");

if(!isAtLeastVersion(6)) {
    console.error(`You need at least node v6 to run this script, current is ${process.version}`);
    process.exit(1);
}

const { copyFileSync, existsSync, unlinkSync } = require("fs");
const { execSync } = require("child_process");
const scripts = require("./scripts.json");

scripts.forEach(s => {
    let src = `${s.fullPath}`;
    let dest = `/usr/bin/${s.name}`;
    let op = null;

    if(existsSync(dest)) {
        unlinkSync(dest);
        op = "[ UPDATED ]";
    }
    else
        op = "[ INSTALLED ]";
    
    execSync(`cp ${src} ${dest}`);
    execSync(`chmod +x ${dest}`);

    console.log(`${op} ${dest}`);
});
