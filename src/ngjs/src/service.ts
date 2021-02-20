
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions, capitalize, to_angular_js_identifier } from "./structure";

export interface ServiceOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Service extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename() {
        return `${this.name}.service.js`;
    }

    /**
     * destination to write the file to
     * (absolute path)
     */
    public get path(): string {
        return join(
            this.folder_path,
            this.filename
        );
    }

    public static parse(args: string[]): ServiceOptions {
        if (args.length < 1)
            throw new Error("Wrong number of arguments, stat 0");

        let index = args.indexOf("-v");
        let version = args[index + 1];
        if (index === -1)
            version = "1";
        
        index = args.indexOf("-ns");
        let namespace: string | null = args[index + 1];
        if (index === -1)
            namespace = null;

        return {
            namespace,
            path: args[0],
            version: Number.parseInt(version),
        };
    }

    public static from(args: string[]): Service {
        return new Service(Service.parse(args));
    }

    public static generate(args: string[]): Structure[] {
        let service = Service.from(args);
    
        return [service];
    }

    constructor(args: ServiceOptions) {
        super(args);
    }

    public get template() {
        let identifier = capitalize(to_angular_js_identifier(this.folder_path, this.name));

        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/__identifier/g, `${identifier}Service`);
    }
}

function get_template() {
    return `
//@ts-check

"use strict";
var __identifier = /** @class */ (function () {
    function __identifier($rootScope) {
        //  implementation goes here
        
    }

    return __identifier;
}());

angular.module("app").service("__identifier", __identifier);
`.trimLeft();
}
