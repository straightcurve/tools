
export default function directive(filename: string) {
    let namespace = "__app";
    let name = `${filename[0].toUpperCase()}${filename.slice(1)}`;

    //  TODO: implement a function to transform dashes in capitalized letters
    let capitalized = filename;

    return get_template()
        .replace(/0__namespace/g, namespace)
        .replace(/0__directive/g, name)
        .replace(/1__directive/g, capitalized)
        .replace(/2__directive/g, filename);
}

function get_template() {
    return `
"use strict";
var 0__namespace;
(function (0__namespace) {
    function 0__directive($rootScope) {
        var directive = {
            restrict: "E",
            replace: true,
            scope: {
                options: "=",
            },
            controller: "0__directiveCtrl",
            templateUrl: "2__directive.html",
            controllerAs: "1__directiveCtrl",
            bindToController: true,
        };
        return directive;
    }

    0__namespace.0__directive = 0__directive;

    angular.module("app").directive("1__directive", 0__directive);
})(0__namespace || (0__namespace = {}));
    `.trim();
}
