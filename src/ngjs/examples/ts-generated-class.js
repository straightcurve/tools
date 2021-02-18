/**
 * original code
 * 
 *   namespace World {
 *       class Hello {
 *           //@ts-ignore
 *           constructor($rootScope) {
 *
 *           }
 *
 *           public world() {
 *               return "this";
 *           }
 *       
 *           private _ugh() {
 *       
 *           }
 *       }
 *
 *       let hello = new Hello({});
 *
 *       //@ts-ignore
 *       angular.module("app").factory("Hello", Hello);
 *   }
 *
 *
 *
 *
 */

"use strict";
var World;
(function (World) {
    var Hello = /** @class */ (function () {
        function Hello() {
        }
        /**
         * wordl
         */
        Hello.prototype.wordl = function () {
            return "this";
        };
        Hello.prototype._ugh = function () {
        };
        return Hello;
    }());
    World.Hello = Hello;
    var hello = new Hello();
    //@ts-ignore
    angular.module("app").factory("Hello", Hello);
})(World || (World = {}));
