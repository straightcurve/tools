//@ts-check
"use strict";

var module = "app";
var DddModalCtrl = /** @class */ (function () {
    function DddModalCtrl($scope) {
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

    return DddModalCtrl;
}());

angular.module(module).controller("DddModalCtrl", DddModalCtrl);

