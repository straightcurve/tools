
import { join } from "path";
import { BaseStructure, BaseStructureOptions } from "./structure";

export interface APIOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class API extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename() {
        return `${this.name}.api.v${this.version}.js`;
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

    public static parse(args: string[]): APIOptions {
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

    public static from(args: string[]): API {
        return new API(API.parse(args));
    }

    constructor(args: APIOptions) {
        super(args);
    }

    public get template() {
        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/0__api/g, `${this.capitalized_name}APIv${this.version}`);
    }
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    var 0__api = /** @class */ (function () {
        function 0__api($rootScope) {
        }

        //  implementation goes here

        return 0__api;
    }());
    0__namespace.0__api = 0__api;

    angular.module("app").service("0__api", 0__api);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
