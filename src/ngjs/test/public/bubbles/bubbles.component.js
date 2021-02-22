//@ts-check
"use strict";

let component = {
    selector: `bubbles`,
    bindings: {
        options: "=bubblesOptions",

        //  bindings go here
    },
    controller: Bubbles,
    templateUrl: "bubbles/bubbles.html",
};

/** @class */
function Bubbles(
    $scope
) {
    let bubblesCtrl = this;
    bubblesCtrl.options = bubblesCtrl.options || null;

    activate();

    //////////////////////

    function activate() {
        if (
            bubblesCtrl.options === null ||
            bubblesCtrl.options === undefined
        )
            return console.error("Pass in options!");

        //  initialization logic goes here
    }

    //#region Getters
    /**
     * e.g.
     * 
     * function getSomeOption() {
     *      return bubblesCtrl.options.someOption || null;
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
        controllerAs: "bubblesCtrl",
        bindToController: true,

        scope: component.bindings,
        controller: component.controller,
        templateUrl: component.templateUrl,
    };
}

angular
    .module("app")
    .directive(to_camel_case(component.selector), () => bootstrap(component));
