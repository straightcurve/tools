import { get_template_name } from "../utils";

export default class ServiceTemplate {
    public static get_name(name: string) {
        return get_template_name(name);
    }

    public static get_content(name: string): string {
        return this.base_template.replace(
            /__name/g,
            ServiceTemplate.get_name(name)
        );
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

var module = "app";
var __nameService = /** @class */ (function () {
    function __nameService($rootScope) {
        //  implementation goes here
        
        this.doSomething = doSomething;

        function doSomething() {
            
        }
    }

    return __nameService;
}());

angular.module(module).service("__nameService", __nameService);

`.trimLeft();
    }
}
