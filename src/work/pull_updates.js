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
    let command = `${mkdir(p) && cd(p)} && ${checkout(branch)} && ${pull()}`;
    
    if(installDeps)
        command += ` && ${install()}`;
    
    command += ` && ${cd("..")}`;
    execSync(command, {cwd: process.cwd()});
});

function mkdir(dir) {
    return `mkdir -p ${dir}`;
}

function cd(dir) {
    return `cd ${dir}`;
}

function checkout(branch) {
    return `git checkout ${branch}`;
}

function pull() {
    return `git pull`;
}

function install() {
    return `npm i`;
}