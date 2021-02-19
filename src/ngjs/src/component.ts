
import { join } from "path";
import { BaseStructure, BaseStructureOptions, capitalize, to_angular_js_identifier } from "./structure";

export interface ComponentOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Component extends BaseStructure {

    /**
     * the name the file is going to be saved as
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

    public static parse(args: string[]): ComponentOptions {
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

    public static from(args: string[]): Component {
        return new Component(Component.parse(args));
    }

    constructor(args: ComponentOptions) {
        super(args);
    }

    public get template() {
        let identifier = to_angular_js_identifier(this.folder_path, this.name);

        return get_template()
            .replace(/0__namespace/g, this.namespace)
            .replace(/__identifier_capitalized/g, capitalize(identifier))
            .replace(/__identifier/g, identifier)
            .replace(/__template_path/g, this.html_path);
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
(function () {
    function __identifier_capitalized($rootScope) {
        var component = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=__identifierOptions",

                //  bindings go here
            },
            controller: "__identifier_capitalizedCtrl",
            templateUrl: "__template_path",
            controllerAs: "__identifierCtrl",
            bindToController: true,
        };
        return component;
    }

    angular.module("app").directive("__identifier", __identifier_capitalized);
})();
`.trimLeft();
}
