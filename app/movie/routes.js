(function () {
    'use strict';

    angular.module('portalMovie.movie')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/movie/list', {
                    templateUrl: 'movie/list.html',
                    controller: 'MovieCtrl',
                    controllerAs: 'ctrl'
                })
        }]);
})();