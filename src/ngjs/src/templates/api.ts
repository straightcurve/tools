import { get_template_name } from "../utils";

export default class APITemplate {
    public static get_name(name: string, version: number = 1) {
        return `${get_template_name(name)}APIv${version}`;
    }

    public static get_content(name: string, version: number = 1): string {
        return this.base_template.replace(
            /__name/g,
            APITemplate.get_name(name, version)
        );
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

(function () {
    var module = "app";
    var __name = /** @class */ (function () {
        function __name($rootScope) {
            //  implementation goes here
            
            this.create = create;
            this.get = get;
            this.update = update;
            this.delete = delete_;
    
            function create() {
                
            }
    
            function get() {
                
            }
    
            function update() {
                
            }
    
            function delete_() {
                
            }
        }
    
        return __name;
    }());
    
    angular.module(module).service("__name", __name);
})();

`.trimLeft();
    }
}
