#!/usr/bin/env node

const { isAtLeastVersion } = require("../check_min_node_version");

if(!isAtLeastVersion(6)) {
    console.error(`You need at least node v6 to run this script, current is ${process.version}`);
    process.exit(1);
}

const { execSync } = require("child_process");
const config = require("./config.json");

const args = process.argv.slice(3, process.argv.length);
const branch = process.argv[2];
const installDeps = args.includes("i") || args.includes("-i") || args.includes("--i") || args.includes("install");

if(branch === undefined) {
    console.error(`Specify a branch as the first argument.`);
    process.exit(2);
}

config.projects
.map(p => p.name)
.forEach(p => {
    console.log(``);
    console.log(`${p} -> ${branch}`);

    cd(p);
    checkout(p);
    pull();

    if(installDeps)
        install();

    cd(`..`);
});

function cd(dir) {
    try {
        execSync(`cd ${dir}`);
    } catch(ex) {
        console.error(`${dir} is not a directory.`);
    }
}

function checkout(branch) {
    try {
        execSync(`git checkout ${branch}`);
    } catch(ex) {
        console.error(`not a git repository or the "${branch}" branch doesn't exist.`);
    }
}

function pull() {
    try {
        execSync(`git pull`);
    } catch(ex) {
        console.error(`not a git repository.`);
    }
}

function install() {
    try {
        execSync(`npm i`);
    } catch(ex) {
        console.error(ex);
    }
}