
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions, capitalize, to_angular_js_identifier } from "./structure";

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

    public static generate(args: string[]): Structure[] {
        let directive = Directive.from(args);
    
        return [directive];
    }

    constructor(args: DirectiveOptions) {
        super(args);
    }

    public get template() {
        let identifier = to_angular_js_identifier(this.folder_path, this.name);

        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/__identifier_capitalized/g, capitalize(identifier))
            .replace(/__identifier/g, identifier);
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), this.name);
    }
}

function get_template() {
    return `
//@ts-check

"use strict";
function __identifier_capitalized($rootScope) {
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

angular.module("app").directive("__identifier", __identifier_capitalized);
`.trimLeft();
}
