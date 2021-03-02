
import { get_selector, get_template_name } from "../utils";

export default class DirectiveTemplate {
    public static get_name(name: string) {
        return get_template_name(name);
    }

    public static get_content(name: string): string {
        return this.base_template.replace(
            /__selector/g,
            get_selector(name)
        );
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

(function () {
    /**
     * the module that will contain this directive
    */
    var module = "app";
    var directive = {
        selector: \`__selector\`,
        link: function (
            scope,
            elem,
            attrs
        ) {
    
        },
    };
    
    angular
        .module(module)
        .directive(to_camel_case(directive.selector), () => bootstrap_directive(directive));
})();

`.trimLeft();
    }
}
