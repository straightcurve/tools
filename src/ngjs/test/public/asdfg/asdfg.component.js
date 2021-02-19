//@ts-check
"use strict";
(function () {
    function Asdfg($rootScope) {
        var component = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=asdfgOptions",

                //  bindings go here
            },
            controller: "AsdfgCtrl",
            templateUrl: "asdfg/asdfg.html",
            controllerAs: "asdfgCtrl",
            bindToController: true,
        };
        return component;
    }

    angular.module("app").directive("asdfg", Asdfg);
})();
