
import { isAbsolute, join } from "path";
import Structure from "./structure";

export interface APIOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class API implements Structure {
    public namespace: string;

    /**
     * the name the file is going to be saved as
     */
    public get filename() {
        return `${this.name}.api.v${this.version}.js`;
    }

    /**
     * the api version
     * @default 1
     */
    public version: number = 1;

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

    /**
     * absolute path to the destination's parent folder
     */
    public folder_path: string;

    /**
     * e.g. filename: `course`
     *      name: `Course`
     */
    public name: string;

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
        this.name = args.path.slice(args.path.lastIndexOf("/") + 1);
        if (this.name.endsWith(".js"))
            this.name = this.name.slice(0, this.name.lastIndexOf(".js"));

        this.namespace = args.namespace || "__app";
        this.version = args.version;
        this.folder_path = this.compute_folder_path(args.path);
    }

    public get template() {
        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/0__api/g, `${this.name}APIv${this.version}`);
    }

    private compute_folder_path(path: string) {
        if (isAbsolute(path))
            return path.slice(0, path.lastIndexOf("/"));

        return join(__dirname, path.slice(0, path.lastIndexOf("/")));
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
