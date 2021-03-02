import { get_template_name } from "../utils";

export default class ControllerTemplate {
    public static get_name(name: string) {
        return get_template_name(name);
    }

    public static get_content(name: string): string {
        return this.base_template.replace(
            /__name/g,
            ControllerTemplate.get_name(name)
        );
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

(function () {
    var module = "app";
    var __nameCtrl = /** @class */ (function () {
        function __nameCtrl($rootScope) {
            //  implementation goes here
            
            activate();
    
            ////////////////////////
    
            function activate() {
                
            }
        }
    
        return __nameCtrl;
    }());
    
    angular.module(module).controller("__nameCtrl", __nameCtrl);
})();

`.trimLeft();
    }
}
