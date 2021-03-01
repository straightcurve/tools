//@ts-check
"use strict";

/**
 * the module that will contain this component
*/
var module = "app";
var component = {
    selector: `hahaxd`,
    bindings: {
        options: "=hahaxdOptions",

        //  bindings go here
    },
    templateUrl: "hahaxd/hahaxd.html",
    controllerAs: "hahaxdCtrl",
    controller: /** @class */ function (
        $scope
    ) {
        let hahaxdCtrl = this;
        hahaxdCtrl.options = hahaxdCtrl.options || null;
    
        activate();
    
        //////////////////////
    
        function activate() {
            if (
                hahaxdCtrl.options === null ||
                hahaxdCtrl.options === undefined
            )
                return console.error("Pass in options!");
    
            //  initialization logic goes here
        }
    
        //#region Getters
        /**
         * e.g.
         * 
         * function getSomeOption() {
         *      return hahaxdCtrl.options.someOption || null;
         * }
         */
    
        
        //#endregion
    },
};

angular
    .module(module)
    .directive(to_camel_case(component.selector), () => bootstrap_component(component));

