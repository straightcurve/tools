//@ts-check
"use strict";
(function () {
    function Asdf($rootScope) {
        var component = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=asdfOptions",

                //  bindings go here
            },
            controller: "AsdfCtrl",
            templateUrl: "asdf/asdf.html",
            controllerAs: "asdfCtrl",
            bindToController: true,
        };
        return component;
    }

    angular.module("app").directive("asdf", Asdf);
})();
