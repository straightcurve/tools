
import { join } from "path";
import { BaseStructure, BaseStructureOptions, to_camel_case } from "./structure";

export interface DirectiveOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Directive extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename(): string {
        return `${this.name}.directive.js`;
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

    public static parse(args: string[]): DirectiveOptions {
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

    public static from(args: string[]): Directive {
        return new Directive(Directive.parse(args));
    }

    constructor(args: DirectiveOptions) {
        super(args);
    }

    public get template() {
        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/__directive_capitalized/g, this.capitalized_name)
            .replace(/__directive_camel_case/g, to_camel_case(this.name));
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }
}

function get_template() {
    return `
"use strict";
(function () {
    function __directive_capitalized($rootScope) {
        var directive = {
            restrict: "A",
            scope: false,
            link: link,
        };

        function link() {
            //  implementation goes here
            
        }

        return directive;
    }

    angular.module("app").directive("__directive_camel_case", __directive_capitalized);
})();
`.trimLeft();
}
