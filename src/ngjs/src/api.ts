
export default function api(filename: string, version: number = 1) {
    let namespace = "__app";
    let name = `${filename[0].toUpperCase()}${filename.slice(1)}`;

    return get_template()
        .replace(/0__namespace/g, namespace)
        .replace(/0__api/g, `${name}APIv${version}`);
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    var 0__api = /** @class */ (function () {
        function 0__api($rootScope) {
        }

        //  implementation goes here

        return 0__api;
    }());
    0__namespace.0__api = 0__api;

    angular.module("app").service("0__api", 0__api);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
