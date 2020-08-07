const { execSync } = require("child_process");

const v = process.version.split(".")[0];
const version = Number.parseInt(v.slice(1, v.length));
if(version < 6) {
    console.error(`You need at least node v6 to run this script, current is v${process.version}`);
    process.exit(1);
}

let stdio = execSync("git branch").toString();
let branches = stdio.split("\n");
let excluded = [
    "master",
    "develop",
];

if(process.argv.length > 2)
    excluded.push(...getExcludedBranches());

branches
    .slice(0, branches.length - 1)
    .map(b => b.trim())
    .filter(b => !isExcludedBranch(b) && !isCurrentBranch(b))
    .forEach(b => execSync(`git branch -D ${b}`));

console.log(`Deleted all other branches except for [${excluded.join("], [")}]`)

function getExcludedBranches() {
    return process.argv.slice(2, process.argv.length);
}

function isCurrentBranch(branch) {
    return branch[0] === "*";
}

function isExcludedBranch(branch) {
    return excluded.includes(branch);
}