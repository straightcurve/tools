/**
 * original code
 * 
 *  namespace World {
 *       //@ts-ignore
 *       function Hello($rootScope) {
 *           let directive = {
 *               restrict: "E",
 *               replace: true,
 *               scope: {
 *                   options: "=",
 *               },
 *               controller: "HelloCtrl",
 *               templateUrl: "hello.html",
 *               controllerAs: "helloCtrl",
 *               bindToController: true,
 *           };
 *
 *           return directive;
 *       }
 *
 *       //@ts-ignore
 *       angular.module("app").directive("hello", Hello);
 *   }
 *
 */

"use strict";
var World;
(function (World) {
    //@ts-ignore
    function Hello($rootScope) {
        var directive = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=",
            },
            controller: "HelloCtrl",
            templateUrl: "hello.html",
            controllerAs: "helloCtrl",
            bindToController: true,
        };
        return directive;
    }
    //@ts-ignore
    angular.module("app").directive("hello", Hello);
})(World || (World = {}));
