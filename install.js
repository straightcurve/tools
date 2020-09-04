#!/usr/bin/env node

const { isAtLeastVersion } = require("./check_min_node_version");
const { exec: pkg } = require("pkg");

if(!isAtLeastVersion(6)) {
    console.error(`You need at least node v6 to run this script, current is ${process.version}`);
    process.exit(1);
}

const { copyFileSync, existsSync, unlinkSync } = require("fs");
const { execSync } = require("child_process");
const scripts = require("./scripts.json");

async function yikes() {

    for (let si = 0; si < scripts.length; si++) {
        let s = scripts[si];
        let src = `${s.fullPath}`;
        let dest = `/usr/bin/${s.name}`;
        let op = null;
    
        if(existsSync(dest)) {
            unlinkSync(dest);
            op = "[ UPDATED ]";
        }
        else
            op = "[ INSTALLED ]";
        
        if(s.extension === "js") {
            await pkg([src, "--targets", "node6-linux-x64"]);
            execSync(`cp ${s.name} ${dest}`);
        }
        else 
            execSync(`cp ${src} ${dest}`);
    
        execSync(`chmod +x ${dest}`);
    
        console.log(`${op} ${dest}`);

        if(s.extension === "js")
            unlinkSync(`${s.name}`);
    }
}

yikes();