import { get_selector, get_template_name } from "../utils";

export default class ComponentTemplate {
    public static get_name(name: string) {
        return get_template_name(name);
    }

    public static get_content(name: string, html_path: string): string {
        return this.base_template
            .replace(/__name_lower/g, ComponentTemplate.get_name(name).toLowerCase())
            .replace(/__name/g, ComponentTemplate.get_name(name))
            .replace(/__selector/g, get_selector(name))
            .replace(/__html_path/g, html_path);
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

/**
 * the module that will contain this component
*/
var module = "app";
var component = {
    selector: \`__selector\`,
    bindings: {
        options: "=__name_lowerOptions",

        //  bindings go here
    },
    templateUrl: "__html_path",
    controllerAs: "__name_lowerCtrl",
    controller: /** @class */ function (
        $scope
    ) {
        let __name_lowerCtrl = this;
        __name_lowerCtrl.options = __name_lowerCtrl.options || null;
    
        activate();
    
        //////////////////////
    
        function activate() {
            if (
                __name_lowerCtrl.options === null ||
                __name_lowerCtrl.options === undefined
            )
                return console.error("Pass in options!");
    
            //  initialization logic goes here
        }
    
        //#region Getters
        /**
         * e.g.
         * 
         * function getSomeOption() {
         *      return __name_lowerCtrl.options.someOption || null;
         * }
         */
    
        
        //#endregion
    },
};

angular
    .module(module)
    .directive(to_camel_case(component.selector), () => bootstrap_component(component));

`.trimLeft();
    }
}
