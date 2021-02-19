
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
     * @description
     * the reason for this filename is for easily changing
     * them into components when we upgrade to v1.5+
     * @returns - `@name.component.js`
     */
    public get filename(): string {
        return `${this.name}.component.js`;
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
            .replace(/__directive_camel_case/g, to_camel_case(this.name))
            .replace(/__directive_html_path/g, this.html_path);
    }

    /**
     * @returns `/root/hello` => `/root/hello/hello.html`
     * @returns `/root/public/hello` => `hello/hello.html`
     */
    public get html_path(): string {
        const _public = "/public/"; 

        if (!this.folder_path.includes(_public))
            return join(this.folder_path, `${this.name}.html`);

        return join(this.folder_path.slice(this.folder_path.indexOf(_public) + _public.length), `${this.name}.html`);
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
    function __directive_capitalized($rootScope) {
        var directive = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=__directive_camel_caseOptions",
            },
            controller: "__directive_capitalizedCtrl",
            templateUrl: "__directive_html_path",
            controllerAs: "__directive_camel_caseCtrl",
            bindToController: true,
        };
        return directive;
    }

    0__namespace.__directive_capitalized = __directive_capitalized;

    angular.module("app").directive("__directive_camel_case", __directive_capitalized);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
