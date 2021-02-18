
export default function controller(filename: string) {
    let namespace = "__app";
    let name = `${filename[0].toUpperCase()}${filename.slice(1)}`;

    return get_template()
        .replace(/0__namespace/g, namespace)
        .replace(/0__controller/g, name);
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    var 0__controller = /** @class */ (function () {
        function 0__controller($scope) {
        }

        //  implementation goes here

        return 0__controller;
    }());
    0__namespace.0__controller = 0__controller;

    angular.module("app").controller("0__controllerCtrl", 0__controller);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
