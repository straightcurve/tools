
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions, capitalize, to_angular_js_identifier, to_camel_case } from "./structure";
import View from "./view";

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

    public static generate(args: string[]): Structure[] {
        let component = Component.from(args);
        let view = View.from([component.folder_path]);
    
        return [component, view];
    }

    constructor(args: ComponentOptions) {
        super(args);
    }

    public get template() {
        let identifier = to_angular_js_identifier(this.folder_path, this.name);

        return get_template()
            .replace(/__selector/g, to_camel_case(identifier))
            .replace(/__name/g, this.name.toLowerCase())
            .replace(/__controller_class_name/g, capitalize(identifier))
            .replace(/__html_path/g, this.html_path);
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
//@ts-check
"use strict";

/**
 * the module that will contain this component
*/
let _module = "app";
let component = {
    selector: \`__selector\`,
    bindings: {
        options: "=__nameOptions",

        //  bindings go here
    },
    controller: __controller_class_name,
    templateUrl: "__html_path",
};

/** @class */
function __controller_class_name(
    $scope
) {
    let __nameCtrl = this;
    __nameCtrl.options = __nameCtrl.options || null;

    activate();

    //////////////////////

    function activate() {
        if (
            __nameCtrl.options === null ||
            __nameCtrl.options === undefined
        )
            return console.error("Pass in options!");

        //  initialization logic goes here
    }

    //#region Getters
    /**
     * e.g.
     * 
     * function getSomeOption() {
     *      return __nameCtrl.options.someOption || null;
     * }
     */

    
    //#endregion
}

/**
 * @summary
 * if you want to change this, you don't
 * know what you're doing. so don't?
 *
 * @param {{ bindings: any; controller: any; templateUrl: any; }} component
 */
function bootstrap(component) {
    return {
        restrict: "E",
        replace: true,
        controllerAs: "__nameCtrl",
        bindToController: true,

        scope: component.bindings,
        controller: component.controller,
        templateUrl: component.templateUrl,
    };
}

angular
    .module(_module)
    .directive(to_camel_case(component.selector), () => bootstrap(component));
`.trimLeft();
}
