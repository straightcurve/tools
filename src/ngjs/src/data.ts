
export default function data(filename: string) {
    let namespace = "__app";
    let name = `${filename[0].toUpperCase()}${filename.slice(1)}`;

    return get_template()
        .replace(/0__namespace/g, namespace)
        .replace(/0__data/g, name);
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    var 0__data = /** @class */ (function () {
        function 0__data($rootScope) {
        }

        //  implementation goes here

        return 0__data;
    }());
    0__namespace.0__data = 0__data;

    angular.module("app").factory("0__data", 0__data);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
