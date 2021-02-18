#!/usr/bin/env node

const { isAtLeastVersion } = require("../check_min_node_version");

if(!isAtLeastVersion(6)) {
    console.error(`You need at least node v6 to run this script, current is ${process.version}`);
    process.exit(1);
}

const { execSync } = require("child_process");
const config = require("./config.json");

config.projects.forEach(p => {
    try {
        execSync(`git clone ${p.repository}`)
    } catch(ex) {
        
    }
});
