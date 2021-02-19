
import { join } from "path";
import { BaseStructure, BaseStructureOptions } from "./structure";

export interface ControllerOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Controller extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename() {
        return `${this.name}.controller.js`;
    }

    /**
     * the version
     * @summary not used but might be used..?
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

    public static parse(args: string[]): ControllerOptions {
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

    public static from(args: string[]): Controller {
        return new Controller(Controller.parse(args));
    }

    constructor(args: ControllerOptions) {
        super(args);
    }

    public get template() {
        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/0__controller/g, this.capitalized_name);
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    var 0__controller = /** @class */ (function () {
        function 0__controller($scope) {
        }

        //  implementation goes here

        return 0__controller;
    }());
    0__namespace.0__controller = 0__controller;

    angular.module("app").controller("0__controllerCtrl", 0__controller);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
