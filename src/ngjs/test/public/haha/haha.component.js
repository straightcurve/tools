//@ts-check
"use strict";

/**
 * the module that will contain this component
*/
var module = "app";
var component = {
    selector: `haha`,
    bindings: {
        options: "=hahaOptions",

        //  bindings go here
    },
    templateUrl: "__html_path",
    controllerAs: "hahaCtrl",
    controller: /** @class */ function (
        $scope
    ) {
        let hahaCtrl = this;
        hahaCtrl.options = hahaCtrl.options || null;
    
        activate();
    
        //////////////////////
    
        function activate() {
            if (
                hahaCtrl.options === null ||
                hahaCtrl.options === undefined
            )
                return console.error("Pass in options!");
    
            //  initialization logic goes here
        }
    
        //#region Getters
        /**
         * e.g.
         * 
         * function getSomeOption() {
         *      return hahaCtrl.options.someOption || null;
         * }
         */
    
        
        //#endregion
    },
};

angular
    .module(module)
    .directive(to_camel_case(component.selector), () => bootstrap_component(component));
