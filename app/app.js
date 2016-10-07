(function () {
    'use strict';

    angular.module('portalMovie',
        ['ngRoute',
            'portalMovie.movie',
            'portalMovie.view1',
            'portalMovie.view2',])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/view1'});
        }])
})();