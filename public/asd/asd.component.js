//@ts-check
"use strict";
(function () {
    function Asd($rootScope) {
        var component = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=asdOptions",

                //  bindings go here
            },
            controller: "AsdCtrl",
            templateUrl: "asd/asd.html",
            controllerAs: "asdCtrl",
            bindToController: true,
        };
        return component;
    }

    angular.module("app").directive("asd", Asd);
})();
