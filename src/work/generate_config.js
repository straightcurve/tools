#!/usr/bin/env node

const { isAtLeastVersion } = require("../check_min_node_version");

if(!isAtLeastVersion(6)) {
    console.error(`You need at least node v6 to run this script, current is ${process.version}`);
    process.exit(1);
}

class Project {
    constructor(name) {
        this.name = name;
        this.repository = `git@github.com:EducationIncites/${this.name}.git`;
    }
}

const { writeFileSync } = require("fs");

writeFileSync("./work/config.json", JSON.stringify({
    projects: [
        new Project("incite"),
        new Project("incites_service"),
        new Project("cbt_service"),
        new Project("proctor_service"),
        new Project("student_service"),
        new Project("curriculum_service"),
        new Project("student_portal"),
        new Project("client_service"),
        new Project("teach_service"),
        new Project("teach_sockets"),
        new Project("proctor_sockets"),
        new Project("learn_service"),
        new Project("learn_service2"),
        new Project("stream_service"),
        new Project("communities_service"),
    ],
}, null, 4));