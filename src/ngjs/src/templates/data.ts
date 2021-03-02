import { get_template_name } from "../utils";

export default class DataTemplate {
    public static get_name(name: string) {
        return get_template_name(name);
    }

    public static get_content(name: string): string {
        return this.base_template.replace(
            /__name/g,
            DataTemplate.get_name(name)
        );
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

(function () {
    var module = "app";
    var __nameData = /** @class */ (function () {
        function __nameData($rootScope) {
            //  implementation goes here
            ___nameData.doSomething = doSomething;
    
            return ___nameData;
    
            function ___nameData() {
    
            }
    
            function doSomething() {
                
            }
        }
    
        return __nameData;
    }());
    
    angular.module(module).factory("__nameData", __nameData);
})();

`.trimLeft();
    }
}
