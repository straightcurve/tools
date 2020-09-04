#!/usr/bin/env node

const { mkdirSync, existsSync, writeFileSync, statSync } = require("fs");

const v = process.version.split(".")[0];
const version = Number.parseInt(v.slice(1, v.length));
if(version < 6) {
    console.error(`You need at least node v6 to run this script, current is v${process.version}`);
    process.exit(1);
}

let types = new Map();
types.set("c", controller);
types.set("controller", controller);
types.set("s", service);
types.set("service", service);
types.set("f", factory);
types.set("factory", factory);

const filenameDenominator = new Map();
filenameDenominator.set("c", "controller");
filenameDenominator.set("controller", "controller");
filenameDenominator.set("f", "factory");
filenameDenominator.set("factory", "service");
filenameDenominator.set("s", "service");
filenameDenominator.set("service", "service");

function getFilenameAndParentDir(path) {
	let split = path.split("/");
	return {
		filename: split[split.length - 1],
        dir: split.slice(0, split.length - 1).join("/"),
        path: path,
	};
}

function controller(filename) {
	let controllerName = filename;
    return `
(function() {
    angular.module("app").controller("${controllerName}Ctrl", Controller);
    
    function Controller() {
        
    } 
})();`.trim();
}

function service(filename) {
	let serviceName = filename;
    return `
(function() {
    angular.module("app").service("${serviceName}Service", Service);
    
    function Service() {
        
    } 
})();`.trim();
}

function factory(filename) {
	let factoryName = filename;
    return `
(function() {
    angular.module("app").factory("${factoryName}", Factory);
    
    function Factory() {
        
    } 
})();`.trim();
}

class GenerateCommand {
    constructor() {
        this.name = "generate";
        this.slug = "g";
    }

    execute(args) {
        if(args.length !== 2)
            return console.error(`Expected arguments: (type, path)\nSupplied number of arguments: ${args.length}`);

        let pathInput = getFilenameAndParentDir(args[1]);
        let type = types.get(args[0]);
        if(!type)
            return console.error(`${args[0]} is not a type.`);

        let toWrite = type(pathInput.filename);

        console.log(pathInput)
        if(pathInput.dir.length > 0) {
            let exists = existsSync(pathInput.dir);
            if(exists && !statSync(pathInput.dir).isDirectory())
                return console.error(`${pathInput.dir} is not a directory.`);
            else if(!exists)
                mkdirSync(pathInput.dir, { recursive: true, });
        }

        pathInput.filename += `.${filenameDenominator.get(args[0])}.js`;
        pathInput.path += `.${filenameDenominator.get(args[0])}.js`;

        if(!existsSync(pathInput.path))
            writeFileSync(pathInput.path, toWrite);
        else
            console.error(`${pathInput.path} already exists.`);
    }
}

if(process.argv.length === 2) {
    console.log(`
    Usage: 
        ngjs [command] [...options]

    Command: g | generate
    Options:
        c | controller
        s | service
        f | factory
`);
}

let command = process.argv[2];
let commands = new Map();

let cmd = new GenerateCommand();
commands.set(cmd.name, cmd);
commands.set(cmd.slug, cmd);

let exec = commands.get(command);
if(!exec) {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}

exec.execute(process.argv.slice(3, process.argv.length));