
export default function service(filename: string) {
    let namespace = "__app";
    let name = `${filename[0].toUpperCase()}${filename.slice(1)}`;

    return get_template()
        .replace(/0__namespace/g, namespace)
        .replace(/0__service/g, `${name}Service`);
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    var 0__service = /** @class */ (function () {
        function 0__service($rootScope) {
        }

        //  implementation goes here

        return 0__service;
    }());
    0__namespace.0__service = 0__service;

    angular.module("app").service("0__service", 0__service);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
