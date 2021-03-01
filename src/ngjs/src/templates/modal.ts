import { get_template_name } from "../utils";

export default class ModalTemplate {
    public static get_name(name: string) {
        return get_template_name(name);
    }

    public static get_content(name: string): string {
        return this.base_template
            .replace(/__name/g, ModalTemplate.get_name(name));
    }

    private static get base_template(): string {
        return `
//@ts-check
"use strict";

var module = "app";
var __nameModalCtrl = /** @class */ (function () {
    function __nameModalCtrl($scope) {
        //  implementation goes here
        
        $scope.onCompiled = onCompiled;
        $scope.onOpened = onOpened;

        ////////////////////////

        function onCompiled() {
            //  initialization logic goes here
        }

        function onOpened() {
            //  data initialization goes here
        }
    }

    return __nameModalCtrl;
}());

angular.module(module).controller("__nameModalCtrl", __nameModalCtrl);

`.trimLeft();
    }
}
