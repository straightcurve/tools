
import { join } from "path";
import { BaseStructure, BaseStructureOptions } from "./structure";

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

    constructor(args: ServiceOptions) {
        super(args);
    }

    public get template() {
        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/0__service/g, `${this.capitalized_name}Service`);
    }
}

function get_template() {
    return `
"use strict";
(function () {
    var 0__service = /** @class */ (function () {
        function 0__service($rootScope) {
            //  implementation goes here
            
        }

        return 0__service;
    }());

    angular.module("app").service("0__service", 0__service);
})());
`.trimLeft();
}
