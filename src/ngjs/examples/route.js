(function () {
    angular.module("app").config(Config);

    function Config($stateProvider) {
        $stateProvider
            .state("/Communities", {
                url: "/Communities",
                templateUrl: "_communities/_communities.html",
                controller: "CommuCtrl",
                data: {
                    pageTitle: "Communities",
                    group: "Communities",
                },
                requiresLogin: true,
            })
            .state("/Communities", {
                url: "/Communities",
                templateUrl: "_communities/_communities.html",
                controller: "CommuCtrl",
                data: {
                    pageTitle: "Communities",
                    group: "Communities",
                },
                requiresLogin: true,
            });
    }
})();
