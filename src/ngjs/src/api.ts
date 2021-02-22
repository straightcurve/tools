
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions, capitalize, to_angular_js_identifier } from "./structure";

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

    public static generate(args: string[]): Structure[] {
        let api = API.from(args);
    
        return [api];
    }

    constructor(args: APIOptions) {
        super(args);
    }

    public get template() {
        let identifier = capitalize(to_angular_js_identifier(this.folder_path, this.name));

        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/__identifier/g, `${identifier}APIv${this.version}`);
    }
}

function get_template() {
    return `
//@ts-check
"use strict";

let _module = "app";
let __identifier = /** @class */ (function () {
    function __identifier($rootScope) {
        //  implementation goes here
        
    }

    return __identifier;
}());

angular.module(_module).service("__identifier", __identifier);
`.trimLeft();
}
